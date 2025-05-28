"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/DashboardLayout"
import StatCard from "@/components/dashboard/StatCard"
import CaseTable from "@/components/dashboard/CaseTable"
import { Search, FileText, Clock, Users } from "lucide-react"

const InvestigatorDashboard = () => {
  const [stats] = useState({
    activeCases: 5,
    pendingTasks: 12,
    completedInvestigations: 18,
    interviewsScheduled: 3,
  })

  const [cases] = useState([
    {
      id: "ABC1234567",
      title: "Financial Irregularities in Accounting",
      summary: "Report of expense falsification in accounting department",
      category: "Financial Fraud",
      status: "under-investigation" as const,
      date: "2025-01-28",
    },
    {
      id: "DEF2345678",
      title: "Workplace Harassment",
      summary: "Multiple reports of inappropriate behavior",
      category: "HR Violation",
      status: "new" as const,
      date: "2025-01-27",
    },
    {
      id: "GHI3456789",
      title: "Safety Protocol Violations",
      summary: "Repeated safety violations in manufacturing",
      category: "Safety",
      status: "escalated" as const,
      date: "2025-01-26",
    },
  ])

  return (
    <DashboardLayout title="Investigator Dashboard">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Active Cases"
            value={stats.activeCases}
            subtitle="Currently investigating"
            icon={<Search />}
          />
          <StatCard title="Pending Tasks" value={stats.pendingTasks} subtitle="Action required" icon={<Clock />} />
          <StatCard
            title="Completed"
            value={stats.completedInvestigations}
            subtitle="Investigations closed"
            icon={<FileText />}
          />
          <StatCard
            title="Interviews"
            value={stats.interviewsScheduled}
            subtitle="Scheduled this week"
            icon={<Users />}
          />
        </div>

        {/* Cases Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Investigation Cases</h2>
            <p className="text-gray-600">Cases requiring investigation and evidence gathering</p>
          </div>
          <div className="p-6">
            <CaseTable cases={cases} userRole="investigator" />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default InvestigatorDashboard
