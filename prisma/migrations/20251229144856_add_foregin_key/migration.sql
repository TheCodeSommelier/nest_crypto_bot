/*
  Warnings:

  - A unique constraint covering the columns `[messageId]` on the table `Email` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `messageId` to the `Email` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `Email` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Email` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailId` to the `Trade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Trade` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Email" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "messageId" TEXT NOT NULL,
ADD COLUMN     "subject" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "textBody" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Trade" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "emailId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Email_messageId_key" ON "Email"("messageId");

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "Email"("id") ON DELETE CASCADE ON UPDATE CASCADE;
