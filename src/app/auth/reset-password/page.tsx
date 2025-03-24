"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-muted/30">
      <div className="w-full max-w-md mx-auto space-y-8">
        <h1 className="text-2xl font-semibold text-center">Restablecer Contraseña</h1>
        <p className="text-sm text-muted-foreground text-center">
          Ingresa tu nueva contraseña para restablecer el acceso a tu cuenta.
        </p>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Nueva Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="Introduce tu nueva contraseña"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirma tu nueva contraseña"
              required
            />
          </div>

          <Button type="button" className="w-full">
            Restablecer Contraseña
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
