import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDocumentDto } from './types/CreateDocumentDto';
import { promises as fs } from 'fs';
import * as path from 'path';
import { randomUUID } from 'crypto';

@Injectable()
export class DocumentService {
  private readonly uploadDirectory = path.join(
    process.cwd(),
    'uploads',
    'documents',
  );

  constructor(private readonly prisma: PrismaService) {}

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
        fileUrl,
        mimeType: file.mimetype,
        fileSize: file.size,
        status: 'PENDING',
      },
    });

    return document;
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
