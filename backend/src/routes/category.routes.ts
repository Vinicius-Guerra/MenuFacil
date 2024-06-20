import { Router } from "express";
import { container } from "tsyringe";
import { CategoryServices } from "../services/category.service";
import { CategoryControllers } from "../controllers/category.controller";
import { VerifyToken } from "../middleware/verifyToken.middleware";
import { ValidateBody } from "../middleware/validateBody.middleware";
import { categoryCreateBodySchema, categoryUpdateBodySchema } from "../schemas/category.schema";
import { IsRestaurantIdValid } from "../middleware/isRestaurantIdValid.middleware";
import { IsCategoryIdValid } from "../middleware/isCategoryIdValid.middleware";
import { IsRestaurantCategoryOwner } from "../middleware/isRestaurantCategoryOwner.middleware";

export const categoryRouter = Router();

container.registerSingleton("CategoryServices", CategoryServices);
const categoryControllers = container.resolve(CategoryControllers);

categoryRouter.post("/", ValidateBody.execute(categoryCreateBodySchema), VerifyToken.execute,(req, res) => categoryControllers.create(req, res));

categoryRouter.get("/:restauranteId", IsRestaurantIdValid.execute, (req, res) => categoryControllers.getMany(req, res));

categoryRouter.patch("/:id", VerifyToken.execute, ValidateBody.execute(categoryUpdateBodySchema), IsCategoryIdValid.execute, IsRestaurantCategoryOwner.execute,(req, res) => categoryControllers.update(req, res));

categoryRouter.delete("/:id", VerifyToken.execute, IsCategoryIdValid.execute, IsRestaurantCategoryOwner.execute,(req, res) => categoryControllers.delete(req, res));
