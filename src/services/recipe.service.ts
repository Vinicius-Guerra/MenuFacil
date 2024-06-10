import { prisma } from "../database/prisma";
import { TRecipe, TRecipeCreateBody, TRecipeUpdateBody } from "../schemas/recipe.schema";

export class RecipeServices {
    async create(body: TRecipeCreateBody, restaurantId: string): Promise<TRecipe> {
        const newRecipeData = { ...body, restauranteId: restaurantId }
        
        const recipe = await prisma.recipe.create({ newRecipeData })

        return recipe;
    };

    async getOne(recipeId: string): Promise<TRecipe> {
        const recipe = await prisma.recipe.findFirst({ where: { id: recipeId }});

        return recipe;
    }

    async getMany(restaurantId: string, category: string): Promise<TRecipe[]> {
        const recipes = await prisma.recipe.findMany({ where: { restauranteId: restaurantId }});

        return recipes;
    };

    async update(body: TRecipeUpdateBody, recipeId: string): Promise<TRecipe> {
        const recipe = await prisma.recipe.update({ where: { id: recipeId }, data: body });

        return recipe;
    };

    async delete(recipeId: string): Promise<void> {
        await prisma.recipe.delete({where: { id: recipeId }});
    }
}