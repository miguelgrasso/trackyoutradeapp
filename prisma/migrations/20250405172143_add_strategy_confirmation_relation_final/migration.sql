-- CreateTable
CREATE TABLE "strategy_confirmation" (
    "strategyId" INTEGER NOT NULL,
    "confirmationId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "strategy_confirmation_pkey" PRIMARY KEY ("strategyId","confirmationId")
);

-- AddForeignKey
ALTER TABLE "strategy_confirmation" ADD CONSTRAINT "strategy_confirmation_strategyId_fkey" FOREIGN KEY ("strategyId") REFERENCES "Strategy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "strategy_confirmation" ADD CONSTRAINT "strategy_confirmation_confirmationId_fkey" FOREIGN KEY ("confirmationId") REFERENCES "Confirmation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
