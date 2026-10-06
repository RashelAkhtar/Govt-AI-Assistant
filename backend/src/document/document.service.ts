import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDocumentDto } from './types/CreateDocumentDto';

@Injectable()
export class DocumentService {
  constructor(private readonly prisma: PrismaService) {}

  async createDocument(
    createDocumentDto: CreateDocumentDto,
    file: Express.Multer.File,
  ) {
    const document = await this.prisma.document.create({
      data: {
        title: createDocumentDto.title,
        fileUrl: '',
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
    return this.prisma.document.findUnique({
      where: { id },
    });
  }
}
