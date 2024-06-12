import { container } from "tsyringe";
import { CategoryServices } from "../../../services/category.service";
import { prismaMock } from "../../__mocks__/prisma";
import { updatedCategoryBodyMock, updatedCategoryMock } from "../../__mocks__/categories.mock";

describe("Unit test: update category", () => {
    it("update category should work correctly", async () => {
        const categoryServices = container.resolve(CategoryServices);

        const updatedCategoryMockConfirmed: any = updatedCategoryMock;

        prismaMock.category.update.mockResolvedValue(updatedCategoryMockConfirmed);

        const data = await categoryServices.update(updatedCategoryBodyMock, updatedCategoryMock.id);

        expect(data).toStrictEqual(updatedCategoryMock);
    });
});
