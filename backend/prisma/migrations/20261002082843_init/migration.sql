-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Admin', 'Employee');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'Employee';
