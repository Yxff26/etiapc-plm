"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { StatCard } from "@/components/ui/stat-card"
import { ClipboardCheck, BookOpen, BarChart, User } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

export default function TeacherDashboard() {
  // Datos simulados para el dashboard del profesor
  const evaluationStats = {
    totalEvaluations: 8,
    averageScore: 4.2,
    lastEvaluation: "15/03/2024",
    pendingEvaluations: 0,
  }

  const quickLinks = [
    {
      title: "Mis Evaluaciones",
      description: "Ver historial de evaluaciones",
      icon: ClipboardCheck,
      href: "/dashboard/teacher/evaluations",
    },
    {
      title: "Mis Asignaturas",
      description: "Gestionar asignaturas impartidas",
      icon: BookOpen,
      href: "/dashboard/teacher/subjects",
    },
    {
      title: "Mis Estadísticas",
      description: "Ver métricas y análisis",
      icon: BarChart,
      href: "/dashboard/teacher/stats",
    },
    {
      title: "Mi Perfil",
      description: "Actualizar información personal",
      icon: User,
      href: "/dashboard/teacher/profile",
    },
  ]

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="mb-8" variants={itemVariants}>
        <h1 className="text-2xl font-bold">Mi Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenido de nuevo. Aquí tienes un resumen de tu actividad.
        </p>
      </motion.div>

      <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6" variants={containerVariants}>
        <motion.div variants={itemVariants}>
          <StatCard
            title="Total Evaluaciones"
            value={evaluationStats.totalEvaluations}
            description="Evaluaciones recibidas"
            icon={ClipboardCheck}
            color="primary"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            title="Calificación Promedio"
            value={evaluationStats.averageScore}
            description="Promedio de calificaciones"
            icon={ClipboardCheck}
            color="secondary"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            title="Última Evaluación"
            value={evaluationStats.lastEvaluation}
            description="Fecha de última evaluación"
            icon={ClipboardCheck}
            color="accent"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            title="Evaluaciones Pendientes"
            value={evaluationStats.pendingEvaluations}
            description="Evaluaciones por realizar"
            icon={ClipboardCheck}
            color="destructive"
          />
        </motion.div>
      </motion.div>

      <motion.div className="grid gap-6 md:grid-cols-2" variants={containerVariants}>
        {quickLinks.map((link) => (
          <motion.div key={link.title} variants={itemVariants}>
            <Link href={link.href}>
              <Card className="hover:bg-accent/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <link.icon className="h-5 w-5" />
                    <CardTitle>{link.title}</CardTitle>
                  </div>
                  <CardDescription>{link.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

