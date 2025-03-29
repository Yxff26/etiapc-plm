"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, UserPlus, Mail, Phone, Shield, Calendar } from "lucide-react"

export default function AdministratorUsersPage() {
  // Datos simulados de usuarios
  const users = [
    {
      id: 1,
      name: "Juan Pérez",
      email: "juan.perez@example.com",
      phone: "+51 987 654 321",
      role: "teacher",
      status: "active",
      lastLogin: "15/03/2024",
      avatar: "/placeholder.svg",
      initials: "JP",
    },
    {
      id: 2,
      name: "María García",
      email: "maria.garcia@example.com",
      phone: "+51 987 654 322",
      role: "coordinator",
      status: "active",
      lastLogin: "14/03/2024",
      avatar: "/placeholder.svg",
      initials: "MG",
    },
    {
      id: 3,
      name: "Carlos López",
      email: "carlos.lopez@example.com",
      phone: "+51 987 654 323",
      role: "administrator",
      status: "inactive",
      lastLogin: "10/03/2024",
      avatar: "/placeholder.svg",
      initials: "CL",
    },
  ]

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "teacher":
        return "Profesor"
      case "coordinator":
        return "Coordinador"
      case "administrator":
        return "Administrador"
      default:
        return role
    }
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
            <p className="text-muted-foreground">
              Administra los usuarios del sistema
            </p>
          </div>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Nuevo Usuario
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar usuarios..."
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {users.map((user) => (
          <Card key={user.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-medium">{user.name}</h3>
                      <Badge variant="outline">{getRoleLabel(user.role)}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <Badge variant={user.status === "active" ? "default" : "secondary"}>
                  {user.status === "active" ? "Activo" : "Inactivo"}
                </Badge>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Último acceso: {user.lastLogin}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  Ver perfil
                </Button>
                <Button variant="outline" size="sm">
                  Editar
                </Button>
                <Button variant="outline" size="sm">
                  <Shield className="h-4 w-4 mr-2" />
                  Permisos
                </Button>
                <Button
                  variant={user.status === "active" ? "destructive" : "default"}
                  size="sm"
                >
                  {user.status === "active" ? "Desactivar" : "Activar"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 