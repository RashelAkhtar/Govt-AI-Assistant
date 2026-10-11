import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserRole } from 'src/generated/prisma/enums';

import { AiService } from './ai.service';
import { ChatDto } from './types/chat.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('/api/v1/ai')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  @Roles(UserRole.Admin, UserRole.Employee)
  async chat(@Body() dto: ChatDto) {
    return this.aiService.askQuestion(dto.question);
  }
}
