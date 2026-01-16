/*
  Warnings:

  - You are about to drop the `UserSignalExecution` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserSignalExecution" DROP CONSTRAINT "UserSignalExecution_tradeSignalId_fkey";

-- DropForeignKey
ALTER TABLE "UserSignalExecution" DROP CONSTRAINT "UserSignalExecution_userId_fkey";

-- AlterTable
ALTER TABLE "TradeSignal" ADD COLUMN     "average" DECIMAL(65,30);

-- DropTable
DROP TABLE "UserSignalExecution";

-- CreateTable
CREATE TABLE "TradeSignalExchangeExtension" (
    "id" TEXT NOT NULL,
    "order" TEXT NOT NULL,
    "close" TEXT,
    "txid" TEXT NOT NULL,
    "tradeSignalId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TradeSignalExchangeExtension_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TradeSignalExchangeExtension_tradeSignalId_key" ON "TradeSignalExchangeExtension"("tradeSignalId");

-- AddForeignKey
ALTER TABLE "TradeSignalExchangeExtension" ADD CONSTRAINT "TradeSignalExchangeExtension_tradeSignalId_fkey" FOREIGN KEY ("tradeSignalId") REFERENCES "TradeSignal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
