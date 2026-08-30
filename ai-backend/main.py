from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


app = FastAPI(title="Shopzy AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1)


@app.get("/")
def read_root():
    return {"status": "ok", "service": "Shopzy AI backend"}


@app.post("/chat")
def chat(payload: ChatRequest):
    if payload.message.strip().lower() == "hello":
        reply = "Hello! I am the Shopzy AI assistant. How can I help you?"
    else:
        reply = "Hello! I am the Shopzy AI assistant. How can I help you?"

    return {"response": reply}
