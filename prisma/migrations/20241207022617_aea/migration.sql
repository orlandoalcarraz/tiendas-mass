/*
  Warnings:

  - Added the required column `totalPayment` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "totalPayment" DECIMAL(10,2) NOT NULL;
