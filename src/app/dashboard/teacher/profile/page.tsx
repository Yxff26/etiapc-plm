"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Mail, Phone, MapPin, GraduationCap } from "lucide-react"

export default function TeacherProfilePage() {
  // Datos simulados del perfil
  const profile = {
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    phone: "+51 987 654 321",
    address: "Av. Principal 123, Lima",
    specialization: "Matemáticas",
    bio: "Profesor con más de 10 años de experiencia en la enseñanza de matemáticas avanzadas.",
    avatar: "/placeholder.svg",
    initials: "JP",
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Mi Perfil</h1>
        <p className="text-muted-foreground">
          Gestiona tu información personal y profesional.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
            <CardDescription>
              Actualiza tu información de contacto y perfil
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6 mb-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback>{profile.initials}</AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <h3 className="text-lg font-medium">{profile.name}</h3>
                <p className="text-sm text-muted-foreground">{profile.specialization}</p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input id="name" defaultValue={profile.name} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="email" defaultValue={profile.email} className="pl-9" />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">Teléfono</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="phone" defaultValue={profile.phone} className="pl-9" />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="address">Dirección</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="address" defaultValue={profile.address} className="pl-9" />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="specialization">Especialización</Label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="specialization" defaultValue={profile.specialization} className="pl-9" />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="bio">Biografía</Label>
                <Textarea
                  id="bio"
                  defaultValue={profile.bio}
                  className="min-h-[100px]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline">Cancelar</Button>
              <Button>Guardar cambios</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Seguridad</CardTitle>
            <CardDescription>
              Actualiza tu contraseña y configuración de seguridad
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="current-password">Contraseña actual</Label>
                <Input id="current-password" type="password" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="new-password">Nueva contraseña</Label>
                <Input id="new-password" type="password" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirmar nueva contraseña</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline">Cancelar</Button>
              <Button>Actualizar contraseña</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 