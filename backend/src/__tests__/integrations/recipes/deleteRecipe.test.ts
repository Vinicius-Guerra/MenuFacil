import { prisma } from "../../../database/prisma";
import { restaurantRecipeCreateDataMock } from "../../__mocks__/recipe.mocks";
import { request } from "../../utils/request";
import { invalidToken, simulateLogin, wrongUserToken } from "../../utils/simulateLogin";

export const deleteRecipeBeforeEach = async () => {
   const { restaurant, token } = await simulateLogin();

   const recipeData = restaurantRecipeCreateDataMock(restaurant.id);

   const recipe = await prisma.recipe.create({ data: recipeData });

   return { restaurant, token, recipe };
};

describe("Integration test: delete recipe", () => {
   it("should be able to delete a recipe successfully", async () => {
      const { token, recipe } = await deleteRecipeBeforeEach();

      await request
         .delete(`/recipes/${recipe.id}`)
         .set("Authorization", `Bearer ${token}`)
         .expect(204);
   });

   it("should throw error when there is no token", async () => {
      const { recipe } = await deleteRecipeBeforeEach();

      await request.delete(`/recipes/${recipe.id}`).expect(401);
   });

   it("should throw error when token is invalid", async () => {
      const { recipe } = await deleteRecipeBeforeEach();

      const token = invalidToken();

      await request
         .delete(`/recipes/${recipe.id}`)
         .set("Authorization", `Bearer ${token}`)
         .expect(401);
   });

   it("should throw error when recipe id is invalid", async () => {
      const { token } = await deleteRecipeBeforeEach();

      const data = await request
         .delete("/recipes/2bf43bce-98c0-48db-82a5-69453aafdf3e")
         .set("Authorization", `Bearer ${token}`)
         .expect(404)
         .then((response) => response.body);

      expect(data.message).toBe("Recipe not found");
   });

   it("should throw error when restaurant is not the recipe owner", async () => {
      const { recipe } = await deleteRecipeBeforeEach();

      const token = wrongUserToken();

      const data = await request
         .delete(`/recipes/${recipe.id}`)
         .set("Authorization", `Bearer ${token}`)
         .expect(401)
         .then((response) => response.body);

      expect(data.message).toBe("Restaurant must be the owner of this recipe");
   });
});