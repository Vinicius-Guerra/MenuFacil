-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_restauranteId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_restauranteId_fkey";

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_restauranteId_fkey" FOREIGN KEY ("restauranteId") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_restauranteId_fkey" FOREIGN KEY ("restauranteId") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
