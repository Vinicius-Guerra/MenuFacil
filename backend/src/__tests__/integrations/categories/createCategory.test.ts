import { categoryCreateBodyMock, categoryWrongCreateBodyMock } from "../../__mocks__/categories.mock";
import { request } from "../../utils/request";
import { invalidToken, simulateLogin } from "../../utils/simulateLogin";

describe("Integration test: create category", () => {
    it("should be able create a category successfully", async () => {
       const { restaurant, token } = await simulateLogin();
 
       const data = await request
          .post("/categories")
          .set("Authorization", `Bearer ${token}`)
          .send(categoryCreateBodyMock)
          .expect(201)
          .then((response) => response.body);
 
       expect(data.id).toBeDefined();
       expect(data.name).toBe(categoryCreateBodyMock.name);
       expect(data.restauranteId).toBe(restaurant.id);
    });
 
    it("should throw error when there is no token", async () => {
       await request.post("/categories").send(categoryCreateBodyMock).expect(401);
    });
 
    it("should throw error when token is invalid", async () => {
       const token = invalidToken();
 
       await request
          .post("/categories")
          .set("Authorization", `Bearer ${token}`)
          .send(categoryCreateBodyMock)
          .expect(401);
    });
 
    it("should throw error when missing body parameter", async () => {
       const data = await request
          .post("/categories")
          .expect(409)
          .then((response) => response.body);
 
       expect(data.issues).toHaveLength(1);
       expect(data.issues[0].message).toBe("Required");
    });
 
    it("should throw error when invalid data type in body parameter", async () => {
       const { token } = await simulateLogin();
 
       const data = await request
          .post("/categories")
          .set("Authorization", `Bearer ${token}`)
          .send(categoryWrongCreateBodyMock)
          .expect(409)
          .then((response) => response.body);
 
       expect(data.issues).toHaveLength(1);
       expect(data.issues[0].message).toBe("Expected string, received number");
    });
 });