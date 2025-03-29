"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Shield, Users, Settings, FileText, BarChart } from "lucide-react"

export default function AdministratorRolesPage() {
  // Datos simulados de roles y permisos
  const roles = [
    {
      id: 1,
      name: "Administrador",
      description: "Acceso total al sistema",
      users: 3,
      permissions: [
        "Gestionar usuarios",
        "Gestionar roles",
        "Ver reportes",
        "Configurar sistema",
      ],
      status: "active",
    },
    {
      id: 2,
      name: "Coordinador",
      description: "Gestión de evaluaciones y profesores",
      users: 5,
      permissions: [
        "Gestionar profesores",
        "Realizar evaluaciones",
        "Ver reportes",
        "Gestionar asignaturas",
      ],
      status: "active",
    },
    {
      id: 3,
      name: "Profesor",
      description: "Acceso a sus evaluaciones y asignaturas",
      users: 15,
      permissions: [
        "Ver evaluaciones",
        "Gestionar asignaturas",
        "Ver estadísticas",
        "Actualizar perfil",
      ],
      status: "active",
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Roles y Permisos</h1>
            <p className="text-muted-foreground">
              Administra los roles y permisos del sistema
            </p>
          </div>
          <Button>
            <Shield className="h-4 w-4 mr-2" />
            Nuevo Rol
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar roles..."
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {roles.map((role) => (
          <Card key={role.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium">{role.name}</h3>
                    <Badge variant="outline">{role.users} usuarios</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                </div>
                <Badge variant={role.status === "active" ? "default" : "secondary"}>
                  {role.status === "active" ? "Activo" : "Inactivo"}
                </Badge>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Permisos:</h4>
                <div className="grid gap-2 md:grid-cols-2">
                  {role.permissions.map((permission, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{permission}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  Ver usuarios
                </Button>
                <Button variant="outline" size="sm">
                  Editar permisos
                </Button>
                <Button size="sm">
                  Editar rol
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Permisos del Sistema</CardTitle>
            <CardDescription>
              Lista completa de permisos disponibles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center gap-2 p-4 border rounded-lg">
                <Users className="h-5 w-5" />
                <div>
                  <h3 className="font-medium">Gestión de Usuarios</h3>
                  <p className="text-sm text-muted-foreground">
                    Crear, editar y eliminar usuarios
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-4 border rounded-lg">
                <Settings className="h-5 w-5" />
                <div>
                  <h3 className="font-medium">Configuración</h3>
                  <p className="text-sm text-muted-foreground">
                    Modificar configuraciones del sistema
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-4 border rounded-lg">
                <FileText className="h-5 w-5" />
                <div>
                  <h3 className="font-medium">Reportes</h3>
                  <p className="text-sm text-muted-foreground">
                    Generar y ver reportes
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-4 border rounded-lg">
                <BarChart className="h-5 w-5" />
                <div>
                  <h3 className="font-medium">Estadísticas</h3>
                  <p className="text-sm text-muted-foreground">
                    Ver estadísticas y métricas
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 