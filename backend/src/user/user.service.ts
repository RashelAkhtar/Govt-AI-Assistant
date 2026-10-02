import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const SALT_ROUNDS: number = 10;
    const password = data?.password;
    const hashPassword: string = await bcrypt.hash(password, SALT_ROUNDS);

    const user = this.prisma.user.create({
      data: {
        ...data,
        password: hashPassword,
      },
    });

    return user;
  }
}
