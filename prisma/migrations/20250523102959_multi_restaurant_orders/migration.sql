/*
  Warnings:

  - You are about to drop the column `restaurantId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `restaurantId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_restaurantId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "restaurantId";

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "restaurantId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
