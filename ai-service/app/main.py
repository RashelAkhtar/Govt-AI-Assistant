from contextlib import asynccontextmanager

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from pydantic import BaseModel, Field

from app.rag_service import rag_service

import secrets

from fastapi import Depends, Header, HTTPException

from app.config import AI_SERVICE_API_KEY


def verify_internal_api_key(
    x_internal_api_key: str = Header(..., alias="X-Internal-API-Key"),
):
    if not secrets.compare_digest(
        x_internal_api_key,
        AI_SERVICE_API_KEY,
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid internal API key",
        )


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize the embedding model and vector database
    # when the application starts.
    yield


app = FastAPI(
    title="Government AI Assistant",
    description="Document retrieval and question-answering service",
    version="0.1.0",
    lifespan=lifespan,
)


class ChatRequest(BaseModel):
    question: str = Field(min_length=3, max_length=2000)


@app.get("/health")
def health_check():
    return {"status": "ok", "service": "government-ai-service"}


@app.post("/documents/ingest", dependencies=[Depends(verify_internal_api_key)])
async def ingest_document(
    document_id: str = Form(...),
    title: str = Form(...),
    file: UploadFile = File(...),
):
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are supported",
        )

    try:
        contents = await file.read()

        if not contents:
            raise HTTPException(
                status_code=400,
                detail="The uploaded file is empty",
            )

        result = rag_service.ingest_pdf(
            document_id=document_id,
            title=title,
            filename=file.filename,
            file_bytes=contents,
        )

        return {
            "message": "Document indexed successfully",
            **result,
        }

    except HTTPException:
        raise
    except ValueError as error:
        raise HTTPException(
            status_code=422,
            detail=str(error),
        ) from error
    except Exception as error:
        # Log the actual error server-side in production.
        raise HTTPException(
            status_code=500,
            detail="Document processing failed",
        ) from error
    finally:
        await file.close()


@app.post("/chat", dependencies=[Depends(verify_internal_api_key)])
def chat(request: ChatRequest):
    try:
        return rag_service.answer_question(request.question)
    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail="Failed to generate an answer",
        ) from error