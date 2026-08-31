import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
from pydantic import BaseModel, Field

load_dotenv()
app = FastAPI(title="Shopzy AI Backend")
MODEL_NAME = "openai/gpt-oss-20b"

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
                    "content": "You are the Shopzy AI assistant. Give concise, helpful responses for an e-commerce chatbot."
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
