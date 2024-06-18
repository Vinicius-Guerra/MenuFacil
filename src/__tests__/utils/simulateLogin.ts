import { prisma } from "../../database/prisma";
import { restaurantCreateDataMock } from "../__mocks__/restaurant.mocks";
import jwt from "jsonwebtoken";

export const simulateLogin = async () => {
    const restaurantData = await restaurantCreateDataMock();
    const restaurant = await prisma.restaurant.create({ data: restaurantData });

    const token = jwt.sign({ id: restaurant.id }, process.env.JWT_SECRET as string);

    return { restaurant, token };
};

export const invalidToken = () => {
    const token = jwt.sign({}, "1234");

    return token;
}