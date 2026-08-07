import os
import json
import requests

from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from services.telemetry_service import DATA

load_dotenv()

router = APIRouter()


# =========================================================
# REQUEST MODEL
# =========================================================

class CopilotRequest(BaseModel):
    message: str


# =========================================================
# FACTORY DATA
# =========================================================

def get_factory_summary():
    """
    Returns ONLY the latest reading for each machine.

    We deliberately do NOT send the complete historical
    dataset to Groq because that can exceed the model's
    token-per-minute limit.
    """

    try:
        df = DATA.copy()

        if df.empty:
            return []

        # Latest row for every machine
        if "machine_id" in df.columns:
            latest = (
                df
                .groupby("machine_id", as_index=False)
                .tail(1)
            )
        else:
            latest = df.tail(20)

        # Keep only useful columns that actually exist
        useful_columns = [
            "machine_id",
            "temperature",
            "vibration",
            "pressure",
            "rpm",
            "power_consumption",
            "power",
            "failure",
            "failure_risk",
            "maintenance_required",
            "maintenance",
            "anomaly",
            "anomaly_score",
            "quality_score",
            "quality",
            "remaining_useful_life",
            "rul",
        ]

        available_columns = [
            column
            for column in useful_columns
            if column in latest.columns
        ]

        # Always include machine_id
        if "machine_id" in latest.columns and "machine_id" not in available_columns:
            available_columns.insert(0, "machine_id")

        if available_columns:
            latest = latest[available_columns]

        records = latest.to_dict(orient="records")

        return records

    except Exception as e:
        print("❌ Factory data error:", e)
        return []


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

    # -----------------------------------------------------
    # API KEY
    # -----------------------------------------------------

    groq_api_key = os.getenv("GROQ_API_KEY")

    if not groq_api_key:
        raise HTTPException(
            status_code=500,
            detail="GROQ_API_KEY is not configured",
        )

    print("\n========================================")
    print("🤖 FACTORYOS COPILOT")
    print("Question:", message)

    # -----------------------------------------------------
    # FACTORY CONTEXT
    # -----------------------------------------------------

    factory_context = ""
    factory_data_used = False

    if needs_factory_data(message):

        print("🏭 Factory question detected")

        factory_data = get_factory_summary()

        if factory_data:

            factory_context = json.dumps(
                factory_data,
                separators=(",", ":"),
                default=str,
            )

            # Hard safety limit.
            # This prevents accidentally sending a huge
            # request to Groq.
            factory_context = factory_context[:25000]

            factory_data_used = True

            print(
                "📊 Factory records sent:",
                len(factory_data)
            )

        else:
            print("⚠️ No factory data available")

    else:

        print("💬 General question — factory data NOT sent")

    # -----------------------------------------------------
    # SYSTEM PROMPT
    # -----------------------------------------------------

    if factory_data_used:

        system_prompt = f"""
You are FactoryOS Copilot.

You are an AI assistant for a Manufacturing Intelligence
Platform.

You have access to the latest available machine telemetry.

Use the factory data below when answering questions about
machines, maintenance, machine health, anomalies, failure
risk, production, quality, temperature, vibration, pressure,
RPM, or equipment.

FACTORY TELEMETRY:

{factory_context}

IMPORTANT RULES:

1. Use the provided factory telemetry for factory-related
   questions.

2. Never invent machine readings.

3. If the requested information is not present in the
   telemetry, say that the available telemetry does not
   contain that information.

4. Mention specific machine IDs when useful.

5. Give concise, practical answers.

6. You are FactoryOS Copilot, not a generic chatbot.
"""

    else:

        system_prompt = """
You are FactoryOS Copilot.

You are an AI assistant for a Manufacturing Intelligence
Platform.

You can answer general questions and explain concepts
related to manufacturing, predictive maintenance,
machine health, anomaly detection, quality prediction,
and factory operations.

For casual messages such as "hi" or "hello", respond
naturally and briefly.

Do not claim to know live factory information unless
factory telemetry has been provided to you.
"""

    # -----------------------------------------------------
    # GROQ PAYLOAD
    # -----------------------------------------------------

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

        "temperature": 0.2,

        # Keep responses small enough for our use case.
        "max_tokens": 500,
    }

    # -----------------------------------------------------
    # CALL GROQ
    # -----------------------------------------------------

    print("🚀 Sending request to Groq...")

    try:

        response = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",

            headers={
                "Authorization": f"Bearer {groq_api_key}",
                "Content-Type": "application/json",
            },

            json=payload,

            # Don't let the UI spin forever.
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
                detail=f"Groq API error: {response.text}",
            )

        result = response.json()

        answer = (
            result["choices"][0]["message"]["content"]
        )

        print("✅ Copilot answer generated")
        print("========================================\n")

        return {
            "answer": answer,
            "source": "groq",
            "factory_data_used": factory_data_used,
        }

    except requests.exceptions.Timeout:

        print("❌ Groq request timed out")

        raise HTTPException(
            status_code=504,
            detail="Groq request timed out",
        )

    except requests.exceptions.RequestException as e:

        print("❌ Groq connection error:", e)

        raise HTTPException(
            status_code=500,
            detail=f"Groq connection error: {str(e)}",
        )

    except HTTPException:
        raise

    except Exception as e:

        print("❌ Copilot error:", e)

        raise HTTPException(
            status_code=500,
            detail=f"Copilot error: {str(e)}",
        )