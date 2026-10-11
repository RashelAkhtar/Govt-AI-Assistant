import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDocumentDto } from './types/CreateDocumentDto';
import { promises as fs } from 'fs';
import * as path from 'path';
import { randomUUID } from 'crypto';
import { AiService } from 'src/ai/ai.service';

@Injectable()
export class DocumentService {
  private readonly uploadDirectory = path.join(
    process.cwd(),
    'uploads',
    'documents',
  );

  constructor(
    private readonly prisma: PrismaService,
    private readonly aiService: AiService,
  ) {}

  async createDocument(
    createDocumentDto: CreateDocumentDto,
    file: Express.Multer.File,
  ) {
    await fs.mkdir(this.uploadDirectory, {
      recursive: true,
    });

    const fileName = `${randomUUID()}.pdf`;

    const filePath = path.join(this.uploadDirectory, fileName);

    await fs.writeFile(filePath, file.buffer);

    const fileUrl = `/uploads/documents/${fileName}`;

    const document = await this.prisma.document.create({
      data: {
        title: createDocumentDto.title,
        originalName: file.originalname,
        fileUrl,
        mimeType: file.mimetype,
        fileSize: file.size,
        status: 'PENDING',
      },
    });

    await this.prisma.document.update({
      where: { id: document.id },
      data: { status: 'PROCESSING' },
    });

    try {
      // Send the PDF to FastAPI for extraction, chunking and indexing.
      await this.aiService.ingestDocument({
        documentId: document.id,
        title: document.title,
        filename: document.originalName,
        mimeType: document.mimeType,
        buffer: file.buffer,
      });

      return await this.prisma.document.update({
        where: { id: document.id },
        data: {
          status: 'PROCESSED',
          processedAt: new Date(),
          errorMessage: null,
        },
      });
    } catch (error) {
      console.error(`Document ${document.id} processing failed:`, error);

      return await this.prisma.document.update({
        where: { id: document.id },
        data: {
          status: 'FAILED',
          errorMessage: 'FastAPI document processing failed',
        },
      });
    }
  }

  async findAllDocumnets() {
    return this.prisma.document.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOneDocument(id: string) {
    const document = this.prisma.document.findUnique({
      where: { id },
    });

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    return document;
  }
}
