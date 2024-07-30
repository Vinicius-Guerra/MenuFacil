import { Router } from "express";
import { container } from "tsyringe";
import { RecipeServices } from "../services/recipe.service";
import { RecipeControllers } from "../controllers/recipe.controller";
import { ValidateBody } from "../middleware/validateBody.middleware";
import { recipeCreateBodySchema, recipeUpdateBodySchema } from "../schemas/recipe.schema";
import { VerifyToken } from "../middleware/verifyToken.middleware";
import { IsRestaurantIdValid } from "../middleware/isRestaurantIdValid.middleware";
import { IsRecipeIdValid } from "../middleware/isRecipeIdValid.middleware";
import { IsRestaurantRecipeOwner } from "../middleware/isRestaurantRecipeOwner.middleware";

export const recipeRouter = Router();

container.registerSingleton("RecipeServices", RecipeServices);
const recipeControllers = container.resolve(RecipeControllers);

recipeRouter.post("/", ValidateBody.execute(recipeCreateBodySchema), VerifyToken.execute, (req, res) => {
    recipeControllers.create(req, res);
});

recipeRouter.get("/:id", IsRecipeIdValid.execute,(req, res) => recipeControllers.getOne(req, res));

recipeRouter.get("/restaurante/:restauranteId", IsRestaurantIdValid.execute, (req, res) => recipeControllers.getMany(req, res));

recipeRouter.patch("/restaurante/:restauranteId/:id", ValidateBody.execute(recipeUpdateBodySchema), VerifyToken.execute, IsRecipeIdValid.execute, IsRestaurantRecipeOwner.execute, (req, res) => recipeControllers.update(req, res));

recipeRouter.delete("/restaurante/:restauranteId/:id", VerifyToken.execute, IsRecipeIdValid.execute, IsRestaurantRecipeOwner.execute,(req, res) => recipeControllers.delete(req, res));
