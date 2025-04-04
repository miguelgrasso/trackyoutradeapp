-- CreateTable
CREATE TABLE "Trade" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "operationType" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "dateEntry" TIMESTAMP(3) NOT NULL,
    "priceEntry" DOUBLE PRECISION NOT NULL,
    "priceExit" DOUBLE PRECISION NOT NULL,
    "spread" DOUBLE PRECISION NOT NULL,
    "result" TEXT NOT NULL,
    "statusOperation" TEXT NOT NULL,

    CONSTRAINT "Trade_pkey" PRIMARY KEY ("id")
);
