"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import axios from "axios"
import { useState, useEffect } from "react"
import { EditUserModal } from "@/components/dashboard/administrator/EditUserModal"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog"

interface User {
  _id: string
  firstName: string
  lastName: string
  email: string
  role: string
  isEmailVerified: boolean
  createdAt: string
  googleProfileImage?: string
  authProvider: string
}

export default function AdministratorUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)

  // Función para obtener las iniciales del usuario
  const getInitials = (firstName: string, lastName: string) => {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
    return `${firstInitial}${lastInitial}`;
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users")
      setUsers(response.data)
    } catch (error) {
      console.error("Error fetching users:", error)
      toast.error("Error al cargar los usuarios")
    } finally {
      setLoading(false)
    }
  }

  const handleEditClick = (user: User) => {
    setSelectedUser(user)
    setIsEditModalOpen(true)
  }

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user)
    setIsAlertDialogOpen(true)
  }

  const confirmDeleteUser = async () => {
    if (!userToDelete) return
    try {
      const response = await axios.delete(`/api/users/${userToDelete._id}`)
      if (response.status === 200) {
        toast.success("Usuario eliminado exitosamente")
        fetchUsers() // Recargar la lista de usuarios
      }
    } catch (error) {
      console.error("Error deleting user:", error)
      toast.error("Error al eliminar el usuario")
    } finally {
      setIsAlertDialogOpen(false)
      setUserToDelete(null)
    }
  }

  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      user.firstName?.toLowerCase().includes(searchLower) ||
      user.lastName?.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower)
    )
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
        <Input
          placeholder="Buscar usuarios..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid gap-4">
        {filteredUsers.map((user) => (
          <Card key={user._id} className="w-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
          <div className="relative">
                    {user.googleProfileImage ? (
                      <img
                        src={user.googleProfileImage}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="w-12 h-12 rounded-full"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-lg font-semibold text-gray-600">
                          {getInitials(user.firstName, user.lastName)}
                        </span>
                      </div>
                    )}
          </div>
                  <div>
                    <h3 className="font-semibold">
                      {user.firstName && user.lastName
                        ? `${user.firstName} ${user.lastName}`
                        : "Usuario sin nombre"}
                    </h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditClick(user)}
                  >
                    Editar
                  </Button>
                  <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteUser(user)}>
                        Eliminar
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Eliminar Usuario</AlertDialogTitle>
                        <AlertDialogDescription>
                          ¿Estás seguro de que deseas eliminar a {user.firstName} {user.lastName}? Esta acción no se puede deshacer.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="flex justify-end">
                        <AlertDialogCancel onClick={() => setIsAlertDialogOpen(false)}>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDeleteUser}>Eliminar</AlertDialogAction>
                      </div>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-500">
                <div>
                  <span className="font-medium">Rol:</span>{" "}
                  <span className="capitalize">{user.role}</span>
                </div>
                <div>
                  <span className="font-medium">Estado:</span>{" "}
                  {user.isEmailVerified ? (
                    <span className="text-green-600">Verificado</span>
                  ) : (
                    <span className="text-yellow-600">Pendiente</span>
                  )}
                </div>
                <div>
                  <span className="font-medium">Método de autenticación:</span>{" "}
                  <span className="capitalize">
                    {user.authProvider === "google" ? "Google" : "Email"}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Fecha de registro:</span>{" "}
                  {new Date(user.createdAt).toLocaleDateString()}
              </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <EditUserModal
        user={selectedUser}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedUser(null)
        }}
        onUserUpdated={fetchUsers}
      />
    </div>
  )
}