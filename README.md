# Government AI Assistant

A role-based Government AI Assistant that helps authorised personnel search government documents and ask procedural questions using Retrieval-Augmented Generation (RAG).

> **Status:** The core document-upload and employee question-answering flow has been implemented. Validate security, retrieval quality, and deployment configuration before using real or sensitive government information.

## Features

- Admin and Employee roles.
- Authentication and backend role-based authorization with NestJS.
- PDF upload through the backend.
- Cloudinary storage for uploaded PDFs.
- PostgreSQL document/user metadata managed with Prisma.
- PDF text extraction and chunking.
- Sentence Transformers embeddings.
- ChromaDB vector retrieval.
- Groq API for retrieval-grounded answers.
- Source metadata returned with answers.
- Separate frontend, backend, and AI service.
- Docker Compose configuration.

OCR for scanned PDFs, document-level retrieval permissions, approval/versioning workflows, and production-grade audit logging should be considered incomplete unless implemented and tested in the current codebase.

## Architecture

```text
Admin / Employee
       |
       v
Next.js Frontend (:3000)
       |
       v
NestJS API (:4000)
  |        |          |
  |        |          +---- FastAPI AI Service (:8000)
  |        |                         |
  |        |                         +-- pypdf extraction
  |        |                         +-- Sentence Transformers
  |        |                         +-- ChromaDB
  |        |                         +-- Groq API
  |        |
  |        +---- PostgreSQL (Prisma)
  |
  +---- Cloudinary (PDF storage)
```

---

Component Purpose

---

`frontend` Next.js web UI and role-specific dashboards

`backend` NestJS authentication, authorization, document metadata, uploads, and AI orchestration

`ai-service` FastAPI ingestion, embeddings, retrieval, and answer generation

PostgreSQL User and document metadata

ChromaDB Persistent vector index

Cloudinary Uploaded PDF storage

## Groq API Language-model inference

Inside Compose, the backend should reach FastAPI at `http://ai-service:8000`. Browser-side frontend requests must use a browser-reachable URL such as `http://localhost:4000/api/v1` during local development; the browser cannot resolve the Compose hostname `backend`.

## Technology Stack

- **Frontend:** Next.js, React, TypeScript, Ant Design and RTK Query where used.
- **Backend:** NestJS, TypeScript, Prisma, PostgreSQL, JWT authentication and role guards.
- **AI service:** Python, FastAPI, ChromaDB, Sentence Transformers (`all-MiniLM-L6-v2`), `pypdf`, Groq's OpenAI-compatible API.
- **Infrastructure:** Docker, Docker Compose, GitHub Actions where configured.

The current AI configuration has used `openai/gpt-oss-20b` as the Groq model, a chunk size around 1,000 characters, and 150 characters of overlap. Confirm these values against the current source/configuration before changing them.

## Request Flows

### Document upload

1. An Admin signs in and uploads a PDF.
2. The frontend sends the file to the NestJS API.
3. The backend checks the user's permissions.
4. The PDF is stored in Cloudinary and document metadata is saved in PostgreSQL.
5. The backend forwards the PDF content to FastAPI for ingestion.
6. FastAPI extracts text, creates overlapping chunks, generates embeddings, and stores vectors/metadata in ChromaDB.

### Question answering

1. An Employee submits a question through the frontend.
2. The request goes to NestJS, which authenticates the user and forwards the question to FastAPI.
3. FastAPI retrieves relevant chunks from ChromaDB.
4. The retrieved context is sent to the configured Groq model.
5. The response and available source information are returned to the frontend.

## Repository Structure

```text
Govt AI Chatbot/
├── frontend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env.local
│   └── ...                 # Next.js application
├── backend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env
│   ├── prisma/
│   ├── src/
│   └── ...                 # NestJS application
├── ai-service/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env
│   ├── app/
│   ├── requirements.txt
│   └── chroma_db/          # Local vector data; Compose uses a named volume
├── .github/workflows/
└── docker-compose.yml
```

## Prerequisites

For the Docker setup:

- Docker Engine and Docker Compose v2 (`docker compose`).
- Valid environment files for each service.
- A configured PostgreSQL database.
- Cloudinary credentials.
- A Groq API key.

For local development, install compatible Node.js/npm and Python versions. Python 3.12 is a reasonable baseline for the AI-service container.

## Environment Variables

Keep secrets in service-specific environment files:

```text
frontend/.env.local
backend/.env
ai-service/.env
```

Never commit real `.env` files or credentials. Commit placeholder `.env.example` files instead.

### `frontend/.env.local`

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

Use the URL format expected by the frontend code. `NEXT_PUBLIC_*`variables are exposed to browser-side code and may be embedded during the Next.js build; never put secrets in them.

### `backend/.env`

The current Compose setup references variables in this family; ensure names match the backend code:

```dotenv
DATABASE_URL=
PORT=

ADMIN_NAME=
ADMIN_EMAIL=
ADMIN_PASSWORD=

JWT_SECRET=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

AI_SERVICE_URL=
AI_SERVICE_API_KEY=
```

For Cloudinary, check whether the application expects `CLOUDINARY_NAME`or `CLOUDINARY_CLOUD_NAME` and use the same name consistently.

### `ai-service/.env`

```dotenv
GROQ_API_KEY=
GROQ_MODEL=openai/gpt-oss-20b
AI_SERVICE_API_KEY=
EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2
CHROMA_PATH=/app/chroma_db
```

