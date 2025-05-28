import { VapiCallRecord } from "@/types/vapi";

const VAPI_API_KEY = import.meta.env.VITE_VAPI_API_KEY;
const VAPI_BASE_URL = "https://api.vapi.ai";
const VAPI_AGENT_ID = import.meta.env.VITE_VAPI_AGENT_ID || "17195059-600b-4a2e-90b3-ab63c05a6837";

export const vapiService = {
  // Get all calls for the agent
  async getCalls(): Promise<VapiCallRecord[]> {
    try {
      // In a production environment, this should be called from your backend
      // to protect your API key
      const response = await fetch(`${VAPI_BASE_URL}/api/v1/calls`, {
        headers: {
          Authorization: `Bearer ${VAPI_API_KEY}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch calls: ${response.status}`);
      }

      const data = await response.json();
      return data.calls;
    } catch (error) {
      console.error("Error fetching calls:", error);
      return [];
    }
  },

  // Get a single call by ID
  async getCall(callId: string): Promise<VapiCallRecord | null> {
    try {
      const response = await fetch(`${VAPI_BASE_URL}/api/v1/calls/${callId}`, {
        headers: {
          Authorization: `Bearer ${VAPI_API_KEY}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch call: ${response.status}`);
      }

      const data = await response.json();
      return data.call;
    } catch (error) {
      console.error(`Error fetching call ${callId}:`, error);
      return null;
    }
  },

  // Get transcript for a call
  async getTranscript(callId: string) {
    try {
      const response = await fetch(`${VAPI_BASE_URL}/api/v1/calls/${callId}/transcript`, {
        headers: {
          Authorization: `Bearer ${VAPI_API_KEY}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch transcript: ${response.status}`);
      }

      const data = await response.json();
      return data.transcript;
    } catch (error) {
      console.error(`Error fetching transcript for call ${callId}:`, error);
      return null;
    }
  },

  // Make a new call using the Vapi API
  async makeCall(phoneNumber: string) {
    try {
      const response = await fetch(`${VAPI_BASE_URL}/api/v1/calls`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${VAPI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agent_id: VAPI_AGENT_ID,
          to: phoneNumber,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to make call: ${response.status}`);
      }

      const data = await response.json();
      return data.call;
    } catch (error) {
      console.error("Error making call:", error);
      return null;
    }
  },
};

export default vapiService;
