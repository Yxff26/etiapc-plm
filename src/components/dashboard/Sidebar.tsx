"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import {
  Home,
  User,
  ClipboardCheck,
  BookOpen,
  Settings,
  HelpCircle,
  LogOut,
  Users,
  ShieldCheck,
  GraduationCap,
  BarChart,
} from "lucide-react"

// Tipo de rol basado en el modelo de usuario
type UserRole = "teacher" | "coordinator" | "administrator"

interface SidebarProps {
  userRole?: UserRole
}

export function Sidebar({ userRole = "teacher" }: SidebarProps) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    // Si es la ruta principal del dashboard
    if (path === `/dashboard/${userRole}`) {
      return pathname === path
    }
    // Para subrutas, verificar si la ruta actual comienza con la ruta del menú
    return pathname.startsWith(path)
  }

  // Menú para profesores
  const teacherMenu = [
    { icon: Home, label: "Inicio", path: "/dashboard" },
    { icon: ClipboardCheck, label: "Mis Evaluaciones", path: "/dashboard/teacher/evaluations" },
    { icon: BookOpen, label: "Mis Asignaturas", path: "/dashboard/teacher/subjects" },
    { icon: BarChart, label: "Mis Estadísticas", path: "/dashboard/teacher/stats" },
    { icon: User, label: "Mi Perfil", path: "/dashboard/teacher/profile" },
  ]

  // Menú para coordinadores
  const coordinatorMenu = [
    { icon: Home, label: "Inicio", path: "/dashboard" },
    { icon: GraduationCap, label: "Profesores", path: "/dashboard/coordinator/teachers" },
    { icon: ClipboardCheck, label: "Evaluaciones", path: "/dashboard/coordinator/evaluations" },
    { icon: BookOpen, label: "Asignaturas", path: "/dashboard/coordinator/subjects" },
    { icon: BarChart, label: "Reportes", path: "/dashboard/coordinator/reports" },
    { icon: User, label: "Mi Perfil", path: "/dashboard/coordinator/profile" },
  ]

  // Menú para administradores
  const adminMenu = [
    { icon: Home, label: "Inicio", path: "/dashboard" },
    { icon: Users, label: "Usuarios", path: "/dashboard/administrator/users" },
    { icon: BarChart, label: "Reportes", path: "/dashboard/administrator/reports" },
    { icon: User, label: "Mi Perfil", path: "/dashboard/administrator/profile" },
  ]

  // Seleccionar el menú según el rol
  const menuItems = userRole === "administrator" ? adminMenu : userRole === "coordinator" ? coordinatorMenu : teacherMenu

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-primary text-white p-4 flex flex-col">
      <div className="mb-8 px-4">
        <Link href={`/dashboard/${userRole}`} className="flex items-center">
          <div className="h-8 w-8 rounded-md bg-white flex items-center justify-center mr-2">
            <div className="h-4 w-4 rounded-sm bg-primary" />
          </div>
          <span className="text-xl font-bold">ETIAPC</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors ${
              isActive(item.path) 
                ? "bg-white/20 text-white font-medium shadow-sm" 
                : ""
            }`}
          >
            <item.icon className={`h-5 w-5 ${isActive(item.path) ? "text-white" : "text-white/80"}`} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-4 space-y-1">
        <Link
          href="/dashboard/help"
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors ${
            isActive("/dashboard/help") 
              ? "bg-white/20 text-white font-medium shadow-sm" 
              : ""
          }`}
        >
          <HelpCircle className={`h-5 w-5 ${isActive("/dashboard/help") ? "text-white" : "text-white/80"}`} />
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
  )
} 