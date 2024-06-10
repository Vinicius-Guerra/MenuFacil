import z from "zod";

export const restaurantSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    description: z.string().optional(),
    email: z.string().min(1).email(),
    password: z.string().min(1),
});

export type TRestaurant = z.infer<typeof restaurantSchema>;
