"use client"

import { useEffect, useState } from "react"
import { TeacherStats } from "@/components/accompaniment/TeacherStats"
import { EstadisticasProfesor } from "@/types/accompaniment"
import axios from "axios"
import { toast } from "sonner"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function TeacherStatsPage() {
  const [stats, setStats] = useState<EstadisticasProfesor | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await axios.get("/api/accompaniments/teacher/current")
      const data = response.data

      // Transformar los datos de la API al formato esperado por el componente
      const transformedStats: EstadisticasProfesor = {
        promedioGeneral: data.promedioGeneral,
        promedioPorCategoria: {
          planificacion: data.promedioPlanificacion,
          desarrollo: data.promedioDesarrollo,
          aspectosPedagogicos: data.promedioAspectosPedagogicos
        },
        evolucion: data.evolucion.map((item: any) => ({
          fecha: new Date(item.fecha),
          puntuacion: item.promedio
        })),
        ultimosAcompanamientos: data.ultimosAcompanamientos.map((item: any) => ({
          id: item._id,
          fecha: new Date(item.fecha),
          profesor: {
            id: data.profesor._id,
            nombre: `${data.profesor.firstName} ${data.profesor.lastName}`,
            materia: "Materia" // Este dato debería venir de la API
          },
          coordinador: {
            id: item.coordinador._id,
            nombre: `${item.coordinador.firstName} ${item.coordinador.lastName}`
          },
          tipo: item.tipo,
          instrumento: {
            planificacion: item.instrumento.planificacion,
            desarrollo: item.instrumento.desarrollo,
            aspectosPedagogicos: item.instrumento.aspectosPedagogicos,
            observaciones: item.observaciones,
            fortalezas: item.fortalezas,
            sugerencias: item.sugerencias
          }
        }))
      }

      setStats(transformedStats)
    } catch (error) {
      console.error("Error fetching statistics:", error)
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
    return null
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Mis Estadísticas</h1>
        <p className="text-muted-foreground">
          Visualiza tu desempeño y evolución en los acompañamientos
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-card rounded-lg border p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Promedio General</h3>
            <p className="text-2xl font-bold">{stats.promedioGeneral.toFixed(1)}/5</p>
          </div>
          <div className="bg-card rounded-lg border p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Planificación</h3>
            <p className="text-2xl font-bold">{stats.promedioPorCategoria.planificacion.toFixed(1)}/5</p>
          </div>
          <div className="bg-card rounded-lg border p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Desarrollo</h3>
            <p className="text-2xl font-bold">{stats.promedioPorCategoria.desarrollo.toFixed(1)}/5</p>
          </div>
          <div className="bg-card rounded-lg border p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Aspectos Pedagógicos</h3>
            <p className="text-2xl font-bold">{stats.promedioPorCategoria.aspectosPedagogicos.toFixed(1)}/5</p>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Evolución de Calificaciones</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={stats.evolucion}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorPuntuacion" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="fecha" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis domain={[0, 5]} />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  formatter={(value) => [`${value}/5`, 'Calificación']}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="puntuacion"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorPuntuacion)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Últimos Acompañamientos</h2>
          <div className="space-y-4">
            {stats.ultimosAcompanamientos.map((acompanamiento) => (
              <div
                key={acompanamiento.id}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
              >
                <div>
                  <p className="font-medium">
                    {acompanamiento.fecha.toLocaleDateString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Coordinador: {acompanamiento.coordinador.nombre}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ 
                        width: `${(
                          (Object.values(acompanamiento.instrumento.planificacion).reduce((a, b) => a + b, 0) / 5 +
                          Object.values(acompanamiento.instrumento.desarrollo).reduce((a, b) => a + b, 0) / 4 +
                          Object.values(acompanamiento.instrumento.aspectosPedagogicos).reduce((a, b) => a + b, 0) / 4) / 3
                        ) * 20}%` 
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium">
                    {(
                      (Object.values(acompanamiento.instrumento.planificacion).reduce((a, b) => a + b, 0) / 5 +
                      Object.values(acompanamiento.instrumento.desarrollo).reduce((a, b) => a + b, 0) / 4 +
                      Object.values(acompanamiento.instrumento.aspectosPedagogicos).reduce((a, b) => a + b, 0) / 4) / 3
                    ).toFixed(1)}/5
                  </span>
                </div>
              </div>
        ))}
      </div>
            </div>
      </div>
    </div>
  )
} 