import { prisma } from "../../../database/prisma"
import { restauranWrongLoginBodyMock, restaurantCreateDataMock, restaurantLoginBodyMock, restaurantWrongCreateBodyMock } from "../../__mocks__/restaurant.mocks"
import { request } from "../../utils/request";
import { restaurantDefaultExpects } from "../../utils/restaurantDefaultExpects";

describe("Integration test: login restaurant", () => {
    it("sould be able to login successfully", async () => {
        const restaurantData = await restaurantCreateDataMock();

        const restaurant: any = await prisma.restaurant.create({ data: restaurantData });

        const data = await request
            .post("/restaurants/login")
            .send(restaurantLoginBodyMock)
            .expect(200)
            .then((response) => response.body);

        expect(data.accessToken).toBeDefined();
        restaurantDefaultExpects(data.restaurant, restaurant)
        expect(data.restaurant.password).toBeUndefined();
    });

    it("sould throw error when user is registered", async () => {
        await request
            .post("/restaurants/login")
            .send(restaurantLoginBodyMock)
            .expect(403);
    });

    it("sould throw error when email and password doesn't match", async () => {
        const restaurantData = await restaurantCreateDataMock();

        await prisma.restaurant.create({ data: restaurantData });

        const response = await request
            .post("/restaurants/login")
            .send(restaurantWrongCreateBodyMock)
            .expect(409);
    });

    it("should throw error when missing body parameter", async () => {
    
        const data = await request
            .post("/restaurants/login")
            .expect(409)
            .then(response => response.body); 

        expect(data.issues).toHaveLength(2);
        data.issues.forEach((issue: { message: string }) => {
            expect(issue.message).toBe("Required")
        });
    });

    it("should throw error when invalid data type in body parameter", async () => {
    
        const data = await request
            .post("/restaurants/login")
            .send(restauranWrongLoginBodyMock)
            .expect(409)
            .then((response) => response.body);
        
        expect(data.issues).toHaveLength(1);

        data.issues.forEach((issue: { message: string }) => {
            expect(issue.message).toBe("Expected string, received number")
        });
    });
});