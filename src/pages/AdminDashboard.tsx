
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, FileText, Phone, MessageSquare, Calendar, Clock, CheckSquare, User, ListChecks, ArrowRight } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface WhistleblowerReport {
  id: string;
  createdDate: string;
  title: string;
  department: string;
  status: "new" | "investigating" | "resolved";
  priority: "low" | "medium" | "high";
  assignedTo: string;
  progress: number;
  callCount: number;
}

interface Task {
  id: string;
  title: string;
  assignedTo: string;
  dueDate: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
}

const mockReports: WhistleblowerReport[] = [
  {
    id: "WB-2025-001",
    createdDate: "2025-05-15",
    title: "Expense Report Falsification",
    department: "Accounting",
    status: "new",
    priority: "high",
    assignedTo: "Jane Smith",
    progress: 0,
    callCount: 1,
  },
  {
    id: "WB-2025-002",
    createdDate: "2025-05-13",
    title: "Safety Protocol Violations",
    department: "Operations",
    status: "investigating",
    priority: "high",
    assignedTo: "John Doe",
    progress: 45,
    callCount: 2,
  },
  {
    id: "WB-2025-003",
    createdDate: "2025-05-10",
    title: "Harassment Complaint",
    department: "HR",
    status: "investigating",
    priority: "medium",
    assignedTo: "Alice Johnson",
    progress: 75,
    callCount: 3,
  },
  {
    id: "WB-2025-004",
    createdDate: "2025-05-05",
    title: "Data Privacy Breach",
    department: "IT",
    status: "resolved",
    priority: "high",
    assignedTo: "Bob Williams",
    progress: 100,
    callCount: 2,
  },
  {
    id: "WB-2025-005",
    createdDate: "2025-05-01",
    title: "Conflict of Interest",
    department: "Legal",
    status: "resolved",
    priority: "medium",
    assignedTo: "Jane Smith",
    progress: 100,
    callCount: 1,
  }
];

