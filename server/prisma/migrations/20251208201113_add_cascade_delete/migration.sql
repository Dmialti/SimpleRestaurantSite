-- DropForeignKey
ALTER TABLE "Paragraph" DROP CONSTRAINT "Paragraph_articleId_fkey";

-- AlterTable
ALTER TABLE "Dish" ADD COLUMN     "available" BOOLEAN NOT NULL DEFAULT true;

-- AddForeignKey
ALTER TABLE "Paragraph" ADD CONSTRAINT "Paragraph_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;
