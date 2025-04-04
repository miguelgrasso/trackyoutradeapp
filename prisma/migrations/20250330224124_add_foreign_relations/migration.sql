/*
  Warnings:

  - You are about to drop the column `operationType` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `result` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `statusOperation` on the `Trade` table. All the data in the column will be lost.
  - Added the required column `operationTypeId` to the `Trade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resultId` to the `Trade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusOperationId` to the `Trade` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trade" DROP COLUMN "operationType",
DROP COLUMN "result",
DROP COLUMN "statusOperation",
ADD COLUMN     "operationTypeId" INTEGER NOT NULL,
ADD COLUMN     "resultId" INTEGER NOT NULL,
ADD COLUMN     "statusOperationId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_operationTypeId_fkey" FOREIGN KEY ("operationTypeId") REFERENCES "OperationType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_statusOperationId_fkey" FOREIGN KEY ("statusOperationId") REFERENCES "StatusOperation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
