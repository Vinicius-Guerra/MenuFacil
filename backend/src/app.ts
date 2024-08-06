import "dotenv/config";
import "express-async-errors";
import "reflect-metadata";
import cors from "cors";
import express, { json } from "express";
import helmet from "helmet";
import { HandleErrors } from "./middleware/handleErrors";
import { restaurantRouter } from "./routes/restaurant.routes";
import { recipeRouter } from "./routes/recipe.routes";
import { categoryRouter } from "./routes/category.routes";

export const app = express();

//security
const corsOption = {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
};

app.use(cors(corsOption));
app.use(helmet());

app.use(json());

//routes
app.use("/restaurants", restaurantRouter);
app.use("/recipes", recipeRouter);
app.use("/categories", categoryRouter);

//errors
app.use(HandleErrors.execute);
