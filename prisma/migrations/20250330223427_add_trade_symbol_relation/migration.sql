/*
  Warnings:

  - You are about to drop the column `symbol` on the `Trade` table. All the data in the column will be lost.
  - Added the required column `symbolId` to the `Trade` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trade" DROP COLUMN "symbol",
ADD COLUMN     "symbolId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_symbolId_fkey" FOREIGN KEY ("symbolId") REFERENCES "Symbol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
