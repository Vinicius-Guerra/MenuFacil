import { container } from "tsyringe";
import { CategoryServices } from "../../../services/category.service";
import { categoryMock } from "../../__mocks__/categories.mock";

describe("Unit test: delete category", () => {
    it("delete category should work correctly", async () => {
        const categoryServices = container.resolve(CategoryServices);
        
        await categoryServices.delete( categoryMock.id);
    });
});
