import { prisma } from "../../../database/prisma";
import { categoryUpdateBodyMock, categoryWrongUpdateBodyMock, restaurantCategoryCreateDataMock } from "../../__mocks__/categories.mock";
import { request } from "../../utils/request";
import { invalidToken, simulateLogin, wrongUserToken } from "../../utils/simulateLogin";

export const updateCategoryBeforeEach = async () => {
    const { restaurant, token } = await simulateLogin();

    const categoryData = restaurantCategoryCreateDataMock(restaurant.id);

    const category = await prisma.category.create({ data: categoryData });

    return { restaurant, token, category };
};

describe("Integration test: update category", () => {
    it("should be able to update a category successfully", async () => {
        const { restaurant, token, category } = await updateCategoryBeforeEach();

        const data = await request
            .patch(`/categories/${category.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send(categoryUpdateBodyMock)
            .then((response) => response.body);

        expect(data.id).toBe(category.id);
        expect(data.name).toBe(categoryUpdateBodyMock.name);
        expect(data.restauranteId).toBe(restaurant.id);
    });

    it("should throw error when there is no token", async () => {
        const { category } = await updateCategoryBeforeEach();

        await request
            .patch(`/categories/${category.id}`)
            .send(categoryUpdateBodyMock)
            .expect(401);
    });

    it("should throw error when token is invalid", async () => {
        const { category } = await updateCategoryBeforeEach();

        const token = invalidToken();

        await request
            .patch(`/categories/${category.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send(categoryUpdateBodyMock)
            .expect(401);
    });

    it("should throw error when invalid data type in body parameter", async () => {
        const { category, token } = await updateCategoryBeforeEach();

        const data = await request
            .patch(`/categories/${category.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send(categoryWrongUpdateBodyMock)
            .expect(409)
            .then((response) => response.body);

        expect(data.issues).toHaveLength(1);
        expect(data.issues[0].message).toBe("Expected string, received number");
    });

    it("should throw error when category id is invalid", async () => {
        const { token } = await updateCategoryBeforeEach();

        const data = await request
            .patch("/categories/2bf43bce-98c0-48db-82a5-69453aafdf3e")
            .set("Authorization", `Bearer ${token}`)
            .send(categoryUpdateBodyMock)
            .expect(404)
            .then((response) => response.body);

        expect(data.message).toBe("Category not found");
    });

    it("should throw error when restaurant is not the category owner", async () => {
        const { category } = await updateCategoryBeforeEach();

        const token = wrongUserToken();

        const data = await request
            .patch(`/categories/${category.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send(categoryUpdateBodyMock)
            .expect(401)
            .then((response) => response.body);

        expect(data.message).toBe("Restaurant must be the owner of this category");
    });
});