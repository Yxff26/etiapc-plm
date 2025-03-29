"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, Download, Calendar, BarChart, PieChart, LineChart } from "lucide-react"

export default function CoordinatorReportsPage() {
  // Datos simulados de reportes
  const reports = [
    {
      id: 1,
      title: "Evaluaciones por Profesor",
      description: "Análisis de evaluaciones realizadas a cada profesor",
      type: "Evaluación",
      date: "15/03/2024",
      status: "completed",
      format: "PDF",
    },
    {
      id: 2,
      title: "Desempeño por Asignatura",
      description: "Estadísticas de rendimiento por asignatura",
      type: "Análisis",
      date: "10/03/2024",
      status: "completed",
      format: "Excel",
    },
    {
      id: 3,
      title: "Tendencia de Evaluaciones",
      description: "Análisis de tendencias en las evaluaciones",
      type: "Análisis",
      date: "05/03/2024",
      status: "processing",
      format: "PDF",
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Reportes</h1>
            <p className="text-muted-foreground">
              Genera y visualiza reportes del sistema
            </p>
          </div>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Nuevo Reporte
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Reportes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 desde el mes anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reportes Completados</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              +1 desde el mes anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Proceso</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              +1 desde el mes anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar reportes..."
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium">{report.title}</h3>
                    <Badge variant="outline">{report.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                </div>
                <Badge
                  variant={
                    report.status === "completed"
                      ? "default"
                      : report.status === "processing"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {report.status === "completed"
                    ? "Completado"
                    : report.status === "processing"
                    ? "En Proceso"
                    : "Pendiente"}
                </Badge>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-medium">Fecha:</span> {report.date}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-medium">Formato:</span> {report.format}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  Ver detalles
                </Button>
                {report.status === "completed" && (
                  <Button size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Descargar
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