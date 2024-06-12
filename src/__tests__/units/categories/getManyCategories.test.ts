import { container } from "tsyringe";
import { CategoryServices } from "../../../services/category.service";
import { prismaMock } from "../../__mocks__/prisma";
import { categoryListMock } from "../../__mocks__/categories.mock";
import { restaurant } from "../../__mocks__/restaurant.mocks";

describe("Unit test: get many categories", () => {
    it("get many categories should work correctly", async () => {
        const categoryServices = container.resolve(CategoryServices);

        const categoryListMockConfirmed: any = categoryListMock;

        prismaMock.category.findMany.mockResolvedValue(categoryListMockConfirmed);

        const data = await categoryServices.getMany(restaurant.id);

        expect(data).toHaveLength(categoryListMock.length);
        expect(data[0]).toStrictEqual(categoryListMock[0]);
        expect(data[1]).toStrictEqual(categoryListMock[1]);
    });
});