import z from "zod";

export const recipeSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    description: z.string().optional(),
    price: z.number().positive(),
    restauranteId: z.string().min(1),
    categoryId: z.string().optional().nullable(),
});

export type TRecipe = z.infer<typeof recipeSchema>;

export const recipeCreateBodySchema = recipeSchema.omit({ id: true, restauranteId: true });
export type TRecipeCreateBody = z.infer<typeof recipeCreateBodySchema>;

export const recipeUpdateBodySchema = recipeCreateBodySchema.partial();
export type TRecipeUpdateBody = z.infer<typeof recipeUpdateBodySchema>;
