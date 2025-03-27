import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Si el usuario está autenticado y trata de acceder a /auth/login, redirigir al dashboard
    if (req.nextauth.token && req.nextUrl.pathname.startsWith("/auth/login")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Si la ruta es /auth/login, permitir acceso sin token
        if (req.nextUrl.pathname.startsWith("/auth/login")) {
          return true;
        }
        // Para otras rutas protegidas, requerir token
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/auth/login"],
};