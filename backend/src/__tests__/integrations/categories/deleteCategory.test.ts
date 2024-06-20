import { prisma } from "../../../database/prisma";
import { restaurantCategoryCreateDataMock } from "../../__mocks__/categories.mock";
import { request } from "../../utils/request";
import { invalidToken, simulateLogin, wrongUserToken } from "../../utils/simulateLogin";

export const deleteCategoryBeforeEach = async () => {
    const { restaurant, token } = await simulateLogin();

    const categoryData = restaurantCategoryCreateDataMock(restaurant.id);

    const category = await prisma.category.create({ data: categoryData });

    return { restaurant, token, category };
};

describe("Integration test: delete category", () => {
    it("should be able to delete a category successfully", async () => {
        const { token, category } = await deleteCategoryBeforeEach();

        await request
            .delete(`/categories/${category.id}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(204);
    });

    it("should throw error when there is no token", async () => {
        const { category } = await deleteCategoryBeforeEach();

        await request.delete(`/categories/${category.id}`).expect(401);
    });

    it("should throw error when token is invalid", async () => {
        const { category } = await deleteCategoryBeforeEach();

        const token = invalidToken();

        await request
            .delete(`/categories/${category.id}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(401);
    });

    it("should throw error when category id is invalid", async () => {
        const { token } = await deleteCategoryBeforeEach();

        const data = await request
            .delete("/categories/2bf43bce-98c0-48db-82a5-69453aafdf3e")
            .set("Authorization", `Bearer ${token}`)
            .expect(404)
            .then((response) => response.body);

        expect(data.message).toBe("Category not found");
    });

    it("should throw error when restaurant is not the category owner", async () => {
        const { category } = await deleteCategoryBeforeEach();

        const token = wrongUserToken();

        const data = await request
            .delete(`/categories/${category.id}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(401)
            .then((response) => response.body);

        expect(data.message).toBe("Restaurant must be the owner of this category");
    });
});