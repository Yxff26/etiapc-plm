"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart, LineChart, PieChart } from "lucide-react"

export default function TeacherStatsPage() {
  // Datos simulados de estadísticas
  const stats = [
    {
      title: "Promedio General",
      value: "4.5",
      description: "Promedio de todas las evaluaciones",
      icon: BarChart,
      trend: "+0.2",
      trendUp: true,
    },
    {
      title: "Asistencia",
      value: "95%",
      description: "Tasa de asistencia de estudiantes",
      icon: LineChart,
      trend: "+2%",
      trendUp: true,
    },
    {
      title: "Satisfacción",
      value: "4.8",
      description: "Nivel de satisfacción de estudiantes",
      icon: PieChart,
      trend: "+0.3",
      trendUp: true,
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Mis Estadísticas</h1>
        <p className="text-muted-foreground">
          Resumen de tu desempeño y métricas importantes.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <div className={`text-xs mt-2 ${stat.trendUp ? "text-green-500" : "text-red-500"}`}>
                {stat.trendUp ? "↑" : "↓"} {stat.trend}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Desempeño por Asignatura</CardTitle>
            <CardDescription>
              Comparación de evaluaciones por asignatura
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              Gráfico de desempeño por asignatura (pendiente de implementar)
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Tendencia de Evaluaciones</CardTitle>
            <CardDescription>
              Historial de evaluaciones a lo largo del tiempo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              Gráfico de tendencia de evaluaciones (pendiente de implementar)
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 