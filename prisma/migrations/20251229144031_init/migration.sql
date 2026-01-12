-- CreateEnum
CREATE TYPE "TradeAction" AS ENUM ('BUY', 'SELL', 'SHORT', 'LONG', 'COVER');

-- CreateTable
CREATE TABLE "Email" (
    "id" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "textBody" TEXT NOT NULL,
    "htmlBody" TEXT,

    CONSTRAINT "Email_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trade" (
    "id" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "action" "TradeAction" NOT NULL,
    "entry" DOUBLE PRECISION NOT NULL,
    "stopLoss" DOUBLE PRECISION NOT NULL,
    "target" DOUBLE PRECISION NOT NULL,
    "executed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Trade_pkey" PRIMARY KEY ("id")
);
