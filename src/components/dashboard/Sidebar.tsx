"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import {
  Home,
  User,
  BookOpen,
  Settings,
  HelpCircle,
  LogOut,
  Users,
  ShieldCheck,
  GraduationCap,
  BarChart,
  Calendar,
  ClipboardList,
  Menu,
  X,
  FileText
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

// Tipo de rol basado en el modelo de usuario
type UserRole = "teacher" | "coordinator" | "administrator"

interface SidebarProps {
  userRole?: UserRole
}

export function Sidebar({ userRole = "teacher" }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Cerrar el sidebar cuando cambia la ruta
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const isActive = (path: string) => {
    // Si es la ruta principal del dashboard
    if (path === `/dashboard/${userRole}`) {
      return pathname === path
    }
    // Para subrutas, verificar si la ruta actual comienza con la ruta del menú
    return pathname.startsWith(path)
  }

  // Menú para profesores
  const teacherMenuItems = [
    {
      href: "/dashboard",
      label: "Inicio",
      icon: Home
    },
    {
      href: "/dashboard/teacher/accompaniments",
      label: "Mis Acompañamientos",
      icon: ClipboardList
    },
    {
      href: "/dashboard/teacher/stats",
      label: "Mis Estadísticas",
      icon: BarChart
    },
    {
      href: "/dashboard/teacher/profile",
      label: "Mi Perfil",
      icon: User
    }
  ]

  // Menú para coordinadores
  const coordinatorMenuItems = [
    {
      href: "/dashboard",
      label: "Inicio",
      icon: Home
    },
    {
      href: "/dashboard/coordinator/teachers",
      label: "Profesores",
      icon: Users
    },
    {
      href: "/dashboard/coordinator/accompaniments",
      label: "Acompañamientos",
      icon: ClipboardList
    },
    {
      href: "/dashboard/coordinator/profile",
      label: "Mi Perfil",
      icon: User
    }
  ]

  // Menú para administradores
  const adminMenuItems = [
    {
      href: "/dashboard",
      label: "Inicio",
      icon: Home
    },
    {
      href: "/dashboard/administrator/users",
      label: "Usuarios",
      icon: Users
    },
    {
      href: "/dashboard/administrator/reports",
      label: "Reportes",
      icon: FileText
    },
    {
      href: "/dashboard/administrator/settings",
      label: "Configuración",
      icon: Settings
    },
    {
      href: "/dashboard/administrator/profile",
      label: "Mi Perfil",
      icon: User
    }
  ]

  // Seleccionar el menú según el rol
  const menuItems = userRole === "administrator" ? adminMenuItems : userRole === "coordinator" ? coordinatorMenuItems : teacherMenuItems

  return (
    <>
      {/* Botón de menú para móviles */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden bg-white shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Overlay para móviles */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 h-full w-64 bg-primary text-white p-4 flex flex-col transition-transform duration-300 z-50",
          "md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:shadow-lg"
        )}
      >
        <div className="mb-8 px-4">
          <Link 
            href={`/dashboard/${userRole}`} 
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <img 
              src="/Logo.png" 
              alt="ETIAPC Logo" 
              className="h-12 w-auto object-contain"
            />
            <span className="text-xl font-bold">ETIAPC</span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              className={cn(
                "w-full justify-start hover:bg-white/10 transition-colors",
                isActive(item.href) ? "bg-white/20 text-white" : "text-white/80"
              )}
              asChild
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>

        <div className="mt-auto pt-4 space-y-1">
          <Link
            href="/dashboard/help"
            className={cn(
              "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
              isActive("/dashboard/help")
                ? "bg-white/20 text-white font-medium"
                : "text-white/80 hover:bg-white/10 hover:text-white"
            )}
          >
            <HelpCircle className="h-5 w-5" />
            <span>Ayuda</span>
          </Link>

          <button
            onClick={() => signOut({ callbackUrl: "/auth/login" })}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>
    </>
  )
} 