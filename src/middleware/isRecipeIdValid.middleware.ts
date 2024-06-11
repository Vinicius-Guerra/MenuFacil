import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";

export class IsRecipeIdValid {
    static async execute(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;

        const recipe = await prisma.recipe.findFirst({ where: { id }});

        if(!recipe) {
            throw new AppError("Recipe not found", 404);
        };

        next();
    };
};