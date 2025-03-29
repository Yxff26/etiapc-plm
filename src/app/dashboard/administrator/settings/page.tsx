"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Settings, Bell, Shield, Database, Mail, Globe } from "lucide-react"

export default function AdministratorSettingsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Configuración del Sistema</h1>
        <p className="text-muted-foreground">
          Gestiona la configuración general del sistema
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Configuración General</CardTitle>
            <CardDescription>
              Ajustes básicos del sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="system-name">Nombre del Sistema</Label>
                <Input id="system-name" defaultValue="EvalSys" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="system-description">Descripción</Label>
                <Input id="system-description" defaultValue="Sistema de Evaluación Docente" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Modo de Mantenimiento</Label>
                  <p className="text-sm text-muted-foreground">
                    Activar modo de mantenimiento
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notificaciones</CardTitle>
            <CardDescription>
              Configura las notificaciones del sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificaciones por Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Enviar notificaciones por correo electrónico
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificaciones Push</Label>
                  <p className="text-sm text-muted-foreground">
                    Activar notificaciones push en el navegador
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Seguridad</CardTitle>
            <CardDescription>
              Configuración de seguridad del sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Autenticación de Dos Factores</Label>
                  <p className="text-sm text-muted-foreground">
                    Requerir autenticación de dos factores
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Bloqueo de Cuenta</Label>
                  <p className="text-sm text-muted-foreground">
                    Bloquear cuenta después de intentos fallidos
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="session-timeout">Tiempo de Sesión (minutos)</Label>
                <Input id="session-timeout" type="number" defaultValue="30" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Correo Electrónico</CardTitle>
            <CardDescription>
              Configuración del servidor de correo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="smtp-server">Servidor SMTP</Label>
                <Input id="smtp-server" defaultValue="smtp.example.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="smtp-port">Puerto SMTP</Label>
                <Input id="smtp-port" type="number" defaultValue="587" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="smtp-user">Usuario SMTP</Label>
                <Input id="smtp-user" defaultValue="noreply@example.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="smtp-password">Contraseña SMTP</Label>
                <Input id="smtp-password" type="password" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancelar</Button>
          <Button>Guardar Cambios</Button>
        </div>
      </div>
    </div>
  )
} 