const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Review expense reports from Jan-Mar 2025",
    assignedTo: "Jane Smith",
    dueDate: "2025-05-20",
    status: "in-progress",
    priority: "high",
  },
  {
    id: "task-2",
    title: "Interview accounting department staff",
    assignedTo: "John Doe",
    dueDate: "2025-05-22",
    status: "pending",
    priority: "high",
  },
  {
    id: "task-3",
    title: "Cross-reference marketing travel receipts",
    assignedTo: "Alice Johnson",
    dueDate: "2025-05-25",
    status: "pending",
    priority: "medium",
  },
  {
    id: "task-4",
    title: "Prepare preliminary findings report",
    assignedTo: "Bob Williams",
    dueDate: "2025-05-30",
    status: "pending",
    priority: "medium",
  }
];

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReport, setSelectedReport] = useState<WhistleblowerReport | null>(null);
  const [filteredReports, setFilteredReports] = useState<WhistleblowerReport[]>(mockReports);
  const [investigationNote, setInvestigationNote] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query) {
      setFilteredReports(
        mockReports.filter(
          (report) =>
            report.id.toLowerCase().includes(query) ||
            report.title.toLowerCase().includes(query) ||
            report.department.toLowerCase().includes(query) ||
            report.assignedTo.toLowerCase().includes(query)
        )
      );
    } else {
      setFilteredReports(mockReports);
    }
  };

  const handleSelectReport = (report: WhistleblowerReport) => {
    setSelectedReport(report);
    setInvestigationNote("");
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-blue-500";
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "new":
        return "outline";
      case "investigating":
        return "secondary";
      case "resolved":
        return "default";
      default:
        return "outline";
    }
  };

  const getTaskStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "outline";
      case "in-progress":
        return "secondary";
      case "completed":
        return "default";
      default:
        return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <DashboardHeader title="Admin Investigation Dashboard" userRole="Administrator" />
      
      <div className="container mx-auto px-4 py-6 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockReports.length}</div>
              <p className="text-xs text-gray-500 mt-1">5 in the last 30 days</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Active Investigations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockReports.filter(r => r.status === "investigating").length}</div>
              <p className="text-xs text-gray-500 mt-1">2 high priority</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Pending Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockTasks.filter(t => t.status !== "completed").length}</div>
              <p className="text-xs text-gray-500 mt-1">2 due this week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Rewards Issued</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$4,500</div>
              <p className="text-xs text-gray-500 mt-1">3 whistleblowers rewarded</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Whistleblower Reports</CardTitle>
                <CardDescription>Manage and track reports</CardDescription>
                <div className="relative mt-2">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search reports..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[600px] overflow-y-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReports.map((report) => (
                        <TableRow 
                          key={report.id} 
                          onClick={() => handleSelectReport(report)}
                          className={`cursor-pointer hover:bg-gray-50 ${
                            selectedReport?.id === report.id ? "bg-blue-50" : ""
                          }`}
                        >
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${getPriorityColor(report.priority)}`} />
                              <span>{report.id}</span>
                            </div>
                          </TableCell>
                          <TableCell>{report.title}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusBadgeVariant(report.status)}>
                              {report.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            {selectedReport ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{selectedReport.title}</CardTitle>
                        <CardDescription>
                          {selectedReport.id} | Reported on {selectedReport.createdDate}
                        </CardDescription>
                      </div>
                      <Badge variant={getStatusBadgeVariant(selectedReport.status)} className="capitalize">
                        {selectedReport.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label className="text-sm text-gray-500">Department</Label>
                        <p className="font-medium">{selectedReport.department}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-500">Priority</Label>
                        <p className="font-medium capitalize">{selectedReport.priority}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-500">Assigned To</Label>
                        <p className="font-medium">{selectedReport.assignedTo}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-500">Related Calls</Label>
                        <p className="font-medium">{selectedReport.callCount}</p>
                      </div>
                    </div>
                    
                    <div className="mb-2 flex justify-between items-center">
                      <Label className="text-sm text-gray-500">Investigation Progress</Label>
                      <span className="text-sm font-medium">{selectedReport.progress}%</span>
                    </div>
                    <Progress value={selectedReport.progress} className="h-2" />
                    
                    <div className="mt-6 space-y-4">
                      <div className="flex justify-between">
                        <h3 className="font-medium">Status Update</h3>
                        {selectedReport.status !== "resolved" && (
                          <Select>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Update Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="investigating">Investigating</SelectItem>
                              <SelectItem value="resolved">Resolved</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                      
                      <Textarea
                        placeholder="Add investigation notes here..."
                        className="min-h-[100px]"
                        value={investigationNote}
                        onChange={(e) => setInvestigationNote(e.target.value)}
                      />
                      
                      <div className="flex justify-end">
                        <Button>
                          Save Note
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Tabs defaultValue="details">
                  <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="tasks">Tasks</TabsTrigger>
                    <TabsTrigger value="calls">Related Calls</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Report Details</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="description">Description</Label>
                            <div className="mt-1 p-3 bg-gray-50 rounded-md">
                              <p>Report of expense falsification in the Accounting department. The whistleblower has observed the senior manager modifying expense reports after initial submission, particularly for the marketing team's travel expenses. Amounts are typically inflated by 15-20%.</p>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <h3 className="font-medium mb-2">Evidence</h3>
                            <div className="space-y-2">
                              <div className="flex items-center p-2 bg-gray-50 rounded-md">
                                <FileText className="h-5 w-5 text-gray-500 mr-2" />
                                <span>Call Transcript - May 15, 2025</span>
                                <Button variant="ghost" size="sm" className="ml-auto">
                                  View
                                </Button>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="font-medium mb-2">Investigation Timeline</h3>
                            <div className="space-y-4">
                              <div className="flex gap-4">
                                <div className="flex flex-col items-center">
                                  <div className="h-5 w-5 rounded-full bg-blue-800"></div>
                                  <div className="h-full w-0.5 bg-gray-200"></div>
                                </div>
                                <div>
                                  <p className="font-medium">Report Created</p>
                                  <p className="text-sm text-gray-500">May 15, 2025 - 10:15 AM</p>
                                  <p className="text-sm mt-1">Initial report filed based on whistleblower call</p>
                                </div>
                              </div>
                              
                              <div className="flex gap-4">
                                <div className="flex flex-col items-center">
                                  <div className="h-5 w-5 rounded-full bg-blue-800"></div>
                                  <div className="h-full w-0.5 bg-gray-200"></div>
                                </div>
                                <div>
                                  <p className="font-medium">Assigned to Investigator</p>
                                  <p className="text-sm text-gray-500">May 15, 2025 - 11:30 AM</p>
                                  <p className="text-sm mt-1">Case assigned to Jane Smith for investigation</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="pt-4">
                            <Label htmlFor="reward">Reward Status</Label>
                            <Select>
                              <SelectTrigger className="w-full mt-1">
                                <SelectValue placeholder="Not yet determined" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">Not yet determined</SelectItem>
                                <SelectItem value="pending">Pending approval</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="issued">Issued</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="tasks">
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">Investigation Tasks</CardTitle>
                          <Button size="sm">
                            Add Task
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {mockTasks.map((task) => (
                            <div key={task.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-md">
                              <div className={`min-w-1 self-stretch w-1 rounded-full ${getPriorityColor(task.priority)}`}></div>
                              <div className="flex-grow">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium">{task.title}</span>
                                  <Badge variant={getTaskStatusBadgeVariant(task.status)} className="capitalize">
                                    {task.status}
                                  </Badge>
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                  <User className="h-3.5 w-3.5 mr-1" />
                                  <span className="mr-3">{task.assignedTo}</span>
                                  <Calendar className="h-3.5 w-3.5 mr-1" />
                                  <span>Due {task.dueDate}</span>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">
                                <ArrowRight className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="calls">
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">Related Calls</CardTitle>
                          <Button size="sm">
                            Request Call
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-md">
                            <Phone className="h-10 w-10 p-2 bg-blue-100 text-blue-800 rounded-full" />
                            <div className="flex-grow">
                              <div className="flex justify-between mb-1">
                                <span className="font-medium">Initial whistleblower report</span>
                                <span className="text-sm text-gray-500">12:45</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-500">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                <span className="mr-3">May 15, 2025 - 09:30 AM</span>
                                <MessageSquare className="h-3.5 w-3.5 mr-1" />
                                <span>Transcript available</span>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              Listen
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center border rounded-lg p-10">
                <div className="text-center">
                  <ListChecks className="mx-auto h-12 w-12 text-gray-400" />
                  <h2 className="mt-2 text-xl font-medium text-gray-900">No Report Selected</h2>
                  <p className="mt-1 text-gray-500">
                    Select a report from the list to view details
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
