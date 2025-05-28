"use client"

import { useParams } from "react-router-dom"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Clock, User, DollarSign } from "lucide-react"

const CaseDetails = () => {
  const { id } = useParams()

  // Mock case data
  const caseData = {
    id: id || "ABC1234567",
    title: "Financial Irregularities in Accounting",
    category: "Financial Fraud",
    status: "under-investigation",
    priority: "high",
    submittedDate: "2025-01-28",
    lastUpdate: "2025-01-29",
    description:
      "Report of expense falsification in the accounting department. The whistleblower observed the senior manager modifying expense reports after initial submission, particularly for the marketing team's travel expenses. Amounts are typically inflated by 15-20%.",
    evidence: [
      {
        type: "voice-recording",
        name: "Initial Report - January 28, 2025",
        description: "Voice recording of whistleblower's initial report",
        timestamp: "2025-01-28 09:30:00",
      },
      {
        type: "document",
        name: "Expense Reports Analysis",
        description: "Comparison of original vs modified expense reports",
        timestamp: "2025-01-29 14:15:00",
      },
    ],
    timeline: [
      {
        date: "2025-01-28",
        event: "Report submitted via voice AI",
        details: "Whistleblower reported expense falsification concerns",
      },
      {
        date: "2025-01-28",
        event: "Case assigned to ethics officer",
        details: "Case automatically assigned based on category and priority",
      },
      {
        date: "2025-01-29",
        event: "Initial investigation started",
        details: "Began review of accounting department expense reports",
      },
    ],
    reward: {
      status: "pending",
      estimatedAmount: "$5,000 - $15,000",
      criteria: "Valid financial fraud report with substantial evidence",
    },
  }

  return (
    <DashboardLayout title={`Case ${caseData.id}`}>
      <div className="space-y-6">
        {/* Case Header */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{caseData.title}</CardTitle>
                <CardDescription>
                  Case ID: {caseData.id} • Submitted {caseData.submittedDate}
                </CardDescription>
              </div>
              <Badge variant="secondary" className="capitalize">
                {caseData.status.replace("-", " ")}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-medium">{caseData.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Priority</p>
                <p className="font-medium capitalize">{caseData.priority}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Update</p>
                <p className="font-medium">{caseData.lastUpdate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <Select defaultValue={caseData.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="under-investigation">Under Investigation</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="escalated">Escalated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Case Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Case Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{caseData.description}</p>
              </CardContent>
            </Card>

            {/* Evidence */}
            <Card>
              <CardHeader>
                <CardTitle>Evidence & Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {caseData.evidence.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.description}</p>
                          <p className="text-xs text-gray-400">{item.timestamp}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Investigation Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Investigation Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Add your investigation notes here..."
                  className="min-h-[150px]"
                  defaultValue="Initial review of expense reports from Q4 2024 shows discrepancies in marketing team travel expenses. Need to interview accounting manager and request original receipts."
                />
                <div className="flex justify-end mt-4">
                  <Button className="bg-teal-600 hover:bg-teal-700">Save Notes</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {caseData.timeline.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-teal-600 rounded-full"></div>
                        {index < caseData.timeline.length - 1 && <div className="w-0.5 h-8 bg-gray-200 mt-2"></div>}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.event}</p>
                        <p className="text-xs text-gray-500 mb-1">{item.date}</p>
                        <p className="text-sm text-gray-600">{item.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reward Assessment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Reward Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <Badge variant="outline" className="capitalize">
                      {caseData.reward.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Estimated Amount</p>
                    <p className="font-medium">{caseData.reward.estimatedAmount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Criteria</p>
                    <p className="text-sm text-gray-600">{caseData.reward.criteria}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Reward Decision</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select decision" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="approve">Approve Reward</SelectItem>
                        <SelectItem value="deny">Deny Reward</SelectItem>
                        <SelectItem value="pending">Keep Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full bg-teal-600 hover:bg-teal-700">Update Reward Status</Button>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Case Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    Request Additional Info
                  </Button>
                  <Button variant="outline" className="w-full">
                    Schedule Interview
                  </Button>
                  <Button variant="outline" className="w-full">
                    Escalate to Admin
                  </Button>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Mark as Resolved</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default CaseDetails
