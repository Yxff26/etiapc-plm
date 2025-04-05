"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import {
  GraduationCap,
  Calendar,
  BookOpen,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

import { useState, useEffect } from "react";
import axios from "axios";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function CoordinatorDashboard() {
  const [stats, setStats] = useState({
    teachers: 0,
    completedAccompaniments: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("/api/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);
  // // Datos simulados para el dashboard del coordinador
  // const stats = {
  //   totalTeachers: 25,
  //   pendingEvaluations: 5,
  //   completedEvaluations: 42,
  //   totalSubjects: 8,
  // }

  const quickLinks = [
    {
      title: "Gestión de Profesores",
      description: "Administrar profesores",
      icon: GraduationCap,
      href: "/dashboard/coordinator/teachers",
    },
    {
      title: "Acompañamientos",
      description: "Gestionar acompañamientos",
      icon: Calendar,
      href: "/dashboard/coordinator/accompaniments",
    },
    {
      title: "Asignaturas",
      description: "Administrar asignaturas",
      icon: BookOpen,
      href: "/dashboard/coordinator/subjects",
    },
    {
      title: "Reportes",
      description: "Ver reportes y análisis",
      icon: FileText,
      href: "/dashboard/coordinator/reports",
    },
  ];

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <motion.div className="mb-8" variants={itemVariants}>
        <h1 className="text-2xl font-bold">Panel de Coordinación</h1>
        <p className="text-muted-foreground">
          Bienvenido al panel de coordinación. Aquí tienes un resumen de tu
          área.
        </p>
      </motion.div>

      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 mb-6"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <StatCard
            title="Total Profesores"
            value={stats.teachers || 0}
            description="Profesores activos"
            icon={GraduationCap}
            color="primary"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            title="Acompañamientos Realizados"
            value={stats.completedAccompaniments || 0}
            description="Completados"
            icon={Calendar}
            color="secondary"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="grid gap-6 md:grid-cols-2"
        variants={containerVariants}
      >
        {quickLinks.map((link) => (
          <motion.div
            key={link.title}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <link.icon className="h-5 w-5" />
                  <CardTitle>{link.title}</CardTitle>
                </div>
                <CardDescription>{link.description}</CardDescription>
              </CardHeader>
              <Link href={link.href}>
                <CardContent className="text-sm text-blue-500 hover:underline mt-2">
                  Ir a sección →
                </CardContent>
              </Link>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
