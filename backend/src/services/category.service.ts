import { injectable } from "tsyringe";
import { TCaegoryCreateBody, TCaegoryUpdateBody, TCategory } from "../schemas/category.schema";
import { prisma } from "../database/prisma";

@injectable()
export class CategoryServices {
    async create(body: TCaegoryCreateBody, restauranteId: string): Promise<TCategory> {
        const newCategoryData = { ...body, restauranteId };

        const category = await prisma.category.create({ data: newCategoryData });

        return category;
    };

    async getMany(restauranteId: string): Promise<TCategory[]> {
        const categories = await prisma.category.findMany({ where: { restauranteId }});

        return categories;
    }
    
    async update(body: TCaegoryUpdateBody, categoryId: string): Promise<TCategory> {
        const category = await prisma.category.update({ where: { id: categoryId }, data: body });

        return category;
    }

    async delete(categoryId: string): Promise<void> {
        await prisma.category.delete({ where: { id: categoryId }});
    }
}