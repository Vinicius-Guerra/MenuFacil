import { prisma } from "../../../database/prisma";
import { TCategory } from "../../../schemas/category.schema";
import { restaurantCategoryCreateDataMock } from "../../__mocks__/categories.mock";
import { request } from "../../utils/request";
import { simulateLogin } from "../../utils/simulateLogin";

describe("Integration test: get restaurant categories", () => {
    it("should be able to get restaurant categories", async () => {
        const { restaurant } = await simulateLogin();

        const categoryData = restaurantCategoryCreateDataMock(restaurant.id);

        const categoryListData = [categoryData, categoryData];

        await prisma.category.createMany({ data: categoryListData });

        const data = await request
            .get(`/categories/${restaurant.id}`)
            .expect(200)
            .then((response) => response.body);

        expect(data).toHaveLength(categoryListData.length);

        data.forEach((category: TCategory) => {
            expect(category.id).toBeDefined();
            expect(category.name).toBe(categoryData.name);
            expect(category.restauranteId).toBe(restaurant.id);
        });
    });

    it("should throw error when restaurant id is invalid", async () => {
        const data = await request
            .get("/categories/2bf43bce-98c0-48db-82a5-69453aafdf3e")
            .expect(404)
            .then((response) => response.body);
        expect(data.message).toBe("Restaurant not found");
    });
});