import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles # NEW IMPORT
from fastapi.responses import FileResponse # NEW IMPORT
from pydantic import BaseModel
from groq import Groq

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Groq(api_key=os.environ.get("GROQ_API_KEY")) # Securely get key from Render

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def get_conservation_advice(request: ChatRequest):
    # ... (Keep your existing chat logic here) ...
    try:
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "system",
                    "content": "You are a specialized Marine Biologist Agent for AquaLens AI. Keep answers extremely concise (max 2 sentences). Focus only on facts and solutions."
                },
                {"role": "user", "content": request.message}
            ]
        )
        return {"response": completion.choices[0].message.content}
    except Exception as e:
        return {"response": f"Error: {str(e)}"}

# --- NEW: Serve Frontend Static Files ---
# Mount the "frontend" directory to serve CSS/JS
app.mount("/static", StaticFiles(directory="frontend"), name="static")

# Serve index.html at the root URL
@app.get("/")
async def read_index():
    return FileResponse('frontend/index.html')