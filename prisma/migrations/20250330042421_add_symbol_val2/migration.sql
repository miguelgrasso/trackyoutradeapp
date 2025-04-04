/*
  Warnings:

  - You are about to drop the column `value` on the `Symbol` table. All the data in the column will be lost.
  - Added the required column `codeSymbol` to the `Symbol` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Symbol" DROP COLUMN "value",
ADD COLUMN     "codeSymbol" TEXT NOT NULL;
