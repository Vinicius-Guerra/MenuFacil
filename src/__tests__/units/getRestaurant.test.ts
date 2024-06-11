import { container } from "tsyringe";
import { RestaurantServices } from "../../services/restaurant.service";
import { prismaMock } from "../__mocks__/prisma";
import { restaurantMock, restaurantReturnMock } from "../__mocks__/restaurant.mocks";

describe("Unit test: get restaurant", () => {
    it("get restaurant should work correctly", async () => {
        const restaurantServices = container.resolve(RestaurantServices);

        const restaurant = await restaurantMock();

        prismaMock.restaurant.findFirst.mockResolvedValue(restaurant);

        const data = await restaurantServices.getRestaurant(restaurant.id);

        expect(data).toStrictEqual(restaurantReturnMock);
    });
});