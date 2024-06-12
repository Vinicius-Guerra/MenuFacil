import { container } from "tsyringe";
import { RestaurantServices } from "../../../services/restaurant.service";
import { restaurantUpdatedBodyMock, restaurantUpdatedMock, restaurantUpdatedReturnMock } from "../../__mocks__/restaurant.mocks";
import { prismaMock } from "../../__mocks__/prisma";

describe("Unit test: login restaurant", () => {
    it("update restaurant should work correctly", async () => {
        const restaurantServices = container.resolve(RestaurantServices);

        const restaurant = await restaurantUpdatedMock();

        prismaMock.restaurant.update.mockResolvedValue(restaurant);
        
        const data = await restaurantServices.update(restaurantUpdatedBodyMock, restaurant.id);

        expect(data).toStrictEqual(restaurantUpdatedReturnMock);
    });
});