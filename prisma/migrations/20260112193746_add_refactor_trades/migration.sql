/*
  Warnings:

  - You are about to drop the `Trade` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TradeStatus" AS ENUM ('PARSED', 'INVALID', 'DISPATCHED');

-- CreateEnum
CREATE TYPE "ExecutionStatus" AS ENUM ('PENDING', 'SKIPPED', 'PLACED', 'FAILED');

-- DropForeignKey
ALTER TABLE "Trade" DROP CONSTRAINT "Trade_emailId_fkey";

-- DropForeignKey
ALTER TABLE "Trade" DROP CONSTRAINT "Trade_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "Trade";

-- CreateTable
CREATE TABLE "TradeSignal" (
    "id" TEXT NOT NULL,
    "status" "TradeStatus" NOT NULL DEFAULT 'PARSED',
    "symbol" TEXT NOT NULL,
    "base" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "action" "TradeAction" NOT NULL,
    "market" "TradeMarket" NOT NULL,
    "entry" DECIMAL(65,30),
    "stopLoss" DECIMAL(65,30),
    "target" DECIMAL(65,30),
    "entryPortfolioPct" INTEGER,
    "averagePortfolioPct" INTEGER,
    "emailId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TradeSignal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSignalExecution" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tradeSignalId" TEXT NOT NULL,
    "status" "ExecutionStatus" NOT NULL DEFAULT 'PENDING',
    "reason" TEXT,
    "orderId" TEXT,
    "rawResult" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSignalExecution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TradeSignal_emailId_key" ON "TradeSignal"("emailId");

-- CreateIndex
CREATE INDEX "UserSignalExecution_tradeSignalId_status_idx" ON "UserSignalExecution"("tradeSignalId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "UserSignalExecution_userId_tradeSignalId_key" ON "UserSignalExecution"("userId", "tradeSignalId");

-- AddForeignKey
ALTER TABLE "TradeSignal" ADD CONSTRAINT "TradeSignal_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "Email"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSignalExecution" ADD CONSTRAINT "UserSignalExecution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSignalExecution" ADD CONSTRAINT "UserSignalExecution_tradeSignalId_fkey" FOREIGN KEY ("tradeSignalId") REFERENCES "TradeSignal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
