/*
  Warnings:

  - You are about to drop the column `tags` on the `Membership` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Membership" DROP COLUMN "tags";

-- CreateTable
CREATE TABLE "Tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryTags" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "CategoryTags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tags_name_key" ON "Tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryTags_categoryId_tagId_key" ON "CategoryTags"("categoryId", "tagId");

-- AddForeignKey
ALTER TABLE "CategoryTags" ADD CONSTRAINT "CategoryTags_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryTags" ADD CONSTRAINT "CategoryTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
