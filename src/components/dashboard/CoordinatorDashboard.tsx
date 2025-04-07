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
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Panel de Coordinador</h1>
        <p className="text-muted-foreground">
          Gestión y seguimiento de acompañamientos
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <StatCard
          title="Total de Profesores"
          value={stats.teachers}
          icon={GraduationCap}
          description="Profesores registrados"
        />
        <StatCard
          title="Acompañamientos Realizados"
          value={stats.completedAccompaniments}
          icon={Calendar}
          description="Total de acompañamientos"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {quickLinks.map((link, index) => (
          <motion.div
            key={link.title}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <Link href={link.href}>
              <Card className="h-full hover:bg-accent transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <link.icon className="h-5 w-5" />
                    <CardTitle className="text-lg">{link.title}</CardTitle>
                  </div>
                  <CardDescription>{link.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
