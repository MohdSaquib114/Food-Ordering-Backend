/*
  Warnings:

  - You are about to drop the `FormField` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FormSchema` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FormField" DROP CONSTRAINT "FormField_formSchemaId_fkey";

-- DropTable
DROP TABLE "FormField";

-- DropTable
DROP TABLE "FormSchema";

-- DropEnum
DROP TYPE "FieldType";
