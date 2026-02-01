/*
  Warnings:

  - The values [MARKET] on the enum `TradeMarket` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TradeMarket_new" AS ENUM ('FUTURES', 'SPOT');
ALTER TABLE "TradeSignal" ALTER COLUMN "market" TYPE "TradeMarket_new" USING ("market"::text::"TradeMarket_new");
ALTER TYPE "TradeMarket" RENAME TO "TradeMarket_old";
ALTER TYPE "TradeMarket_new" RENAME TO "TradeMarket";
DROP TYPE "public"."TradeMarket_old";
COMMIT;
