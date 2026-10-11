import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

# Securing the ai service
AI_SERVICE_API_KEY = os.getenv("AI_SERVICE_API_KEY")

if not AI_SERVICE_API_KEY:
    raise RuntimeError("AI_SERVICE_API_KEY is missing from .env")

BASE_DIR = Path(__file__).resolve().parent.parent

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_MODEL = os.getenv("GROQ_MODEL", "openai/gpt-oss-20b")

CHROMA_PATH = os.getenv(
    "CHROMA_PATH",
    str(BASE_DIR / "chroma_db"),
)

EMBEDDING_MODEL = os.getenv(
    "EMBEDDING_MODEL",
    "sentence-transformers/all-MiniLM-L6-v2",
)

if not GROQ_API_KEY:
    raise RuntimeError("GROQ_API_KEY is missing from .env")