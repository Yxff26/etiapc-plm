"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, ChevronDown, ChevronUp, Search } from "lucide-react"
import { useState } from "react"
import { EditUserModal } from "./EditUserModal"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog"
import { getInitials } from "@/utils/getInitials"

interface User {
  _id: string
  firstName: string
  lastName: string
  email: string
  role: string
  isEmailVerified: boolean
  loginAttempts: number
  createdAt: string
  image: string | null
  authProvider: string
}

interface UsersTableProps {
  users: User[]
  onUserUpdated: () => void
  onUserDeleted: (userId: string) => void
}

type SortField = "firstName" | "lastName" | "email" | "role" | "createdAt"
type SortDirection = "asc" | "desc"

export function UsersTable({ users, onUserUpdated, onUserDeleted }: UsersTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortField, setSortField] = useState<SortField>("createdAt")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)

  // Filtrar usuarios
  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "verified" && user.isEmailVerified) ||
      (statusFilter === "pending" && !user.isEmailVerified)

    return matchesSearch && matchesRole && matchesStatus
  })

  // Ordenar usuarios
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]
    
    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1
    }
    return aValue < bValue ? 1 : -1
  })

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleEditClick = (user: User) => {
    setSelectedUser(user)
    setIsEditModalOpen(true)
  }

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user)
  }

  const handleConfirmDelete = () => {
    if (userToDelete) {
      onUserDeleted(userToDelete._id)
      setUserToDelete(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar usuarios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por rol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los roles</SelectItem>
            <SelectItem value="administrator">Administrador</SelectItem>
            <SelectItem value="coordinator">Coordinador</SelectItem>
            <SelectItem value="teacher">Profesor</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="verified">Verificado</SelectItem>
            <SelectItem value="pending">Pendiente</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("email")}
              >
                <div className="flex items-center gap-1">
                  Email
                  {sortField === "email" && (
                    sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("role")}
              >
                <div className="flex items-center gap-1">
                  Rol
                  {sortField === "role" && (
                    sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead>Estado</TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("createdAt")}
              >
                <div className="flex items-center gap-1">
                  Fecha de registro
                  {sortField === "createdAt" && (
                    sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead className="w-[100px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={`${user.firstName} ${user.lastName}`}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-sm font-semibold text-gray-600">
                            {getInitials(user.firstName, user.lastName)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium">
                        {user.firstName && user.lastName
                          ? `${user.firstName} ${user.lastName}`
                          : "Usuario sin nombre"}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {user.authProvider === "google" ? "Google" : "Email"}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.isEmailVerified ? "default" : "secondary"}>
                    {user.isEmailVerified ? "Verificado" : "Pendiente"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditClick(user)}>
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => handleDeleteClick(user)}
                      >
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <EditUserModal
        user={selectedUser}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedUser(null)
        }}
        onUserUpdated={onUserUpdated}
      />

      <AlertDialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar Usuario</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que deseas eliminar a {userToDelete?.firstName} {userToDelete?.lastName}? Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              Eliminar
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
} 