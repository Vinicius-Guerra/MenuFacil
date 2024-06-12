import { restaurant } from "./restaurant.mocks";

export const recipeMock = {
    id: "98d5e209-d0b6-4dda-b75d-fe1551d6fde3",
    name: "Recipe",
    description: "This is a recipe",
    price: 1234,
    restaurantId: restaurant.id,
    categoryId: null,
};

export const secondRecipeMock = {
    id: "98d5e209-d0b6-4dda-b75d-fe1551d6fde4",
    name: "Recipe 2",
    description: "This is a recipe 2",
    price: 1234,
    restaurantId: restaurant.id,
    categoryId: "53fdb7ee-c5ab-408c-bd88-8e3f948f18e5",
};

export const recipeListMock = [
    recipeMock,
    secondRecipeMock
];

export const recipeCreateBodyMock = {
    name: recipeMock.name,
    description: recipeMock.description,
    price: recipeMock.price,
};
