/*
  Warnings:

  - Added the required column `discount` to the `SaleItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `SaleItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SaleItem" ADD COLUMN     "discount" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "price" DECIMAL(10,2) NOT NULL;
