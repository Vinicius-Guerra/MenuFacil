import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import { TRecipe, TRecipeCreateBody, TRecipeUpdateBody, recipeCreateBodySchema } from "../schemas/recipe.schema";

@injectable()
export class RecipeServices {
    async create(body: TRecipeCreateBody, restauranteId: string): Promise<TRecipe> {
        console.log("Recebido para criar receita:", body, restauranteId);

        const validatedBody = recipeCreateBodySchema.parse(body);

        const existingRecipe = await prisma.recipe.findFirst({
            where: {
                name: validatedBody.name,
                restauranteId: restauranteId,
            }
        });

        if (existingRecipe) {
            console.log("Receita duplicada encontrada:", existingRecipe);
            throw new Error("Receita já existe.");
        }

        const newRecipeData: any = { ...validatedBody, restauranteId }
        
        const recipe = await prisma.recipe.create({ data: newRecipeData })

        console.log("Receita criada com sucesso:", recipe);

        return recipe;
    };


    async getOne(recipeId: string){
        const recipe = await prisma.recipe.findFirst({ where: { id: recipeId }});

        return recipe;
    }

    async getMany(restauranteId: string, categoryId?: string): Promise<TRecipe[]> {
        const recipes = await prisma.recipe.findMany({ where: { restauranteId, categoryId }});

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