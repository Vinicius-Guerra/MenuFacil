import { TRestaurant } from "../../../schemas/restaurant.schema";
import { request } from "../../utils/request";
import { restaurantDefaultExpects } from "../../utils/restaurantDefaultExpects";
import { invalidToken, simulateLogin } from "../../utils/simulateLogin"

describe("Integration test: get restaurant profile", () => {
    it("should be able to get restaurant profile successfully", async () => {
        const { restaurant, token } = await simulateLogin();

        const restaurantType: TRestaurant = restaurant;

        const data = await request
            .get("/restaurants/profile")
            .set("Authorization", `Bearer ${token}`)
            .expect(200)
            .then((response) => response.body);

        restaurantDefaultExpects(data, restaurantType)
        expect(data.password).toBeUndefined();
    });

    it("should throw error when there is no token", async () => {
        await request
            .get("/restaurants/profile")
            .expect(401)
    });

    it("should throw error when token is invalid", async () => {
        const token = invalidToken();
        await request
            .get("/restaurants/profile")
            .set("Authorization", `Bearer ${token}`)
            .expect(401)
    });
});