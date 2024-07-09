import { inject, injectable } from "tsyringe";
import { RecipeServices } from "../services/recipe.service";
import { Request, Response } from "express";
import { TRecipe } from "../schemas/recipe.schema";

@injectable()
export class RecipeControllers {
    constructor(@inject("RecipeServices") private recipeServices: RecipeServices) {}

    async create(req: Request, res: Response): Promise<Response<TRecipe>> {
        const { id } = res.locals.decode;
        console.log("Iniciando criação de receita com ID de restaurante:", id);

        try {
            const response = await this.recipeServices.create(req.body, id);
            return res.status(201).json(response);
        } catch (error: any) {
            console.error("Erro ao criar receita:", error.message);
            if (error.message === "Receita já existe.") {
                return res.status(409).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro ao criar receita." });
        }
    };
    async getOne(req: Request, res: Response): Promise<Response<TRecipe>> {
        const id = req.params.id;
        const response = await this.recipeServices.getOne(id);

        return res.status(200).json(response);
    };

    async getMany(req: Request, res: Response): Promise<Response<TRecipe[]>> {
        const restauranteId = req.params.restauranteId;
        const categoryId = req.query.categoryId;
        const response = await this.recipeServices.getMany(restauranteId, categoryId ? String(categoryId) : categoryId);

        return res.status(200).json(response);
    };

    async update(req: Request, res: Response): Promise<Response<TRecipe>> {
        const id = req.params.id;
        const response = await this.recipeServices.update(req.body ,id);

        return res.status(200).json(response);
    };

    async delete(req: Request, res: Response): Promise<Response<void>> {
        const id = req.params.id;
        await this.recipeServices.delete(id);

        return res.status(204).json();
    };
};
