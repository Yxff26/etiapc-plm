"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  ClipboardCheck,
  Users,
  Settings,
  BarChart,
  UserCircle,
} from "lucide-react";

interface DashboardNavProps {
  role: 'teacher' | 'coordinator' | 'administrator';
}

export default function DashboardNav({ role }: DashboardNavProps) {
  const pathname = usePathname();
  console.log('Role en DashboardNav:', role);

  const teacherNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Mis Evaluaciones",
      href: "/dashboard/evaluations",
      icon: ClipboardCheck,
    },
    {
      title: "Mi Perfil",
      href: "/dashboard/profile",
      icon: UserCircle,
    },
  ];

  const coordinatorNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Evaluaciones",
      href: "/dashboard/evaluations",
      icon: ClipboardCheck,
    },
    {
      title: "Profesores",
      href: "/dashboard/teachers",
      icon: Users,
    },
    {
      title: "Reportes",
      href: "/dashboard/reports",
      icon: BarChart,
    },
  ];

  const administratorNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Usuarios",
      href: "/dashboard/users",
      icon: Users,
    },
    {
      title: "Configuración",
      href: "/dashboard/settings",
      icon: Settings,
    },
    {
      title: "Reportes",
      href: "/dashboard/reports",
      icon: BarChart,
    },
  ];

  const navItems = role === 'teacher' 
    ? teacherNavItems 
    : role === 'coordinator' 
    ? coordinatorNavItems 
    : administratorNavItems;

  console.log('NavItems seleccionados:', navItems);

  return (
    <nav className="flex flex-col space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === item.href
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
} 