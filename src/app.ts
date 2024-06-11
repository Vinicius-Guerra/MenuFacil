import "express-async-errors";
import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import express, { json } from "express";
import helmet from "helmet";
import { HandleErrors } from "./middleware/handleErrors";
import { restaurantRouter } from "./routes/restaurant.routes";
import { recipeRouter } from "./routes/recipe.routes";

export const app = express();

//security
app.use(cors())
app.use(helmet());

app.use(json());

//routes
app.use("/restaurants", restaurantRouter);
app.use("/recipes", recipeRouter);

//errors
app.use(HandleErrors.execute);
