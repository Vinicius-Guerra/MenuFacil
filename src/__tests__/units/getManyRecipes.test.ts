import { container } from "tsyringe"
import { RecipeServices } from "../../services/recipe.service"
import { prismaMock } from "../__mocks__/prisma";
import { recipeListMock, secondRecipeMock } from "../__mocks__/recipe.mocks";

describe("Unit test: get many recipes", () => {
    it("get many recipes should word correctly",async () => {
        const recipeServices = container.resolve(RecipeServices);

        const recipeListMockConfirmed: any = recipeListMock;

        prismaMock.recipe.findMany.mockResolvedValue(recipeListMockConfirmed);

        const data = await recipeServices.getMany(recipeListMock[0].restaurantId);

        expect(data).toHaveLength(recipeListMock.length);
        expect(data[0]).toStrictEqual(recipeListMock[0]);
        expect(data[1]).toStrictEqual(recipeListMock[1]);
    });

    it("get many recipes should filter a category correctly", async () => {
        const recipeServices = container.resolve(RecipeServices);

        const secondRecipeListMockConfirmed: any = secondRecipeMock;

        prismaMock.recipe.findMany.mockResolvedValue([secondRecipeListMockConfirmed]);

        const data = await recipeServices.getMany(secondRecipeListMockConfirmed.restaurantId, secondRecipeListMockConfirmed.categoryId);

        expect(data).toHaveLength(1);
        expect(data[0]).toStrictEqual(secondRecipeMock);
    });
});
