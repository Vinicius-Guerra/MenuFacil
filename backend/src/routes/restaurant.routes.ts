import { Router } from "express";
import { container } from "tsyringe";
import { RestaurantServices } from "../services/restaurant.service";
import { RestaurantControllers } from "../controllers/restaurant.controller";
import { ValidateBody } from "../middleware/validateBody.middleware";
import { restaurantLoginBodySchema, restaurantRegisterBodySchema } from "../schemas/restaurant.schema";
import { VerifyToken } from "../middleware/verifyToken.middleware";

export const restaurantRouter = Router();

container.registerSingleton("RestaurantServices", RestaurantServices);
const restaurantControllers = container.resolve(RestaurantControllers);

restaurantRouter.post("/", ValidateBody.execute(restaurantRegisterBodySchema), (req, res) => restaurantControllers.register(req,res));

restaurantRouter.post("/login", ValidateBody.execute(restaurantLoginBodySchema), (req, res) => restaurantControllers.login(req,res))

restaurantRouter.get("/profile", VerifyToken.execute, (req, res) => restaurantControllers.getRestaurant(req,res));

restaurantRouter.get("/:id", (req, res) => restaurantControllers.getRestaurantPublic(req,res));

restaurantRouter.patch("/profile/:id", VerifyToken.execute, (req, res) => restaurantControllers.update(req, res));

restaurantRouter.get("/", (req, res) => restaurantControllers.getManyRestaurants(req, res));
