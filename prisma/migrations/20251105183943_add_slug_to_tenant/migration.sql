/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `UserMaster` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserMaster" ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "UserMaster_slug_key" ON "UserMaster"("slug");
