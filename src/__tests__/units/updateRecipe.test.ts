import { container } from "tsyringe";
import { RecipeServices } from "../../services/recipe.service";
import { prismaMock } from "../__mocks__/prisma";
import { updatedRecipeBodyMock, updatedRecipeMock } from "../__mocks__/recipe.mocks";

describe("Unit test: update recipe", ()=> {
    it("update recipe should work correctly", async () => {
        const recipeServices = container.resolve(RecipeServices);

        const updatedRecipeMockConfirmed: any = updatedRecipeMock;

        prismaMock.recipe.update.mockResolvedValue(updatedRecipeMockConfirmed);

        const data = await recipeServices.update(updatedRecipeBodyMock, updatedRecipeMock.id);

        expect(data).toStrictEqual(updatedRecipeMock);
    });
});