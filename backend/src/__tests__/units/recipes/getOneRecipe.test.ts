import { container } from "tsyringe";
import { RecipeServices } from "../../../services/recipe.service";
import { recipeMock } from "../../__mocks__/recipe.mocks";
import { prismaMock } from "../../__mocks__/prisma";

describe("Unit test: get one recipe", () => {
    it("get one recipe should work correctly", async () => {
        const recipeServices = container.resolve(RecipeServices);

        const recipeMockConfirmed: any = recipeMock;

        prismaMock.recipe.findFirst.mockResolvedValue(recipeMockConfirmed);

        const data = await recipeServices.getOne(recipeMockConfirmed.id);

        expect(data).toStrictEqual(recipeMock);
    });
});