import { container } from "tsyringe";
import { RestaurantServices } from "../../../services/restaurant.service";
import { restaurantLoginBodyMock, restaurantLoginWrongPasswordBodyMock, restaurantMock, restaurantReturnMock } from "../../__mocks__/restaurant.mocks";
import { prismaMock } from "../../__mocks__/prisma";


describe("Unit test: login restaurant", () => {
    it("login restaurant should work correctly", async () => {
        const restaurantServices = container.resolve(RestaurantServices);

        const restaurantMockValue = await restaurantMock();

        prismaMock.restaurant.findFirst.mockResolvedValue(restaurantMockValue);

        const data = await restaurantServices.login(restaurantLoginBodyMock);

        expect(data.accessToken).toBeDefined();
        expect(data.restaurant).toStrictEqual(restaurantReturnMock);
    });

    it("login restaurant should throw error when restaurant does not exists", async () => {
        const restaurantServices = container.resolve(RestaurantServices);

        const login = async () =>  await restaurantServices.login(restaurantLoginBodyMock);

        expect(login()).rejects.toThrow("Restaurant not registered");
    });

    it("login restaurant should throw error when password is wrong", async () => {
        const restaurantServices = container.resolve(RestaurantServices);

        const restaurantMockValue = await restaurantMock();
        prismaMock.restaurant.findFirst.mockResolvedValue(restaurantMockValue);
        
        const login = async () =>  await restaurantServices.login(restaurantLoginWrongPasswordBodyMock);
        
        expect(login()).rejects.toThrow("Email and password doesn't match");
    });
});