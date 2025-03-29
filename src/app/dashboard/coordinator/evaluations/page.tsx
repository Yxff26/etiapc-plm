"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, Star, User, BookOpen, Clock } from "lucide-react"

export default function CoordinatorEvaluationsPage() {
  // Datos simulados de evaluaciones
  const evaluations = [
    {
      id: 1,
      teacher: "Juan Pérez",
      subject: "Matemáticas",
      date: "15/03/2024",
      time: "10:00 - 12:00",
      score: 4.5,
      status: "completed",
      type: "Regular",
    },
    {
      id: 2,
      teacher: "María García",
      subject: "Física",
      date: "20/03/2024",
      time: "14:00 - 16:00",
      score: null,
      status: "scheduled",
      type: "Regular",
    },
    {
      id: 3,
      teacher: "Carlos López",
      subject: "Química",
      date: "25/03/2024",
      time: "09:00 - 11:00",
      score: null,
      status: "pending",
      type: "Especial",
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Evaluaciones</h1>
            <p className="text-muted-foreground">
              Gestiona y realiza las evaluaciones a los profesores
            </p>
          </div>
          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            Nueva Evaluación
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar evaluaciones..."
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {evaluations.map((evaluation) => (
          <Card key={evaluation.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium">{evaluation.subject}</h3>
                    <Badge variant="outline">{evaluation.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Profesor: {evaluation.teacher}</p>
                </div>
                <Badge
                  variant={
                    evaluation.status === "completed"
                      ? "default"
                      : evaluation.status === "scheduled"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {evaluation.status === "completed"
                    ? "Completada"
                    : evaluation.status === "scheduled"
                    ? "Programada"
                    : "Pendiente"}
                </Badge>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{evaluation.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{evaluation.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{evaluation.teacher}</span>
                </div>
              </div>

              {evaluation.score && (
                <div className="mt-4 flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm font-medium">{evaluation.score}/5</span>
                </div>
              )}

              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  Ver detalles
                </Button>
                {evaluation.status !== "completed" && (
                  <Button size="sm">
                    {evaluation.status === "scheduled" ? "Realizar" : "Programar"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 