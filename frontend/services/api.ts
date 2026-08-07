// frontend/services/api.ts

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";


// ============================================================
// TYPES
// ============================================================

export interface AIInsights {
  machine: string;
  telemetry: any;
  predictive_maintenance: any;
  remaining_useful_life: any;
  anomaly_detection: any;
}

export interface CopilotResponse {
  answer: string;
  source?: string;
  factory_data_used?: boolean;
}


// ============================================================
// GENERIC RESPONSE HANDLER
// ============================================================

async function handleResponse<T>(
  response: Response
): Promise<T> {

  const text = await response.text();

  if (!response.ok) {

    console.error(
      "Backend error:",
      response.status,
      text
    );

    throw new Error(
      `Backend request failed: ${response.status}`
    );
  }

  if (!text) {
    throw new Error("Backend returned an empty response.");
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error("Backend returned invalid JSON.");
  }
}


// ============================================================
// AI INSIGHTS — DIGITAL TWIN
// ============================================================

export async function getAIInsights(
  machineId: string
): Promise<AIInsights> {

  const response = await fetch(
    `${API_BASE_URL}/api/ai-insights/${encodeURIComponent(machineId)}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  return handleResponse<AIInsights>(response);
}


// ============================================================
// FACTORY MACHINES
// ============================================================

export async function getFactoryMachines() {

  const machines = [
    "CNC-001",
    "CNC-002",
    "Robot Arm",
    "Inspection",
  ];

  return Promise.all(
    machines.map((machine) =>
      getAIInsights(machine)
    )
  );
}


// ============================================================
// COPILOT
// ============================================================

export async function askCopilot(
  message: string
): Promise<CopilotResponse> {

  const cleanMessage = message.trim();

  if (!cleanMessage) {
    throw new Error("Message cannot be empty.");
  }

  // IMPORTANT:
  // This MUST match the backend route that worked in Swagger.
  const url = `${API_BASE_URL}/api/copilot`;

  console.log("================================");
  console.log("🤖 FactoryOS Copilot");
  console.log("URL:", url);
  console.log("Question:", cleanMessage);
  console.log("================================");

  let response: Response;

  try {

    response = await fetch(url, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify({
        message: cleanMessage,
      }),

      cache: "no-store",
    });

  } catch (error) {

    console.error(
      "❌ Could not connect to FastAPI:",
      error
    );

    throw new Error(
      "Cannot connect to FactoryOS backend. Make sure FastAPI is running."
    );
  }


  const text = await response.text();

  console.log(
    "Copilot status:",
    response.status
  );

  console.log(
    "Copilot raw response:",
    text
  );


  if (!response.ok) {

    console.error(
      "❌ Copilot backend error:",
      response.status,
      text
    );

    throw new Error(
      `Failed to contact AI Copilot: ${response.status}`
    );
  }


  if (!text) {
    throw new Error(
      "Copilot returned an empty response."
    );
  }


  let data: any;

  try {

    data = JSON.parse(text);

  } catch {

    console.error(
      "❌ Copilot returned invalid JSON:",
      text
    );

    throw new Error(
      "Copilot returned an invalid response."
    );
  }


  // Backend currently returns:
  //
  // {
  //   "answer": "...",
  //   "source": "groq",
  //   "factory_data_used": true
  // }

  if (!data.answer) {

    console.error(
      "❌ Copilot response has no answer:",
      data
    );

    throw new Error(
      "Copilot returned no answer."
    );
  }


  console.log(
    "✅ Copilot answer received"
  );

  return data as CopilotResponse;
}


// ============================================================
// EXPORT
// ============================================================

export { API_BASE_URL };