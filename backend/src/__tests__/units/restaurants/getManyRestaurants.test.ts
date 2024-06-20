import { container } from "tsyringe";
import { RestaurantServices } from "../../../services/restaurant.service";
import { restaurantListMock, restaurantReturnListMock } from "../../__mocks__/restaurant.mocks";
import { prismaMock } from "../../__mocks__/prisma";

describe("Unit test: get many restaurants", () => {
    it("get many restaurants should work correctly", async () => {
        const restaurantServices = container.resolve(RestaurantServices);

        prismaMock.restaurant.findMany.mockResolvedValue(restaurantListMock);

        const data = await restaurantServices.getManyRestaurants();

        expect(data).toHaveLength(restaurantReturnListMock.length);
        expect(data[0]).toStrictEqual(restaurantReturnListMock[0]);
    });
});