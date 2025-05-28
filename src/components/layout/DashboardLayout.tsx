"use client"

import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import DashboardHeader from "@/components/DashboardHeader"
import { useAuth } from "@/contexts/AuthContext"
import { Sidebar } from "@/components/ui/sidebar"

interface DashboardLayoutProps {
  children: ReactNode
  requiredRole?: string
}

export default function DashboardLayout({ children, requiredRole }: DashboardLayoutProps) {
  const { user, loading } = useAuth()

  // Simulate role check - in a real app, this would come from the user object
  const userRole = "admin" // This would be dynamic based on the user's actual role

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-600 border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/unauthorized" replace />
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <Sidebar className="hidden md:block w-64 border-r" />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
