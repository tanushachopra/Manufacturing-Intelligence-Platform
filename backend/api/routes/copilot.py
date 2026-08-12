import os
import json
import requests

from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from services.ai_service import get_ai_insights

load_dotenv()

router = APIRouter()


# =========================================================
# REQUEST MODEL
# =========================================================

class CopilotRequest(BaseModel):
    message: str


# =========================================================
# MACHINE IDS
# =========================================================

MACHINE_IDS = [
    "CNC-001",
    "CNC-002",
    "CNC-003",
    "CNC-004",
]


# =========================================================
# GET LIVE FACTORY DATA
# =========================================================

def get_live_factory_summary():

    records = []

    for machine_id in MACHINE_IDS:

        try:

            result = get_ai_insights(machine_id)

            if result is not None:

                records.append(result)

        except Exception as e:

            print(
                f"⚠️ Could not get data for {machine_id}:",
                e
            )

    return records


# =========================================================
# DETECT WHETHER FACTORY DATA IS NEEDED
# =========================================================

def needs_factory_data(message: str) -> bool:

    message = message.lower().strip()

    factory_keywords = [
        "machine",
        "machines",
        "factory",
        "plant",
        "production",
        "maintenance",
        "maintain",
        "failure",
        "fail",
        "health",
        "healthy",
        "anomaly",
        "anomalies",
        "temperature",
        "vibration",
        "pressure",
        "rpm",
        "quality",
        "oee",
        "risk",
        "cnc",
        "equipment",
        "rul",
        "remaining useful life",
        "remaining life",
        "tool wear",
        "coolant",
        "spindle",
        "motor",
        "telemetry",
    ]

    return any(
        keyword in message
        for keyword in factory_keywords
    )


# =========================================================
# GROQ
# =========================================================

