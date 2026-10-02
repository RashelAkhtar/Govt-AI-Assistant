import { UserRole } from 'src/generated/prisma/enums';

export type LoginUserDto = {
  email: string;
  password: string;
  role?: UserRole;
};
