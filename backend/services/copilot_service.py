import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise RuntimeError("GROQ_API_KEY is not configured")

client = Groq(api_key=GROQ_API_KEY)


SYSTEM_PROMPT = """
You are FactoryOS Manufacturing Copilot.

You are an AI assistant for a smart manufacturing intelligence platform.

You help users understand:

- Machine health
- CNC machines
- Predictive maintenance
- Failure probability
- Remaining useful life
- Anomaly detection
- Production output
- Overall equipment effectiveness
- Factory operations
- Manufacturing performance
- Machine maintenance

Answer clearly and professionally.

Keep answers concise but useful.

If the user asks something unrelated to manufacturing,
politely explain that you are specialized in manufacturing
operations and FactoryOS.

Do not invent real-time factory data that has not been provided.
"""


def ask_copilot(question: str):

    if not os.getenv("GROQ_API_KEY"):
        raise RuntimeError(
            "GROQ_API_KEY is not configured"
        )

    response = client.chat.completions.create(

        model="llama-3.3-70b-versatile",

        messages=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT
            },
            {
                "role": "user",
                "content": question
            }
        ],

        temperature=0.3,

        max_tokens=500
    )

    return response.choices[0].message.content