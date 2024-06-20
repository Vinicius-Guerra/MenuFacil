import { container } from "tsyringe"
import { RecipeServices } from "../../../services/recipe.service"
import { prismaMock } from "../../__mocks__/prisma";
import { recipeCreateBodyMock, recipeMock } from "../../__mocks__/recipe.mocks";
import { restaurant } from "../../__mocks__/restaurant.mocks";

describe("Unit: create recipe", () => {
    it("create recipe should work correctly", async () => {
        const recipeServices = container.resolve(RecipeServices);

        const recipeMockConfirmed: any = recipeMock;


        prismaMock.recipe.create.mockResolvedValue(recipeMockConfirmed);

        const data = await recipeServices.create(recipeCreateBodyMock,restaurant.id);

        expect(data).toStrictEqual(recipeMock);
    });
});