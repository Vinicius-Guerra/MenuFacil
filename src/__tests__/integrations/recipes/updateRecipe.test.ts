import { prisma } from "../../../database/prisma";
import { recipeWrongUpdateBodyMock, restaurantRecipeCreateDataMock, updatedRecipeDataMock } from "../../__mocks__/recipe.mocks";
import { request } from "../../utils/request";
import { invalidToken, simulateLogin, wrongUserToken } from "../../utils/simulateLogin";

export const updateRecipeBeforeEach = async () => {
    const { restaurant, token } = await simulateLogin();

    const recipeData = restaurantRecipeCreateDataMock(restaurant.id);

    const recipe = await prisma.recipe.create({ data: recipeData });

    const updatedRecipeData = updatedRecipeDataMock(null);

    return { restaurant, token, recipe, updatedRecipeData };
}

describe("Integration test: create recipe", () => {
    it("should be able to update a recipe successfully", async () =>{
        const { restaurant, token, recipe, updatedRecipeData } = await updateRecipeBeforeEach();

        const data = await request
            .patch(`/recipes/${recipe.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send(updatedRecipeData)
            .expect(200)
            .then(response => response.body)

        expect(data.id).toBe(recipe.id);
        expect(data.name).toBe(updatedRecipeData.name);
        expect(data.price).toBe(updatedRecipeData.price);
        expect(data.description).toBe(updatedRecipeData.description);
        expect(data.categoryId).toBe(updatedRecipeData.categoryId);
        expect(data.restauranteId).toBe(restaurant.id);
    });

    it("should throw error when there is no token", async () => {
        const {  recipe, updatedRecipeData } = await updateRecipeBeforeEach();

        await request
            .patch(`/recipes/${recipe.id}`)
            .send(updatedRecipeData)
            .expect(401)
    });

    it("should throw error when token is invalid", async () => {
        const {  recipe, updatedRecipeData } = await updateRecipeBeforeEach();

        const token = invalidToken();
        
        await request
            .patch(`/recipes/${recipe.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send(updatedRecipeData)
            .expect(401)
    });

    it("should throw error when invalid data type in body parameter", async () => {
        const { token, recipe } = await updateRecipeBeforeEach();
        
        const data = await request
            .patch(`/recipes/${recipe.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send(recipeWrongUpdateBodyMock)
            .expect(409)
            .then((response) => response.body);
        
        expect(data.issues).toHaveLength(4);

        expect(data.issues[0].message).toBe("Expected string, received number");
        expect(data.issues[1].message).toBe("Expected string, received number");
        expect(data.issues[2].message).toBe("Expected number, received string");
        expect(data.issues[3].message).toBe("Expected string, received number");
    });

    it("should throw error when recipe id is invalid", async () => {
        const { token, updatedRecipeData } = await updateRecipeBeforeEach();

        const data = await request
            .patch("/recipes/81304fb1-7f94-414b-8cf5-f77bb25be901")
            .set("Authorization", `Bearer ${token}`)
            .send(updatedRecipeData)
            .expect(404)
            .then((response) => response.body);

        expect(data.message).toBe("Recipe not found");
    });

    it("should throw error when restaurant is not the recipe owner", async () => {
        const { recipe, updatedRecipeData } = await updateRecipeBeforeEach();

        const token = wrongUserToken();

        const data = await request
            .patch(`/recipes/${recipe.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send(updatedRecipeData)
            .expect(401)
            .then((response) => response.body);

        expect(data.message).toBe("Restaurant must be the owner of this recipe");
    });
});