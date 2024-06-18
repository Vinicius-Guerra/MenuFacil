import { restaurantUpdatedBodyMock } from "../../__mocks__/restaurant.mocks";
import { request } from "../../utils/request";
import { restaurantDefaultExpects } from "../../utils/restaurantDefaultExpects";
import { invalidToken, simulateLogin } from "../../utils/simulateLogin"

describe("Integration test: update restaurant", () => {
    it("should be able to update restaurant successfully", async () => {
        const { restaurant, token } = await simulateLogin();

        const data = await request
            .patch("/restaurants")
            .set("Authorization", `Bearer ${token}`)
            .send(restaurantUpdatedBodyMock)
            .expect(200)
            .then((response) => response.body);

        const expectedNewRestaurant = {
            id: restaurant.id,
            name: restaurant.name,
            email: restaurant.email,
            description: restaurantUpdatedBodyMock.description,
            password: restaurant.password
        };

        restaurantDefaultExpects(data, expectedNewRestaurant);
    });

    it("should throw error when there is no token", async () => {
        await request
            .patch("/restaurants")
            .send(restaurantUpdatedBodyMock)
            .expect(401)
    });

    it("should throw error when token is invalid", async () => {
        const token = invalidToken();
        await request
            .patch("/restaurants")
            .send(restaurantUpdatedBodyMock)
            .set("Authorization", `Bearer ${token}`)
            .expect(401)
    });
})