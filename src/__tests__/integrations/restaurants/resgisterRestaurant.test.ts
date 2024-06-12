import { prisma } from "../../../database/prisma";
import { restaurantCreateBodyMock, restaurantWrongCreateBodyMock } from "../../__mocks__/restaurant.mocks";
import { request } from "../../utils/request";

describe("Integration test: register restaurant", () => {
    it("sould be able to registar a restaurant successfully", async () => {
        const data = await request
            .post("/restaurants")
            .send(restaurantCreateBodyMock)
            .expect(201)
            .then((response) => response.body
        );

        expect(data.id).toBeDefined();
        expect(data.name).toBe(restaurantCreateBodyMock.name);
        expect(data.email).toBe(restaurantCreateBodyMock.email);
        expect(data.password).toBeUndefined();
    });

    it("should throw error when email is already registered", async () => {
        await prisma.restaurant.create({ data: restaurantCreateBodyMock });

        await request
            .post("/restaurants")
            .send(restaurantCreateBodyMock)
            .expect(403); 
    });

    it("should throw error when missing body parameter", async () => {
    
        const data = await request
            .post("/restaurants")
            .expect(409)
            .then(response => response.body); 

        expect(data.issues).toHaveLength(3);
        data.issues.forEach((issue: { message: string }) => {
            expect(issue.message).toBe("Required")
        });
    });

    it("should throw error when invalid data type in body parameter", async () => {
    
        const data = await request
            .post("/restaurants")
            .send(restaurantWrongCreateBodyMock)
            .expect(409)
            .then((response) => response.body);
        
        expect(data.issues).toHaveLength(4);

        data.issues.forEach((issue: { message: string }) => {
            expect(issue.message).toBe("Expected string, received number")
        });
    });
});