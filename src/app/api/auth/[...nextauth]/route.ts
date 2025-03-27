import { connectDB } from "@/lib/db/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const MAX_LOGIN_ATTEMPTS = 10;
const LOCK_TIME = 30 * 60 * 1000; // 30 minutos en milisegundos

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        remember: { label: "Remember", type: "checkbox" },
      },
      async authorize(credentials) {
        await connectDB();
        const userFound = await User.findOne({
          email: credentials?.email,
        }).select("+password");

        if (!userFound) throw new Error("Credenciales incorrectas");

        // Verificar si la cuenta está bloqueada
        if (userFound.lockUntil && userFound.lockUntil > Date.now()) {
          const remainingTime = Math.ceil((userFound.lockUntil.getTime() - Date.now()) / 1000 / 60);
          throw new Error(`Tu cuenta está bloqueada. Intenta nuevamente en ${remainingTime} minutos.`);
        }

        // Si la cuenta estaba bloqueada pero ya pasó el tiempo, resetear los intentos
        if (userFound.lockUntil && userFound.lockUntil <= Date.now()) {
          userFound.loginAttempts = 0;
          userFound.lockUntil = null;
          await userFound.save();
        }

        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          userFound.password
        );

        if (!passwordMatch) {
          // Incrementar intentos de inicio de sesión
          userFound.loginAttempts += 1;
          
          // Si excede el máximo de intentos, bloquear la cuenta
          if (userFound.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
            userFound.lockUntil = new Date(Date.now() + LOCK_TIME);
            await userFound.save();
            throw new Error(`Has excedido el límite de intentos. Tu cuenta está bloqueada por ${LOCK_TIME/1000/60} minutos.`);
          }
          
          await userFound.save();
          throw new Error("Credenciales incorrectas");
        }

        // Si la contraseña es correcta, resetear los intentos
        userFound.loginAttempts = 0;
        userFound.lockUntil = null;
        await userFound.save();

        return {
          id: userFound._id,
          email: userFound.email,
          name: userFound.name,
          role: userFound.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 horas por defecto
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) token.user = user;
      if (trigger === "signIn" && session?.remember) {
        token.maxAge = 30 * 24 * 60 * 60; // 30 días si se marca "recordar"
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
});

export { handler as GET, handler as POST };