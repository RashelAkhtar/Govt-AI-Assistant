import {
  BadGatewayException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

interface IngestDocumentResponse {
  message: string;
  document_id: string;
  chunks_created: number;
  pages_processed: number;
}

export interface AiSource {
  document_id: string;
  title: string;
  filename: string;
  page: number;
}

export interface AiChatResponse {
  answer: string;
  sources: AiSource[];
}

@Injectable()
export class AiService {
  private readonly baseUrl = (
    process.env.AI_SERVICE_URL ?? 'http://localhost:8000'
  ).replace(/\/$/, '');

  private getApiKey(): string {
    const apiKey = process.env.AI_SERVICE_API_KEY;

    if (!apiKey) {
      throw new InternalServerErrorException(
        'AI service API key is not configured',
      );
    }

    return apiKey;
  }

  async ingestDocument(params: {
    documentId: string;
    title: string;
    filename: string;
    mimeType: string;
    buffer: Buffer;
  }): Promise<IngestDocumentResponse> {
    const formData = new FormData();

    formData.append('document_id', params.documentId);
    formData.append('title', params.title);

    formData.append(
      'file',
      new Blob([new Uint8Array(params.buffer)], {
        type: params.mimeType,
      }),
      params.filename,
    );

    try {
      const response = await fetch(`${this.baseUrl}/documents/ingest`, {
        method: 'POST',
        headers: {
          'X-Internal-API-Key': this.getApiKey(),
        },
        body: formData,
        signal: AbortSignal.timeout(120_000),
      });

      if (!response.ok) {
        const details = await response.text();

        throw new Error(
          `FastAPI ingestion failed (${response.status}): ${details}`,
        );
      }

      return (await response.json()) as IngestDocumentResponse;
    } catch (error) {
      console.error('AI document ingestion failed:', error);

      throw new BadGatewayException(
        'The AI service could not process the document',
      );
    }
  }

  async askQuestion(question: string): Promise<AiChatResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Internal-API-Key': this.getApiKey(),
        },
        body: JSON.stringify({ question }),
        signal: AbortSignal.timeout(120_000),
      });

      if (!response.ok) {
        const details = await response.text();

        throw new Error(`FastAPI chat failed (${response.status}): ${details}`);
      }

      return (await response.json()) as AiChatResponse;
    } catch (error) {
      console.error('AI chat request failed:', error);

      throw new BadGatewayException(
        'The AI service could not answer the question',
      );
    }
  }
}
