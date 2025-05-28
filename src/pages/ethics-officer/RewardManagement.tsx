"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, TrendingUp, Award, Search } from "lucide-react"
import StatCard from "@/components/dashboard/StatCard"

const RewardManagement = () => {
  const [rewards] = useState([
    {
      id: "RW-001",
      caseId: "ABC1234567",
      caseTitle: "Financial Irregularities",
      amount: "$15,000",
      status: "approved",
      submittedDate: "2025-01-15",
      approvedDate: "2025-01-25",
      paymentStatus: "pending",
    },
    {
      id: "RW-002",
      caseId: "DEF2345678",
      caseTitle: "Safety Violations",
      amount: "$8,000",
      status: "pending",
      submittedDate: "2025-01-20",
      approvedDate: null,
      paymentStatus: "n/a",
    },
    {
      id: "RW-003",
      caseId: "GHI3456789",
      caseTitle: "Data Privacy Breach",
      amount: "$25,000",
      status: "approved",
      submittedDate: "2025-01-10",
      approvedDate: "2025-01-18",
      paymentStatus: "paid",
    },
  ])

  const [stats] = useState({
    totalRewards: "$48,000",
    pendingApproval: 3,
    approvedRewards: 8,
    averageReward: "$6,000",
  })

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "approved":
        return "default"
      case "pending":
        return "secondary"
      case "denied":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getPaymentStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "paid":
        return "default"
      case "pending":
        return "secondary"
      case "failed":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <DashboardLayout title="Reward Management">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Reward Management</h1>
          <p className="text-gray-600">Manage and approve whistleblower rewards</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Rewards" value={stats.totalRewards} subtitle="Issued to date" icon={<DollarSign />} />
          <StatCard
            title="Pending Approval"
            value={stats.pendingApproval}
            subtitle="Awaiting review"
            icon={<TrendingUp />}
          />
          <StatCard
            title="Approved Rewards"
            value={stats.approvedRewards}
            subtitle="Ready for payment"
            icon={<Award />}
          />
          <StatCard
            title="Average Reward"
            value={stats.averageReward}
            subtitle="Per valid report"
            icon={<DollarSign />}
          />
        </div>

        {/* Rewards Table */}
        <Card>
          <CardHeader>
            <CardTitle>Reward Applications</CardTitle>
            <CardDescription>Review and manage whistleblower reward applications</CardDescription>
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input placeholder="Search rewards..." className="pl-8" />
              </div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="denied">Denied</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reward ID</TableHead>
                  <TableHead>Case</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rewards.map((reward) => (
                  <TableRow key={reward.id}>
                    <TableCell className="font-medium">{reward.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{reward.caseId}</p>
                        <p className="text-sm text-gray-500">{reward.caseTitle}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{reward.amount}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(reward.status)} className="capitalize">
                        {reward.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {reward.paymentStatus !== "n/a" ? (
                        <Badge variant={getPaymentStatusBadgeVariant(reward.paymentStatus)} className="capitalize">
                          {reward.paymentStatus}
                        </Badge>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </TableCell>
                    <TableCell>{reward.submittedDate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        {reward.status === "pending" && (
                          <>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                              Deny
                            </Button>
                          </>
                        )}
                        {reward.status === "approved" && reward.paymentStatus === "pending" && (
                          <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                            Process Payment
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default RewardManagement
