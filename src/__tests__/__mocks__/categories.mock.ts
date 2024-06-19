import { restaurant } from "./restaurant.mocks";

export const categoryMock = {
    id: "4b14b27a-284d-4553-9427-9e31a62255fe",
    name: "Category",
    restaurantId: restaurant.id,
};

export const categoryCreateBodyMock = {
    name: categoryMock.name
};

export const categoryWrongCreateBodyMock = {
    name: 123,
 };
 
 export const categoryWrongUpdateBodyMock = {
    name: 123,
 };

export const secondCategoryMock = {
    id: "4b14b27a-284d-4553-9427-9e31a62255fa",
    name: "Second Category",
    restaurantId: restaurant.id,
};


export const categoryListMock = [
    categoryMock,
    secondCategoryMock
];

export const updatedCategoryMock = {
    id: categoryMock.id,
    name: "Category Update",
    restaurantId: categoryMock.restaurantId
};

export const updatedCategoryBodyMock = { 
    name: updatedCategoryMock.name,
};