Use the exact variable names and supported defaults in the current AI-service code. Set `RAG_MIN_SIMILARITY` only after checking the retrieval implementation.

**Compose note:** `env_file` loads variables into a container; it does not provide values for `${VARIABLE}` interpolation in `docker-compose.yml`. Interpolation reads from the shell environment and project-level `.env`. If you keep separate service env files, avoid duplicating their variables as `${VARIABLE}` mappings unless you intentionally provide them to Compose another way.

## Run with Docker Compose

Run these commands from the repository root.

### 1. Check Dockerfile names

Docker expects the exact filename `Dockerfile` in each build context:

```text
frontend/Dockerfile
backend/Dockerfile
ai-service/Dockerfile
```

Linux is case-sensitive: `DockerFile` and `Dockerfile` are different names.

### 2. Validate and build

```bash
docker compose config -q
docker compose build
```

### 3. Start the application

```bash
docker compose up -d
docker compose ps
```

### 4. Inspect logs

```bash
docker compose logs --tail=100
docker compose logs -f frontend
docker compose logs -f backend
docker compose logs -f ai-service
```

### 5. Stop the services

```bash
docker compose down
```

The named `chroma_data` volume preserves ChromaDB data across container recreation. `docker compose down -v` also removes named volumes and can delete persisted vector data; use it only when you intend to reset the index.

### Local URLs

- Frontend: `http://localhost:3000`
- NestJS API: `http://localhost:4000`
- FastAPI service: `http://localhost:8000` (for local diagnostics, if applicable)

Normal application traffic should go through NestJS so authentication and authorization checks are applied.

## Run Locally Without Docker

Run each service in its own terminal.

### Frontend

```bash
cd frontend
npm ci
npm run dev
```

### Backend

```bash
cd backend
npm ci
npx prisma generate
npm run start:dev
```

Ensure PostgreSQL is reachable and `DATABASE_URL` is configured. Prisma generation must follow the generator provider and output path defined in this repository.

### AI service

```bash
cd ai-service
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

If the application entry point is `app/main.py` and exports an ASGI variable named `app`, start it with:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Adjust the command if the actual module or ASGI variable has a different name.

## RAG Pipeline

1. **Extract:** read text from PDFs using `pypdf`.
2. **Chunk:** split text into overlapping passages.
3. **Embed:** encode passages using the configured Sentence Transformers model.
4. **Index:** store vectors and metadata in the `government_documents`ChromaDB collection.
5. **Retrieve:** find relevant chunks for a user's question.
6. **Generate:** send retrieved context to the configured Groq model.
7. **Return sources:** provide available source metadata for the frontend.

Citations improve traceability, but they do not guarantee that every generated claim is supported. Evaluate answers against the source passages and test questions for which the knowledge base contains no answer.

## API Integration Notes

- API routes are versioned under `/api/v1` where configured.
- The login route has been implemented as `POST /api/v1/auth/login`.
- The backend coordinates chat requests to the AI service.
- The AI chat request schema has used a `question` field, not `prompt`. Ensure NestJS sends the shape expected by FastAPI; a mismatch can produce `422 Unprocessable Entity`.
- Within Compose, the backend-to-AI URL should be `http://ai-service:8000`, not `localhost:8000`.

See the current controllers, DTOs, and Pydantic models for the complete endpoint list and request/response schemas. This README does not invent unverified routes.

## Testing and CI

Use the scripts defined in each service's `package.json` and test configuration. For example, the backend may provide:

```bash
cd backend
npm test
npm run test:e2e
```

Check the available scripts before running them. Also run frontend lint/build checks and the AI service's configured test suite where present.

For CI, ensure workflows install dependencies, generate Prisma Client before backend compilation, and reference the actual AI-service module paths.

## Security and Limitations

- **Secrets:** never commit API keys, database credentials, JWT secrets, or real environment files.
- **Backend authorization:** enforce role checks in NestJS, not only through frontend redirects or hidden controls.
- **AI service key:** setting `AI_SERVICE_API_KEY` does not secure FastAPI unless the service validates it and NestJS sends it using the expected header.
- **Network exposure:** avoid exposing FastAPI publicly unless needed; prefer private service networking in production.
- **Document permissions:** a shared vector collection without document-level filtering may expose documents across authorization boundaries.
- **External inference:** retrieved document text sent to Groq leaves the application environment. Review provider terms and organisational policies before using confidential or personal information.
- **Scanned PDFs:** `pypdf` does not perform OCR; image-only PDFs require a separate OCR pipeline.
- **Answer quality:** a source list alone does not prove correctness or entailment.
- **Production readiness:** verify file validation, size limits, rate limiting, error handling, audit logging, monitoring, backups, and security tests before using real data.

## Future Improvements

- Unit, integration, and end-to-end tests across all services.
- Document approval, publication, versioning, and deletion workflows.
- Document-level access control and retrieval filtering.
- Page-level citations and source evidence snippets.
- OCR for scanned documents.
- Evaluation datasets for retrieval relevance, citation accuracy, and answer faithfulness.
- Audit logs for uploads and assistant queries.
- Health checks, monitoring, backups, and deployment automation.
- Explicit refusal when retrieved evidence is insufficient.

## Contributing

1. Create a branch for your change.
2. Make a focused change and add or update tests.
3. Run the relevant lint, test, and build checks.
4. Open a pull request describing the change and validation performed.

## License

No license is specified here. Add a license file and update this section if the project will be distributed or reused publicly.