-- AlterTable
ALTER TABLE "Trade" ADD COLUMN     "strategyId" INTEGER;

-- CreateTable
CREATE TABLE "TradeDetail" (
    "id" SERIAL NOT NULL,
    "tradeId" INTEGER NOT NULL,
    "observaciones" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TradeDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TradeConfirmation" (
    "id" SERIAL NOT NULL,
    "tradeDetailId" INTEGER NOT NULL,
    "confirmationId" INTEGER NOT NULL,
    "conditionId" INTEGER NOT NULL,
    "notes" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TradeConfirmation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TradeDetail_tradeId_key" ON "TradeDetail"("tradeId");

-- CreateIndex
CREATE INDEX "TradeDetail_tradeId_idx" ON "TradeDetail"("tradeId");

-- CreateIndex
CREATE INDEX "TradeConfirmation_tradeDetailId_idx" ON "TradeConfirmation"("tradeDetailId");

-- CreateIndex
CREATE INDEX "TradeConfirmation_confirmationId_idx" ON "TradeConfirmation"("confirmationId");

-- CreateIndex
CREATE INDEX "TradeConfirmation_conditionId_idx" ON "TradeConfirmation"("conditionId");

-- CreateIndex
CREATE UNIQUE INDEX "TradeConfirmation_tradeDetailId_confirmationId_key" ON "TradeConfirmation"("tradeDetailId", "confirmationId");

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_strategyId_fkey" FOREIGN KEY ("strategyId") REFERENCES "Strategy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeDetail" ADD CONSTRAINT "TradeDetail_tradeId_fkey" FOREIGN KEY ("tradeId") REFERENCES "Trade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeConfirmation" ADD CONSTRAINT "TradeConfirmation_tradeDetailId_fkey" FOREIGN KEY ("tradeDetailId") REFERENCES "TradeDetail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeConfirmation" ADD CONSTRAINT "TradeConfirmation_confirmationId_fkey" FOREIGN KEY ("confirmationId") REFERENCES "Confirmation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeConfirmation" ADD CONSTRAINT "TradeConfirmation_conditionId_fkey" FOREIGN KEY ("conditionId") REFERENCES "Condition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
