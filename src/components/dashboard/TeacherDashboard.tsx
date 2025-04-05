"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import axios from "axios"
import { toast } from "sonner"
import { Calendar, BookOpen, BarChart as BarChartIcon, User } from "lucide-react"

interface DashboardStats {
  totalAcompanamientos: number
  promedioGeneral: number
  promedioPlanificacion: number
  promedioDesarrollo: number
  promedioAspectosPedagogicos: number
  evolucion: Array<{
    fecha: string
    promedio: number
  }>
  ultimosAcompanamientos: Array<{
    _id: string
    fecha: string
    promedio: number
  }>
}

export function TeacherDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await axios.get("/api/accompaniments/teacher/current")
      setStats(response.data)
    } catch (error) {
      console.error("Error fetching dashboard stats:", error)
      toast.error("Error al cargar las estadísticas")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-muted-foreground">Cargando estadísticas...</p>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-muted-foreground">No hay datos disponibles</p>
      </div>
    )
  }

  const formatNumber = (value: number | undefined) => {
    if (value === undefined) return "0.0"
    return value.toFixed(1)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenido a tu panel de control
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Acompañamientos
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAcompanamientos || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Promedio General
            </CardTitle>
            <BarChartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(stats.promedioGeneral)}/5</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Promedio Planificación
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(stats.promedioPlanificacion)}/5</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Promedio Desarrollo
            </CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(stats.promedioDesarrollo)}/5</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Evolución de Calificaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.evolucion || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="fecha" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis domain={[0, 5]} />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    formatter={(value) => [`${value}/5`, 'Calificación']}
                  />
                  <Bar dataKey="promedio" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Últimos Acompañamientos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(stats.ultimosAcompanamientos || []).map((acompanamiento) => (
                <div
                  key={acompanamiento._id}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">
                      {new Date(acompanamiento.fecha).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-muted rounded-full">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${((acompanamiento.promedio || 0) / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">
                      {formatNumber(acompanamiento.promedio)}/5
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

