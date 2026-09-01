import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
from pydantic import BaseModel, Field

load_dotenv()
app = FastAPI(title="Shopzy AI Backend")
MODEL_NAME = "openai/gpt-oss-20b"
SYSTEM_PROMPT = """
You are the Shopzy AI shopping assistant.

Be friendly, concise, and helpful.
Help users describe what they are looking for and ask useful follow-up questions when needed.

Important boundaries:
- Do not claim to have live access to Shopzy products, categories, prices, stock, discounts, shipping, delivery estimates, orders, returns, support policies, or account data.
- Do not invent Shopzy-specific product listings, brands, categories, prices, availability, delivery times, order status, or policy details.
- If the user asks for Shopzy live data, clearly say that live Shopzy product and order lookup is not connected yet.
- You may still help the user refine what they want, suggest what details to look for, or explain how live lookup will help once connected.
- Distinguish clearly between general knowledge and live Shopzy data.
- If the user asks a general knowledge, writing, or programming question, answer it normally.

Examples:
- If asked "What products do you sell?", do not invent a catalog. Explain that you can help the user discover products on Shopzy, but live catalog access is not connected yet.
- If asked "Show me Nike shoes", do not claim to see Shopzy inventory. Ask what style, budget, or use case they want, and explain that live product results will come once product lookup is connected.
- If asked "Where is my order?", do not invent status details. Explain that live order tracking is not connected yet.
""".strip()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1)


def get_groq_client():
    api_key = os.getenv("GROQ_API_KEY")

    if not api_key:
        return None

    return Groq(api_key=api_key)


@app.get("/")
def read_root():
    return {"status": "ok", "service": "Shopzy AI backend"}


@app.post("/chat")
def chat(payload: ChatRequest):
    client = get_groq_client()

    if client is None:
        return {
            "response": "The AI service is not configured yet. Please set the Groq API key in the backend environment and try again."
        }

    try:
        completion = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {
                    "role": "system",
                    "content": SYSTEM_PROMPT
                },
                {
                    "role": "user",
                    "content": payload.message.strip()
                }
            ],
        )
        reply = completion.choices[0].message.content or "Sorry, I could not generate a response right now."
        return {"response": reply}
    except Exception as error:
        print(f"Groq error [{type(error).__name__}]: {error}")

    return {
        "response": "Sorry, the AI service is temporarily unavailable right now. Please try again in a moment."
    }
