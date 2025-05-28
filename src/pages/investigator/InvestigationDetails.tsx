"use client"

import { useParams } from "react-router-dom"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Users, Calendar, CheckSquare } from "lucide-react"

const InvestigationDetails = () => {
  const { id } = useParams()

  // Mock investigation data
  const investigationData = {
    id: id || "ABC1234567",
    title: "Financial Irregularities in Accounting",
    status: "under-investigation",
    priority: "high",
    assignedDate: "2025-01-28",
    dueDate: "2025-02-15",
    progress: 65,
    tasks: [
      {
        id: 1,
        title: "Review expense reports Q4 2024",
        status: "completed",
        dueDate: "2025-01-30",
        assignee: "Current User",
      },
      {
        id: 2,
        title: "Interview accounting manager",
        status: "in-progress",
        dueDate: "2025-02-02",
        assignee: "Current User",
      },
      {
        id: 3,
        title: "Analyze travel receipt discrepancies",
        status: "pending",
        dueDate: "2025-02-05",
        assignee: "Current User",
      },
      {
        id: 4,
        title: "Prepare preliminary findings report",
        status: "pending",
        dueDate: "2025-02-10",
        assignee: "Current User",
      },
    ],
    interviews: [
      {
        id: 1,
        person: "John Smith - Accounting Manager",
        date: "2025-02-02",
        time: "10:00 AM",
        status: "scheduled",
        location: "Conference Room A",
      },
      {
        id: 2,
        person: "Sarah Johnson - Marketing Director",
        date: "2025-02-03",
        time: "2:00 PM",
        status: "pending",
        location: "TBD",
      },
    ],
    findings: [
      {
        date: "2025-01-29",
        finding: "Identified 12 expense reports with post-submission modifications",
        evidence: "Expense report audit trail",
        significance: "high",
      },
      {
        date: "2025-01-30",
        finding: "Pattern of 15-20% inflation in marketing travel expenses",
        evidence: "Comparative analysis spreadsheet",
        significance: "high",
      },
    ],
  }

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout title={`Investigation ${investigationData.id}`}>
      <div className="space-y-6">
        {/* Investigation Header */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{investigationData.title}</CardTitle>
                <CardDescription>
                  Investigation ID: {investigationData.id} • Assigned {investigationData.assignedDate}
                </CardDescription>
              </div>
              <Badge variant="secondary" className="capitalize">
                {investigationData.status.replace("-", " ")}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Priority</p>
                <p className="font-medium capitalize">{investigationData.priority}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Due Date</p>
                <p className="font-medium">{investigationData.dueDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Progress</p>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-teal-600 h-2 rounded-full"
                      style={{ width: `${investigationData.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{investigationData.progress}%</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium capitalize">{investigationData.status.replace("-", " ")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Investigation Tabs */}
        <Tabs defaultValue="tasks" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
            <TabsTrigger value="findings">Findings</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckSquare className="h-5 w-5 mr-2" />
                  Investigation Tasks
                </CardTitle>
                <CardDescription>Track progress on investigation activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {investigationData.tasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getTaskStatusColor(task.status)}`}
                        >
                          {task.status.replace("-", " ")}
                        </div>
                        <div>
                          <p className="font-medium">{task.title}</p>
                          <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {task.status !== "completed" && (
                          <Button size="sm" variant="outline">
                            Mark Complete
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button className="bg-teal-600 hover:bg-teal-700">Add New Task</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interviews">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Interviews
                </CardTitle>
                <CardDescription>Schedule and manage witness interviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {investigationData.interviews.map((interview) => (
                    <div key={interview.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Calendar className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium">{interview.person}</p>
                          <p className="text-sm text-gray-500">
                            {interview.date} at {interview.time} • {interview.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="capitalize">
                          {interview.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          {interview.status === "scheduled" ? "Reschedule" : "Schedule"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button className="bg-teal-600 hover:bg-teal-700">Schedule Interview</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="findings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Investigation Findings
                </CardTitle>
                <CardDescription>Document key findings and evidence</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {investigationData.findings.map((finding, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-sm text-gray-500">{finding.date}</p>
                        <Badge
                          variant={finding.significance === "high" ? "destructive" : "secondary"}
                          className="capitalize"
                        >
                          {finding.significance} significance
                        </Badge>
                      </div>
                      <p className="font-medium mb-2">{finding.finding}</p>
                      <p className="text-sm text-gray-600">Evidence: {finding.evidence}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button className="bg-teal-600 hover:bg-teal-700">Add Finding</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes">
            <Card>
              <CardHeader>
                <CardTitle>Investigation Notes</CardTitle>
                <CardDescription>Document your investigation process and observations</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Add your investigation notes here..."
                  className="min-h-[300px]"
                  defaultValue="Investigation Progress Notes:

January 29, 2025:
- Completed initial review of Q4 2024 expense reports
- Identified 12 reports with post-submission modifications
- All modifications show consistent pattern of 15-20% increases
- Focus area: Marketing team travel expenses

January 30, 2025:
- Prepared interview questions for accounting manager
- Requested original receipts for flagged expenses
- Need to verify approval workflow and access controls

Next Steps:
- Interview John Smith (Accounting Manager) on Feb 2
- Analyze system access logs
- Review company expense policy compliance"
                />
                <div className="flex justify-end mt-4">
                  <Button className="bg-teal-600 hover:bg-teal-700">Save Notes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

export default InvestigationDetails
