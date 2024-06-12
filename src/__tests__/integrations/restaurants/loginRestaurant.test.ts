import { prisma } from "../../../database/prisma"
import { restauranWrongLoginBodyMock, restaurantCreateDataMock, restaurantLoginBodyMock, restaurantWrongCreateBodyMock } from "../../__mocks__/restaurant.mocks"
import { request } from "../../utils/request";

describe("Integration test: login restaurant", () => {
    it("sould be able to login successfully", async () => {
        const restaurantData = await restaurantCreateDataMock();

        const user = await prisma.restaurant.create({ data: restaurantData });

        

        const data = await request
            .post("/restaurants/login")
            .send(restaurantLoginBodyMock)
            .expect(200)
            .then((response) => response.body);

        expect(data.accessToken).toBeDefined();
        expect(data.restaurant).toBeDefined();
        expect(data.restaurant.id).toBe(user.id);
        expect(data.restaurant.name).toBe(user.name);
        expect(data.restaurant.email).toBe(user.email);
        expect(data.restaurant.description).toBe(user.description);
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

        await request
            .post("/restaurants/login")
            .send(restaurantWrongCreateBodyMock)
            .expect(401);
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