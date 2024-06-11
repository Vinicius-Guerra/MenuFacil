import z from "zod";

export const restaurantSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    description: z.string().optional(),
    email: z.string().min(1).email(),
    password: z.string().min(1),
});
export type TRestaurant = z.infer<typeof restaurantSchema>;

export const restaurantRegisterBodySchema = restaurantSchema.omit({ id: true });
export type TRestaurantRegisterBody = z.infer<typeof restaurantRegisterBodySchema>;

export const restaurantLoginBodySchema = restaurantSchema.pick({ email: true, password: true });
export type TRestaurantLoginBody = z.infer<typeof restaurantLoginBodySchema>;

export const restaurantUpdateBodySchema = restaurantSchema.pick({ description: true });
export type TRestaurantUpdateBody = z.infer<typeof restaurantUpdateBodySchema>;


export const restaurantReturnSchema = restaurantSchema.omit({ password: true });
export type TRestaurantReturn = z.infer<typeof restaurantReturnSchema>;

export type TRestaurantLoginReturn = {
    accessToken: string,
    restaurant: TRestaurantReturn
};

export const publicRestaurantReturnSchema = restaurantSchema.pick({ id: true, name: true, description: true });
export type TPublicRestaurant = z.infer<typeof publicRestaurantReturnSchema>;