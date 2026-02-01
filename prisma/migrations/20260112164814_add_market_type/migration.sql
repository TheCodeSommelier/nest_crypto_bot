/*
  Warnings:

  - Added the required column `market` to the `Trade` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TradeMarket" AS ENUM ('FUTURES', 'MARKET');

-- AlterTable
ALTER TABLE "Trade" ADD COLUMN     "market" "TradeMarket" NOT NULL;
