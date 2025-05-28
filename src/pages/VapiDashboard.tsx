import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Play, Pause, Phone, FileText, Plus, Calendar } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";

interface CallRecord {
  id: string;
  date: string;
  time: string;
  duration: string;
  status: "completed" | "in-progress" | "failed";
  phone: string;
  hasTranscript: boolean;
}

const mockCallData: CallRecord[] = [
  { id: "call-1", date: "2025-05-15", time: "09:30 AM", duration: "12:45", status: "completed", phone: "+1 (555) 123-4567", hasTranscript: true },
  { id: "call-2", date: "2025-05-14", time: "02:15 PM", duration: "08:32", status: "completed", phone: "+1 (555) 234-5678", hasTranscript: true },
  { id: "call-3", date: "2025-05-13", time: "11:20 AM", duration: "15:07", status: "completed", phone: "+1 (555) 345-6789", hasTranscript: true },
  { id: "call-4", date: "2025-05-12", time: "04:45 PM", duration: "03:22", status: "failed", phone: "+1 (555) 456-7890", hasTranscript: false },
  { id: "call-5", date: "2025-05-12", time: "01:50 PM", duration: "07:18", status: "completed", phone: "+1 (555) 567-8901", hasTranscript: true }
];

const mockTranscript = `
[System] 2025-05-15 09:30:15: Call initiated.
[Agent] 2025-05-15 09:30:20: Thank you for calling our secure whistleblower hotline. Your call is confidential. Could you please describe the situation you'd like to report?
[Caller] 2025-05-15 09:31:05: Yes, I want to report an incident I witnessed in the accounting department. I noticed that expense reports are being falsified by the senior manager.
[Agent] 2025-05-15 09:31:35: I understand. Could you provide more details about what you observed and when this occurred?
[Caller] 2025-05-15 09:32:20: I saw multiple expense reports with inflated numbers being approved last week. The amounts were changed after initial submission. This has happened at least three times that I've noticed.
[Agent] 2025-05-15 09:33:00: Thank you for that information. Did you notice any specific patterns or individuals involved besides the senior manager?
[Caller] 2025-05-15 09:33:45: Yes, it seems to be happening mostly with reports from the marketing team's travel expenses. The amounts are usually inflated by 15-20%.
[System] 2025-05-15 09:43:00: Call concluded.
`;

