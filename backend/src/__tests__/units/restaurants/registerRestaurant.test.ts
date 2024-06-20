import { container } from "tsyringe";
import { RestaurantServices } from "../../../services/restaurant.service";
import { restaurantCreateBodyMock, restaurantMock, restaurantReturnMock } from "../../__mocks__/restaurant.mocks";
import { prismaMock } from "../../__mocks__/prisma";

describe("Unit test: register restaurant", () => {
    it("register restaurant should work correctly", async () => {
        const restaurantServices = container.resolve(RestaurantServices);

        prismaMock.restaurant.create.mockResolvedValue(await restaurantMock());

        const data = await restaurantServices.register(restaurantCreateBodyMock);

        expect(data).toStrictEqual(restaurantReturnMock);
    });

    it("register restaurant should throw error when email is already registered", async () => {
        const restaurantServices = container.resolve(RestaurantServices);

        prismaMock.restaurant.findFirst.mockResolvedValue(await restaurantMock());

        const register = async () => await restaurantServices.register(restaurantCreateBodyMock);

        expect(register()).rejects.toThrow("This email is already registered");
    });
});