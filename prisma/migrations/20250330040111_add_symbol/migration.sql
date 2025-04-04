-- CreateTable
CREATE TABLE "Symbol" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Symbol_pkey" PRIMARY KEY ("id")
);
