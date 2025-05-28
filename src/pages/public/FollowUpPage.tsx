"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MessageCircle, DollarSign, Clock, Mic } from "lucide-react"
import PublicLayout from "@/components/layout/PublicLayout"
import { useToast } from "@/hooks/use-toast"

const FollowUpPage = () => {
  const [reportId, setReportId] = useState("")
  const [reportData, setReportData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Mock report data
  const mockReportData = {
    id: "ABC1234567",
    status: "under-investigation",
    title: "Financial Irregularities in Accounting",
    category: "Financial Fraud",
    submittedDate: "2025-01-28",
    lastUpdate: "2025-01-29",
    investigator: "Assigned",
    updates: [
      {
        date: "2025-01-29",
        message: "Your report has been assigned to an investigator. We may reach out for additional information.",
        type: "status",
      },
      {
        date: "2025-01-28",
        message: "Thank you for your report. We have received your submission and it's under initial review.",
        type: "status",
      },
    ],
    reward: {
      status: "pending",
      amount: null,
    },
  }

  const handleSearch = async () => {
    if (!reportId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a report ID",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (reportId.toUpperCase() === "ABC1234567") {
        setReportData(mockReportData)
      } else {
        toast({
          title: "Report Not Found",
          description: "No report found with this ID. Please check and try again.",
          variant: "destructive",
        })
        setReportData(null)
      }
      setIsLoading(false)
    }, 1000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800"
      case "under-investigation":
        return "bg-yellow-100 text-yellow-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "escalated":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Follow Up on Your Report</h1>
          <p className="text-lg text-gray-600">
            Enter your confidential report ID to check the status and receive updates
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Report Lookup</CardTitle>
            <CardDescription>Enter your 10-character report ID to view status and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter your report ID (e.g., ABC1234567)"
                  value={reportId}
                  onChange={(e) => setReportId(e.target.value.toUpperCase())}
                  maxLength={10}
                />
              </div>
              <Button onClick={handleSearch} disabled={isLoading} className="bg-teal-600 hover:bg-teal-700">
                <Search className="h-4 w-4 mr-2" />
                {isLoading ? "Searching..." : "Search"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {reportData && (
          <div className="space-y-6">
            {/* Report Overview */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Report {reportData.id}</CardTitle>
                    <CardDescription>{reportData.title}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(reportData.status)}>
                    {reportData.status.replace("-", " ").toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium">{reportData.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Submitted</p>
                    <p className="font-medium">{reportData.submittedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Update</p>
                    <p className="font-medium">{reportData.lastUpdate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Investigator</p>
                    <p className="font-medium">{reportData.investigator}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status Updates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Status Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportData.updates.map((update: any, index: number) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-teal-600 rounded-full"></div>
                        {index < reportData.updates.length - 1 && <div className="w-0.5 h-8 bg-gray-200 mt-2"></div>}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-500">{update.date}</span>
                        </div>
                        <p className="text-gray-800">{update.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reward Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Reward Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                {reportData.reward.status === "pending" ? (
                  <div className="text-center py-8">
                    <div className="bg-yellow-100 text-yellow-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Clock className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Reward Under Review</h3>
                    <p className="text-gray-600">
                      Your report is being evaluated for potential rewards. You'll be notified once the review is
                      complete.
                    </p>
                  </div>
                ) : reportData.reward.status === "approved" ? (
                  <div className="text-center py-8">
                    <div className="bg-green-100 text-green-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <DollarSign className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Reward Approved</h3>
                    <p className="text-gray-600 mb-4">
                      Congratulations! Your report has been approved for a reward of ${reportData.reward.amount}.
                    </p>
                    <Button className="bg-teal-600 hover:bg-teal-700">Claim Reward</Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No reward information available at this time.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Additional Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Need to Provide More Information?</CardTitle>
                <CardDescription>
                  If investigators have questions, you can provide additional details here
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Mic className="h-4 w-4 mr-2" />
                    Voice Update
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Demo Instructions */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <h3 className="font-medium text-blue-900 mb-2">Demo Instructions</h3>
            <p className="text-blue-800 text-sm">
              Try entering <strong>ABC1234567</strong> as a sample report ID to see how the follow-up system works.
            </p>
          </CardContent>
        </Card>
      </div>
    </PublicLayout>
  )
}

export default FollowUpPage