const VapiDashboard = () => {
  const [selectedCall, setSelectedCall] = useState<CallRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [filteredCalls, setFilteredCalls] = useState<CallRecord[]>(mockCallData);

  useEffect(() => {
    if (searchQuery) {
      setFilteredCalls(
        mockCallData.filter(
          (call) =>
            call.phone.includes(searchQuery) ||
            call.date.includes(searchQuery) ||
            call.time.includes(searchQuery)
        )
      );
    } else {
      setFilteredCalls(mockCallData);
    }
  }, [searchQuery]);

  const handleSelectCall = (call: CallRecord) => {
    setSelectedCall(call);
    setIsPlaying(false);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const createNewReport = () => {
    // In a real application, this would open a form or modal to create a new report
    alert("Creating new report from call data");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <DashboardHeader title="Vapi Call Dashboard" userRole="Investigator" />
      
      <div className="container mx-auto px-4 py-6 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Call Records</h1>
          <div className="flex items-center gap-2">
            <Button className="bg-teal-500 hover:bg-teal-600">
              <Phone className="mr-2 h-4 w-4" /> 
              Make Call
            </Button>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Call
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Call History</CardTitle>
                <CardDescription>Manage and review recent calls</CardDescription>
                <div className="relative mt-2">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search calls..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[600px] overflow-y-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCalls.map((call) => (
                        <TableRow 
                          key={call.id} 
                          onClick={() => handleSelectCall(call)}
                          className={`cursor-pointer hover:bg-gray-50 ${
                            selectedCall?.id === call.id ? "bg-blue-50" : ""
                          }`}
                        >
                          <TableCell>
                            <div className="font-medium">{call.date}</div>
                            <div className="text-sm text-gray-500">{call.time}</div>
                          </TableCell>
                          <TableCell>{call.duration}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                call.status === "completed"
                                  ? "default"
                                  : call.status === "in-progress"
                                  ? "outline"
                                  : "destructive"
                              }
                            >
                              {call.status}
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
            {selectedCall ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Call Details</CardTitle>
                        <CardDescription>
                          Call ID: {selectedCall.id} | {selectedCall.date} at {selectedCall.time}
                        </CardDescription>
                      </div>
                      <Button variant="outline" onClick={createNewReport}>
                        <Plus className="mr-2 h-4 w-4" /> Create Report
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm text-gray-500">Phone Number</Label>
                        <p className="font-medium">{selectedCall.phone}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-500">Duration</Label>
                        <p className="font-medium">{selectedCall.duration}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-500">Status</Label>
                        <p className="font-medium capitalize">{selectedCall.status}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-500">Transcript</Label>
                        <p className="font-medium">{selectedCall.hasTranscript ? "Available" : "Not available"}</p>
                      </div>
                    </div>

                    {selectedCall.status === "completed" && (
                      <div className="mt-4">
                        <div className="bg-gray-100 p-3 rounded-md flex items-center gap-4 mb-4">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={togglePlayback}
                          >
                            {isPlaying ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </Button>
                          <div className="h-2 bg-gray-300 flex-1 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-800 rounded-full" style={{ width: "35%" }} />
                          </div>
                          <span className="text-sm text-gray-500">4:28 / 12:45</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {selectedCall.hasTranscript && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <FileText className="mr-2 h-5 w-5" /> Transcript
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="full">
                        <TabsList className="mb-4">
                          <TabsTrigger value="full">Full Transcript</TabsTrigger>
                          <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
                        </TabsList>
                        <TabsContent value="full">
                          <div className="bg-gray-50 p-4 rounded-md max-h-[400px] overflow-y-auto">
                            <pre className="whitespace-pre-wrap font-sans text-sm">
                              {mockTranscript}
                            </pre>
                          </div>
                        </TabsContent>
                        <TabsContent value="analysis">
                          <div className="space-y-4">
                            <div>
                              <h3 className="font-medium mb-2">Key Issues Identified:</h3>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>Expense report falsification</li>
                                <li>Senior manager involvement</li>
                                <li>Marketing team travel expenses</li>
                                <li>15-20% inflation of amounts</li>
                              </ul>
                            </div>
                            <div>
                              <h3 className="font-medium mb-2">Suggested Actions:</h3>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>Audit of recent marketing team travel expenses</li>
                                <li>Review of approval processes</li>
                                <li>Investigation into senior manager conduct</li>
                              </ul>
                            </div>
                            <Separator />
                            <div>
                              <h3 className="font-medium mb-2">Suggested Report Fields:</h3>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-gray-500 text-sm">Department</Label>
                                  <p className="font-medium">Accounting</p>
                                </div>
                                <div>
                                  <Label className="text-gray-500 text-sm">Issue Type</Label>
                                  <p className="font-medium">Financial Misconduct</p>
                                </div>
                                <div>
                                  <Label className="text-gray-500 text-sm">Priority</Label>
                                  <p className="font-medium">High</p>
                                </div>
                                <div>
                                  <Label className="text-gray-500 text-sm">Key Personnel</Label>
                                  <p className="font-medium">Senior Manager, Accounting</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center border rounded-lg p-10">
                <div className="text-center">
                  <Phone className="mx-auto h-12 w-12 text-gray-400" />
                  <h2 className="mt-2 text-xl font-medium text-gray-900">No Call Selected</h2>
                  <p className="mt-1 text-gray-500">
                    Select a call from the list to view details
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

export default VapiDashboard;
