import z from "zod";

export const categorySchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    restauranteId: z.string().min(1),
});

export type TCategory = z.infer<typeof categorySchema>;

export const categoryCreateBodySchema = categorySchema.pick({ name: true });
export type TCaegoryCreateBody = z.infer<typeof categoryCreateBodySchema>;

export const categoryUpdateBodySchema = categoryCreateBodySchema.partial();
export type TCaegoryUpdateBody = z.infer<typeof categoryUpdateBodySchema>;