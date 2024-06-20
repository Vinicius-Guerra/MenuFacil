import { container } from "tsyringe";
import { RecipeServices } from "../../../services/recipe.service";
import { recipeMock } from "../../__mocks__/recipe.mocks";

describe("Unit test: delete recipe", () => {
    it("delete recipe should work correctly", async () => {
        const recipeServices = container.resolve(RecipeServices);

        await recipeServices.delete(recipeMock.id);
    });
});