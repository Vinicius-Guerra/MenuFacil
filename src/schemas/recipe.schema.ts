import z from "zod";

export const recipeSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    description: z.string().optional(),
    price: z.number().positive(),
    restauranteId: z.string().min(1),
    categoryId: z.string().optional()
});

export type TRecipe = z.infer<typeof recipeSchema>;
