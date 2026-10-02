import { UserRole } from 'src/generated/prisma/client';

export type CreateUserDto = {
  name?: string;
  email: string;
  password: string;
  role?: UserRole;
};
