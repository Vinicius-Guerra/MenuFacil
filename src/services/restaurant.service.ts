import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";
import { TPublicRestaurant, TRestaurantLoginBody, TRestaurantLoginReturn, TRestaurantRegisterBody, TRestaurantReturn, TRestaurantUpdateBody, publicRestaurantReturnSchema, restaurantReturnSchema } from "../schemas/restaurant.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class RestaurantService {
    async register(body: TRestaurantRegisterBody): Promise<TRestaurantReturn> {
        const existingRestaurant = await prisma.restaurant.findFirst({ where: { email: body.email }});

        if(existingRestaurant) {
            throw new AppError("This email is already registered", 403);
        }

        const hashPassword = await bcrypt.hash(body.password, 10);
        
        const newRestaurantData = {
            ...body,
            password: hashPassword
        };

        const restaurant = await prisma.restaurant.create({ data: newRestaurantData });

        return restaurantReturnSchema.parse(restaurant);
    };

    async login(body: TRestaurantLoginBody): Promise<TRestaurantLoginReturn> {
        const restaurant = await prisma.restaurant.findFirst({ where: { email: body.email }});

        if(!restaurant) {
            throw new AppError("Restaurant not registered", 403);
        };

        const comparePassword = await bcrypt.compare(body.password, restaurant.password);

        if(!comparePassword) {
            throw new AppError("Email and password doesn't match", 401);
        };
        
        const token = jwt.sign({ id: restaurant.id }, process.env.JWT_SECRET as string);

        return {
            accessToken: token,
            restaurant: restaurantReturnSchema.parse(restaurant),
        };
    };

    async update(body: TRestaurantUpdateBody, restaurantId: string): Promise<TRestaurantReturn> {
        const restaurant = await prisma.restaurant.update({ where: { id: restaurantId }, data: body });

        return restaurantReturnSchema.parse(restaurant);
    };

    async getRestaurant(restaurantId: string): Promise<TRestaurantReturn> {
        const restaurant = await prisma.restaurant.findFirst({ where: { id: restaurantId }});

        return restaurantReturnSchema.parse(restaurant);
    };

    async getManyRestaurants(): Promise<TPublicRestaurant[]> {
        const restaurants = await prisma.restaurant.findMany();

        const publicRestaurants = restaurants.map((restaurant) => 
            publicRestaurantReturnSchema.parse(restaurant)
        )

        return publicRestaurants;
    };
};