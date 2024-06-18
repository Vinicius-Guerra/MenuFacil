import { restaurant } from "./restaurant.mocks";

export const recipeMock = {
    id: "98d5e209-d0b6-4dda-b75d-fe1551d6fde3",
    name: "Recipe",
    description: "This is a recipe",
    price: 1234,
    restaurantId: restaurant.id,
    categoryId: null,
};

export const restaurantRecipeCreateDataMock = (restauranteId: string) => ({
    name: "Recipe",
    description: "This is a recipe",
    price: 1234,
    restauranteId,
    categoryId: null,
});

export const secondRecipeMock = {
    id: "98d5e209-d0b6-4dda-b75d-fe1551d6fde4",
    name: "Recipe 2",
    description: "This is a recipe 2",
    price: 1234,
    restaurantId: restaurant.id,
    categoryId: "53fdb7ee-c5ab-408c-bd88-8e3f948f18e5",
};

export const updatedRecipeMock = {
    id: recipeMock.id,
    name: "Recipe Updated",
    description: "This is a recipe update",
    price: 2345,
    restaurantId: recipeMock.restaurantId,
    categoryId: "d0c4b75e-43d6-4995-8f7a-7cab8b2bafef",
};

export const updatedRecipeBodyMock = {
    name: updatedRecipeMock.name,
    description: updatedRecipeMock.description,
    price: updatedRecipeMock.price,
    categoryId: updatedRecipeMock.categoryId,
};

export const recipeWrongCreateBodyMock = {
    name: 123,
    description: 123,
    price: "Text",
    categoryId: 123
}

export const recipeListMock = [
    recipeMock,
    secondRecipeMock
];

export const recipeCreateBodyMock = {
    name: recipeMock.name,
    description: recipeMock.description,
    price: recipeMock.price,
};
