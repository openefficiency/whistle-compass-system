"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/DashboardLayout"
import StatCard from "@/components/dashboard/StatCard"
import CaseTable from "@/components/dashboard/CaseTable"
import { Users, FileText, DollarSign, TrendingUp } from "lucide-react"

const AdminDashboard = () => {
  const [stats] = useState({
    totalUsers: 24,
    openCases: 10,
    totalRewards: "$58,000",
    bountyAvailable: "$92,000",
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
    <DashboardLayout title="Admin Dashboard">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Users" value={stats.totalUsers} subtitle="Across all roles" icon={<Users />} />
          <StatCard title="Open Cases" value={stats.openCases} subtitle="Requiring attention" icon={<FileText />} />
          <StatCard title="Total Rewards" value={stats.totalRewards} subtitle="Issued to date" icon={<DollarSign />} />
          <StatCard
            title="Bounty Available"
            value={stats.bountyAvailable}
            subtitle="Ready for distribution"
            icon={<TrendingUp />}
          />
        </div>

        {/* Cases Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Recent Cases</h2>
            <p className="text-gray-600">Overview of all whistleblower reports</p>
          </div>
          <div className="p-6">
            <CaseTable cases={cases} userRole="admin" />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default AdminDashboard
