import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { AiModule } from 'src/ai/ai.module';

@Module({
  imports: [PrismaModule, AuthModule, AiModule],
  providers: [DocumentService],
  controllers: [DocumentController],
})
export class DocumentModule {}
