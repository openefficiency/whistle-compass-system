
export interface VapiCallRecord {
  id: string;
  created_at: string;
  updated_at: string;
  status: "queued" | "in-progress" | "completed" | "failed";
  from: string;
  to: string;
  duration: number;
  transcript?: VapiTranscript;
}

export interface VapiTranscript {
  id: string;
  call_id: string;
  created_at: string;
  content: string;
}

export interface CreateReportFormData {
  title: string;
  department: string;
  description: string;
  priority: "low" | "medium" | "high";
  assignTo: string;
  callId: string;
}
