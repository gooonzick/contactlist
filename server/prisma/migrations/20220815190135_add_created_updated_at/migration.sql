/*
  Warnings:

  - Added the required column `createdAt` to the `Contacts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Contacts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contacts" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
