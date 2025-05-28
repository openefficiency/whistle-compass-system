"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/DashboardLayout"
import StatCard from "@/components/dashboard/StatCard"
import CaseTable from "@/components/dashboard/CaseTable"
import { FileText, Clock, CheckCircle, DollarSign } from "lucide-react"

const EthicsOfficerDashboard = () => {
  const [stats] = useState({
    assignedCases: 8,
    pendingReview: 3,
    resolvedCases: 12,
    rewardsApproved: "$25,000",
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
      status: "resolved" as const,
      date: "2025-01-26",
    },
  ])

  return (
    <DashboardLayout title="Ethics Officer Dashboard">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Assigned Cases"
            value={stats.assignedCases}
            subtitle="Currently investigating"
            icon={<FileText />}
          />
          <StatCard title="Pending Review" value={stats.pendingReview} subtitle="Awaiting decision" icon={<Clock />} />
          <StatCard
            title="Resolved Cases"
            value={stats.resolvedCases}
            subtitle="Successfully closed"
            icon={<CheckCircle />}
          />
          <StatCard
            title="Rewards Approved"
            value={stats.rewardsApproved}
            subtitle="Total approved"
            icon={<DollarSign />}
          />
        </div>

        {/* Cases Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">My Cases</h2>
            <p className="text-gray-600">Cases assigned to you for review and investigation</p>
          </div>
          <div className="p-6">
            <CaseTable cases={cases} userRole="ethics-officer" />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default EthicsOfficerDashboard
