import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";

export class IsRestaurantRecipeOwner {
    static async execute(req: Request, res: Response, next: NextFunction) {
        const restauranteId = res.locals.decode.id;

        const recipe = res.locals.recipe;

        if(recipe.restauranteId !== restauranteId) {
            throw new AppError("Restaurant must be the owner of this recipe", 401);
        };

        next();
    };
};