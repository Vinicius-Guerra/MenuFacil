import { prisma } from "../../../database/prisma";
import { recipeCreateBodyMock } from "../../__mocks__/recipe.mocks";
import { request } from "../../utils/request";
import { simulateLogin } from "../../utils/simulateLogin";

describe("Integration test: get one recipe", () => {
    it("should be able to get one recipe by id", async () => {
        const { restaurant } = await simulateLogin();

        const recipeData = { ...recipeCreateBodyMock, restauranteId: restaurant.id };

        const recipe = await prisma.recipe.create({ data: recipeData });

        const data = await request
            .get(`/recipes/${recipe.id}`)
            .expect(200)
            .then(response => response.body);

        expect(data).toStrictEqual(recipe);
    });

    it("should throw error when recipe id is invalid", async () => {
        const data = await request
            .get("/recipes/81304fb1-7f94-414b-8cf5-f77bb25be901")
            .expect(404)
            .then(response => response.body);

        expect(data.message).toBe("Recipe not found");
    });
});