"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, UserPlus, Mail, Shield, Calendar } from "lucide-react"
import { useState, useEffect } from "react"

interface User {
  _id: string
  firstName: string
  lastName: string
  email: string
  role: string
  isEmailVerified: boolean
  loginAttempts: number
  createdAt: string
  googleProfileImage?: string
  authProvider: string
}

export default function AdministratorUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/users')
        const data = await response.json()
        setUsers(data)
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [])

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

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return '?'
    const firstInitial = firstName ? firstName[0] : ''
    const lastInitial = lastName ? lastName[0] : ''
    return `${firstInitial}${lastInitial}`.toUpperCase()
  }

  const filteredUsers = users.filter(user => {
    if (!user) return false
    const searchLower = searchTerm.toLowerCase()
    const fullName = `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase()
    return (
      fullName.includes(searchLower) ||
      (user.email?.toLowerCase() || '').includes(searchLower)
    )
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Cargando usuarios...</p>
      </div>
    )
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {filteredUsers.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                {searchTerm ? 'No se encontraron usuarios que coincidan con la búsqueda' : 'No hay usuarios registrados'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredUsers.map((user) => (
            <Card key={user._id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage 
                        src={user.authProvider === "google" ? user.googleProfileImage : undefined} 
                        alt={`${user.firstName || ''} ${user.lastName || ''}`} 
                      />
                      <AvatarFallback>{getInitials(user.firstName, user.lastName)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium">
                          {user.firstName && user.lastName 
                            ? `${user.firstName} ${user.lastName}`
                            : 'Usuario sin nombre'}
                        </h3>
                        <Badge variant="outline">{getRoleLabel(user.role)}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <Badge variant={user.isEmailVerified ? "default" : "secondary"}>
                    {user.isEmailVerified ? "Verificado" : "No verificado"}
                  </Badge>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Intentos de inicio: {user.loginAttempts}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Registro: {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Shield className="h-4 w-4 mr-2" />
                    Permisos
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                  >
                    Eliminar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
} 