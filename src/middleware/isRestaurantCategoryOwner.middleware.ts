import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";

export class IsRestaurantCategoryOwner {
    static async execute(req: Request, res: Response, next: NextFunction) {
        const restauranteId = res.locals.decode.id;

        const category = res.locals.category;

        if(category.restauranteId !== restauranteId) {
            throw new AppError("Restaurant must be the owner of this category", 401);
        };

        next();
    };
};