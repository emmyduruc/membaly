/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Membership` table. All the data in the column will be lost.
  - You are about to drop the `Tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CategoryTags" DROP CONSTRAINT "CategoryTags_tagId_fkey";

-- DropForeignKey
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_categoryId_fkey";

-- AlterTable
ALTER TABLE "Membership" DROP COLUMN "categoryId";

-- DropTable
DROP TABLE "Tags";

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MembershipCategoryTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MembershipCategoryTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "_MembershipCategoryTags_B_index" ON "_MembershipCategoryTags"("B");

-- AddForeignKey
ALTER TABLE "CategoryTags" ADD CONSTRAINT "CategoryTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MembershipCategoryTags" ADD CONSTRAINT "_MembershipCategoryTags_A_fkey" FOREIGN KEY ("A") REFERENCES "CategoryTags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MembershipCategoryTags" ADD CONSTRAINT "_MembershipCategoryTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Membership"("id") ON DELETE CASCADE ON UPDATE CASCADE;