@router.post("/api/copilot")
def copilot(request: CopilotRequest):

    message = request.message.strip()

    if not message:

        raise HTTPException(
            status_code=400,
            detail="Message cannot be empty",
        )


    # =====================================================
    # API KEY
    # =====================================================

    groq_api_key = os.getenv("GROQ_API_KEY")

    if not groq_api_key:

        raise HTTPException(
            status_code=500,
            detail="GROQ_API_KEY is not configured",
        )


    print("\n========================================")
    print("🤖 FACTORYOS COPILOT")
    print("Question:", message)


    # =====================================================
    # FACTORY CONTEXT
    # =====================================================

    factory_context = ""

    factory_data_used = False


    if needs_factory_data(message):

        print("🏭 Factory question detected")

        # IMPORTANT:
        # Get LIVE telemetry + ML predictions.
        # DO NOT use historical CSV data here.

        factory_data = get_live_factory_summary()


        if factory_data:

            factory_context = json.dumps(
                factory_data,
                separators=(",", ":"),
                default=str,
            )

            # Safety limit
            factory_context = factory_context[:30000]

            factory_data_used = True

            print(
                "📊 Live machine records sent:",
                len(factory_data)
            )

        else:

            print(
                "⚠️ No live factory data available"
            )


    else:

        print(
            "💬 General question — factory data NOT sent"
        )


    # =====================================================
    # SYSTEM PROMPT
    # =====================================================

    if factory_data_used:

        system_prompt = f"""
You are FactoryOS Copilot.

You are an AI assistant inside a Manufacturing
Intelligence Platform.

You have access to LIVE simulated machine telemetry
and LIVE machine-learning predictions from the
FactoryOS Digital Twin.

The data below is the CURRENT state of the machines.

LIVE FACTORY DATA:

{factory_context}


=========================================================
IMPORTANT RULES
=========================================================

1. ALWAYS use the LIVE FACTORY DATA when answering
   questions about machines or factory health.

2. DO NOT use historical CSV values unless they are
   explicitly present in the LIVE FACTORY DATA.

3. NEVER mention fields such as "failure", "quality",
   or "remaining useful life" from the historical
   dataset unless they are actually present in the
   LIVE FACTORY DATA.

4. The following fields represent LIVE machine
   telemetry:

   temperature
   vibration
   spindle_speed
   power_consumption
   motor_current
   tool_wear
   feed_rate
   coolant_flow
   cycle_time
   humidity
   ambient_temperature
   air_pressure

5. The following fields represent LIVE ML predictions:

   predictive_maintenance.failure_prediction
   predictive_maintenance.failure_probability

   remaining_useful_life.remaining_useful_life

   anomaly_detection.anomaly
   anomaly_detection.anomaly_score

6. NEVER invent telemetry values.

7. NEVER assume that a machine is failed simply
   because a historical dataset may contain a
   "failure" column.

8. Use the LIVE ML prediction to determine failure risk.

9. If failure_prediction is 1, explain that the ML model
   predicts a high likelihood of failure.

10. If failure_prediction is 0, explain that the ML model
    currently predicts low failure risk.

11. If anomaly_detection.anomaly is true, mention that
    an anomaly has been detected.

12. If anomaly_detection.anomaly is false, mention that
    no anomaly is currently detected.

13. Use remaining useful life when discussing expected
    machine life.

14. When discussing machine health, consider multiple
    signals together:
    temperature, vibration, power consumption,
    motor current, tool wear, coolant flow,
    cycle time, failure probability, anomaly status,
    and remaining useful life.

15. Do not make up "normal ranges" unless those ranges
    are explicitly available in the supplied data.

16. Keep answers concise and practical.

17. Mention the machine ID.

18. If the user asks about a machine that is not present
    in the live factory data, clearly say that live data
    is unavailable for that machine.

19. Do not refer to yourself as a generic chatbot.
    You are FactoryOS Copilot.
"""


    else:

        system_prompt = """
You are FactoryOS Copilot.

You are an AI assistant for a Manufacturing
Intelligence Platform.

You can answer general questions and explain concepts
related to:

- manufacturing
- predictive maintenance
- machine health
- anomaly detection
- remaining useful life
- quality prediction
- factory operations
- machine learning

For casual messages such as "hi" or "hello",
respond naturally and briefly.

Do not claim to know live factory information
unless live factory telemetry has been provided.
"""


    # =====================================================
    # GROQ PAYLOAD
    # =====================================================

    payload = {

        "model": "llama-3.3-70b-versatile",

        "messages": [

            {
                "role": "system",
                "content": system_prompt,
            },

            {
                "role": "user",
                "content": message,
            },

        ],

        "temperature": 0.1,

        "max_tokens": 500,
    }


    # =====================================================
    # CALL GROQ
    # =====================================================

    print("🚀 Sending LIVE data to Groq...")


    try:

        response = requests.post(

            "https://api.groq.com/openai/v1/chat/completions",

            headers={

                "Authorization":
                    f"Bearer {groq_api_key}",

                "Content-Type":
                    "application/json",

            },

            json=payload,

            timeout=20,
        )


        print(
            "✅ Groq response:",
            response.status_code
        )


        if not response.ok:

            print(
                "❌ Groq error:",
                response.status_code,
                response.text
            )

            raise HTTPException(

                status_code=500,

                detail=
                    f"Groq API error: {response.text}",
            )


        result = response.json()


        answer = (
            result
            ["choices"]
            [0]
            ["message"]
            ["content"]
        )


        print("✅ Copilot answer generated")
        print("========================================\n")


        return {

            "answer": answer,

            "source": "groq",

            "factory_data_used":
                factory_data_used,

        }


    except requests.exceptions.Timeout:

        print(
            "❌ Groq request timed out"
        )

        raise HTTPException(

            status_code=504,

            detail="Groq request timed out",
        )


    except requests.exceptions.RequestException as e:

        print(
            "❌ Groq connection error:",
            e
        )

        raise HTTPException(

            status_code=500,

            detail=
                f"Groq connection error: {str(e)}",
        )


    except HTTPException:

        raise


    except Exception as e:

        print(
            "❌ Copilot error:",
            e
        )

        raise HTTPException(

            status_code=500,

            detail=
                f"Copilot error: {str(e)}",
        )