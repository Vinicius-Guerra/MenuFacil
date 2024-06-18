import { prisma } from "../../../database/prisma";
import { recipeCreateBodyMock, recipeWrongCreateBodyMock } from "../../__mocks__/recipe.mocks";
import { request } from "../../utils/request";
import { invalidToken, simulateLogin } from "../../utils/simulateLogin";

describe("Integration test: create recipe", () => {
    it("should be able to create a recipe successfully", async () => {
        const { restaurant, token } = await simulateLogin();

        const data = await request
            .post("/recipes")
            .set("Authorization", `Bearer ${token}`)
            .send(recipeCreateBodyMock)
            .expect(201)
            .then(response => response.body);

        expect(data.id).toBeDefined();
        expect(data.name).toBe(recipeCreateBodyMock.name);
        expect(data.price).toBe(recipeCreateBodyMock.price);
        expect(data.description).toBe(recipeCreateBodyMock.description);
        expect(data.restauranteId).toBe(restaurant.id);
        expect(data.categoryId).toBe(null);
    });

    it("should be able to create a recipe with category successfully", async () => {
        const { restaurant, token } = await simulateLogin();

        const categoryData = {
            name: "Example",
            restauranteId: restaurant.id
        };
        
        const category = await prisma.category.create({ data: categoryData })

        const createRecipeData = { 
            ...recipeCreateBodyMock,
            restauranteId: restaurant.id,
            categoryId: category.id
        };

        const data = await request
            .post("/recipes")
            .set("Authorization", `Bearer ${token}`)
            .send(createRecipeData)
            .expect(201)
            .then(response => response.body);

        expect(data.id).toBeDefined();
        expect(data.name).toBe(recipeCreateBodyMock.name);
        expect(data.price).toBe(recipeCreateBodyMock.price);
        expect(data.description).toBe(recipeCreateBodyMock.description);
        expect(data.restauranteId).toBe(restaurant.id);
        expect(data.categoryId).toBe(category.id);
    });

    it("should throw error when there is no token", async () => {
        await request
            .post("/recipes")
            .send(recipeCreateBodyMock)
            .expect(401)
    });

    it("should throw error when token is invalid", async () => {
        const token = invalidToken();
        await request
            .post("/recipes")
            .set("Authorization", `Bearer ${token}`)
            .send(recipeCreateBodyMock)
            .expect(401)
    });

    it("should throw error when missing body parameter", async () => {
        const data = await request
            .post("/recipes")
            .expect(409)
            .then(response => response.body); 

        expect(data.issues).toHaveLength(2);
        data.issues.forEach((issue: { message: string }) => {
            expect(issue.message).toBe("Required")
        });
    });

    it("should throw error when invalid data type in body parameter", async () => {
        const data = await request
            .post("/recipes")
            .send(recipeWrongCreateBodyMock)
            .expect(409)
            .then((response) => response.body);
        
        expect(data.issues).toHaveLength(4);

        expect(data.issues[0].message).toBe("Expected string, received number");
        expect(data.issues[1].message).toBe("Expected string, received number");
        expect(data.issues[2].message).toBe("Expected number, received string");
        expect(data.issues[3].message).toBe("Expected string, received number");
    });
});
