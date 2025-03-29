"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, Download, Calendar, BarChart, PieChart, LineChart, Users } from "lucide-react"

export default function AdministratorReportsPage() {
  // Datos simulados de reportes
  const reports = [
    {
      id: 1,
      title: "Estadísticas Generales",
      description: "Resumen de métricas del sistema",
      type: "Análisis",
      date: "15/03/2024",
      status: "completed",
      format: "PDF",
      category: "General",
    },
    {
      id: 2,
      title: "Usuarios Activos",
      description: "Reporte de usuarios por rol",
      type: "Usuarios",
      date: "14/03/2024",
      status: "completed",
      format: "Excel",
      category: "Usuarios",
    },
    {
      id: 3,
      title: "Evaluaciones del Mes",
      description: "Análisis de evaluaciones realizadas",
      type: "Evaluación",
      date: "10/03/2024",
      status: "processing",
      format: "PDF",
      category: "Evaluaciones",
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Reportes del Sistema</h1>
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

      <div className="grid gap-6 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Reportes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground">
              +5 desde el mes anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">
              +3 desde el mes anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Evaluaciones</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120</div>
            <p className="text-xs text-muted-foreground">
              +15 desde el mes anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Proceso</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              +2 desde el mes anterior
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
                    <Badge variant="outline">{report.category}</Badge>
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

              <div className="mt-4 grid gap-4 md:grid-cols-3">
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
                <div className="flex items-center gap-2">
                  <LineChart className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-medium">Tipo:</span> {report.type}
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