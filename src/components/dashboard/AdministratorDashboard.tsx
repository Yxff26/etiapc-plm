"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatCard } from "@/components/ui/stat-card"
import { Users, ShieldCheck, FileText, Settings } from "lucide-react"
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

export default function AdministratorDashboard() {
  // Datos simulados para el dashboard del administrador
  const stats = {
    totalUsers: 35,
    teachers: 25,
    coordinators: 8,
    admins: 2,
  }

  const quickLinks = [
    {
      title: "Gestión de Usuarios",
      description: "Administra los usuarios del sistema",
      icon: Users,
      href: "/dashboard/administrator/users",
    },
    {
      title: "Roles y Permisos",
      description: "Gestiona los roles y permisos",
      icon: ShieldCheck,
      href: "/dashboard/administrator/roles",
    },
    {
      title: "Reportes",
      description: "Visualiza reportes del sistema",
      icon: FileText,
      href: "/dashboard/administrator/reports",
    },
    {
      title: "Configuración",
      description: "Ajusta la configuración del sistema",
      icon: Settings,
      href: "/dashboard/administrator/settings",
    },
  ]

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="mb-8" variants={itemVariants}>
        <h1 className="text-2xl font-bold">Panel de Administración</h1>
        <p className="text-muted-foreground">
          Bienvenido al panel de administración. Aquí tienes un resumen del sistema.
        </p>
      </motion.div>

      <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6" variants={containerVariants}>
        <motion.div variants={itemVariants}>
          <StatCard
            title="Total Usuarios"
            value={stats.totalUsers}
            description="Usuarios registrados"
            icon={Users}
            color="primary"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            title="Profesores"
            value={stats.teachers}
            description="Profesores activos"
            icon={Users}
            color="secondary"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            title="Coordinadores"
            value={stats.coordinators}
            description="Coordinadores activos"
            icon={Users}
            color="accent"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            title="Administradores"
            value={stats.admins}
            description="Administradores del sistema"
            icon={Users}
            color="destructive"
          />
        </motion.div>
      </motion.div>

      <motion.div className="grid gap-6 md:grid-cols-2" variants={containerVariants}>
        {quickLinks.map((link, index) => (
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



