"use client";

import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, x: 50, transition: { duration: 0.5 } },
};

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí normalmente llamarías a una API para manejar el restablecimiento de contraseña
    // Para este ejemplo, simplemente estableceremos isSubmitted a true
    setIsSubmitted(true);
  };

  return (
    <motion.div
      className="flex min-h-screen"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      {/* Columna Izquierda - Formulario de Olvidé mi Contraseña */}
      <div className="flex w-full lg:w-1/2 flex-col px-6 sm:px-12 md:px-20 justify-center">
        <div className="w-full max-w-md mx-auto space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="ETIAPC Logo"
              width={48}
              height={48}
              className="w-10 h-10"
            />
            <span className="text-xl font-semibold">ETIAPC</span>
          </div>

          {/* Formulario de Olvidé mi Contraseña */}
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold tracking-tight">
              ¿Olvidaste tu contraseña?
            </h1>
            <p className="text-sm text-muted-foreground">
              No te preocupes, te enviaremos instrucciones para restablecerla.
            </p>

            {isSubmitted ? (
              <div
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <p className="font-bold">¡Correo Enviado!</p>
                <p className="text-sm">
                  Revisa tu correo para las instrucciones de restablecimiento de
                  contraseña.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    placeholder="Introduce tu correo electrónico"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Botón de Restablecer Contraseña */}
                <Button type="submit" className="w-full">
                  Restablecer Contraseña
                </Button>
              </form>
            )}

            {/* Enlace para Volver al Inicio de Sesión */}
            <div className="text-center text-sm">
              <Link
                href="/login"
                className="font-medium text-primary hover:underline"
              >
                Volver al Inicio de Sesión
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Columna Derecha - Imagen */}
      <div className="hidden lg:flex w-1/2 bg-primary items-center justify-center p-12">
        <div className="max-w-lg">
          <div className="relative w-full aspect-square">
            <Image
              src=""
              alt="Ilustración de Olvidé mi Contraseña"
              fill
              className="object-contain"
            />
          </div>
          <div className="text-center mt-8 space-y-2">
            <h2 className="text-2xl font-semibold text-white">
              Recupera el acceso a tu cuenta.
            </h2>
            <p className="text-primary-foreground/80">
              Estamos aquí para ayudarte a recuperar el acceso a tu panel de
              control.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
