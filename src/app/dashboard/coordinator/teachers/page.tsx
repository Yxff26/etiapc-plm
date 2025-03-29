"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Mail, Phone, GraduationCap, Star, Calendar } from "lucide-react"

export default function CoordinatorTeachersPage() {
  // Datos simulados de profesores
  const teachers = [
    {
      id: 1,
      name: "Juan Pérez",
      email: "juan.perez@example.com",
      phone: "+51 987 654 321",
      specialization: "Matemáticas",
      subjects: ["Cálculo", "Álgebra", "Geometría"],
      rating: 4.5,
      evaluations: 12,
      status: "active",
      avatar: "/placeholder.svg",
      initials: "JP",
    },
    {
      id: 2,
      name: "María García",
      email: "maria.garcia@example.com",
      phone: "+51 987 654 322",
      specialization: "Física",
      subjects: ["Física General", "Mecánica", "Termodinámica"],
      rating: 4.8,
      evaluations: 15,
      status: "active",
      avatar: "/placeholder.svg",
      initials: "MG",
    },
    {
      id: 3,
      name: "Carlos López",
      email: "carlos.lopez@example.com",
      phone: "+51 987 654 323",
      specialization: "Química",
      subjects: ["Química General", "Química Orgánica", "Bioquímica"],
      rating: 4.2,
      evaluations: 8,
      status: "inactive",
      avatar: "/placeholder.svg",
      initials: "CL",
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Gestión de Profesores</h1>
            <p className="text-muted-foreground">
              Administra y monitorea el desempeño de los profesores
            </p>
          </div>
          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            Programar Evaluación
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar profesores..."
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {teachers.map((teacher) => (
          <Card key={teacher.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={teacher.avatar} />
                    <AvatarFallback>{teacher.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-medium">{teacher.name}</h3>
                      <Badge variant={teacher.status === "active" ? "default" : "secondary"}>
                        {teacher.status === "active" ? "Activo" : "Inactivo"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{teacher.specialization}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Ver perfil
                  </Button>
                  <Button variant="outline" size="sm">
                    Evaluar
                  </Button>
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{teacher.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{teacher.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{teacher.subjects.join(", ")}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm font-medium">{teacher.rating}/5</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {teacher.evaluations} evaluaciones realizadas
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 