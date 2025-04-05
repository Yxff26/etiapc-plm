"use client"

import { Sidebar } from "@/components/dashboard/Sidebar"
import { TopBar } from "@/components/dashboard/TopBar"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

type UserRole = "teacher" | "coordinator" | "administrator"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login")
    }
  }, [status, router])

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!session?.user) {
    return null
  }

  // Determine user role from session with type assertion
  const userRole = (session.user.role || "teacher") as UserRole

  return (
    <div className="min-h-screen bg-background">
      <Sidebar userRole={userRole} />
      <div className="pl-64">
        <TopBar 
          userRole={userRole} 
          userName={session.user.firstName || "Usuario"} 
          userEmail={session.user.email || "usuario@ejemplo.com"} 
        />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
} 