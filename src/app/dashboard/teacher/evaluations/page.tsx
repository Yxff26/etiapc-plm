"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Calendar, MessageSquare } from "lucide-react"

export default function TeacherEvaluationsPage() {
  // Datos simulados de evaluaciones
  const evaluations = [
    {
      id: 1,
      date: "15/03/2024",
      subject: "Matemáticas",
      score: 4.5,
      coordinator: {
        name: "Ana Martínez",
        avatar: "/placeholder.svg",
        initials: "AM",
      },
      feedback: "Excelente dominio del tema y buena interacción con los estudiantes.",
      status: "completed",
    },
    {
      id: 2,
      date: "10/02/2024",
      subject: "Física",
      score: 4.2,
      coordinator: {
        name: "Carlos López",
        avatar: "/placeholder.svg",
        initials: "CL",
      },
      feedback: "Buena metodología de enseñanza. Se recomienda incorporar más ejemplos prácticos.",
      status: "completed",
    },
    {
      id: 3,
      date: "05/01/2024",
      subject: "Cálculo",
      score: 3.9,
      coordinator: {
        name: "Laura Sánchez",
        avatar: "/placeholder.svg",
        initials: "LS",
      },
      feedback: "Buen manejo de conceptos. Mejorar la participación de los estudiantes.",
      status: "completed",
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Mis Evaluaciones</h1>
        <p className="text-muted-foreground">
          Historial de evaluaciones realizadas por los coordinadores.
        </p>
      </div>

      <div className="grid gap-6">
        {evaluations.map((evaluation) => (
          <Card key={evaluation.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-medium">{evaluation.subject}</CardTitle>
                  <CardDescription>Fecha: {evaluation.date}</CardDescription>
                </div>
                <Badge variant={evaluation.status === "completed" ? "default" : "secondary"}>
                  {evaluation.status === "completed" ? "Completada" : "Pendiente"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="font-medium">{evaluation.score}/5</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{evaluation.date}</span>
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="h-4 w-4" />
                    <span className="font-medium">Retroalimentación:</span>
                  </div>
                  <p className="text-sm">{evaluation.feedback}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-2">Evaluado por:</span>
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={evaluation.coordinator.avatar} />
                        <AvatarFallback>{evaluation.coordinator.initials}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{evaluation.coordinator.name}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver detalles
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 