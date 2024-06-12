import bcrypt from "bcrypt";

export const restaurant = {
    id: "8469af2a-05b7-4b62-a30d-538f5608295e",
    name: "Restaurant",
    email: "restaurant@email.com",
    description: "descrição",
    password: "12345678"
}

export const restaurantListMock = [
    restaurant
]

export const restaurantReturnListMock = [
    {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description
    }
]

export const restaurantMock = async () => {
    const hashPassword = await bcrypt.hash(restaurant.password,10);
    return {
        id: restaurant.id,
        name: restaurant.name,
        email: restaurant.email,
        description: restaurant.description,
        password: hashPassword
    }
}

export const restaurantCreateDataMock = async () => {
    const hashPassword = await bcrypt.hash(restaurant.password,10);
    return {
        name: restaurant.name,
        email: restaurant.email,
        description: restaurant.description,
        password: hashPassword
    }
}


export const restaurantCreateBodyMock = {
    name: restaurant.name,
    email: restaurant.email,
    description: restaurant.description,
    password: restaurant.password
};

export const restaurantWrongCreateBodyMock = {
    name: 123,
    email: 123,
    description: 123,
    password: 123
};

export const restaurantLoginBodyMock = {
    email: restaurant.email,
    password: restaurant.password
};

export const restaurantLoginWrongPasswordBodyMock = {
    email: restaurant.email,
    password: "87654321"
};

export const restauranWrongLoginBodyMock = {
    email: 1234,
    password: "9782381231",
}

export const restaurantUpdatedBodyMock = {
    description: "Description example"
};

export const restaurantUpdatedMock = async () => {
    const restaurant = await restaurantMock();
    
    return {
        ...restaurant,
        description: restaurantUpdatedBodyMock.description
    };
};

export const restaurantReturnMock = {
    id: restaurant.id,
    name: restaurant.name,
    email: restaurant.email,
    description: restaurant.description
};

export const restaurantUpdatedReturnMock = {
    id: restaurant.id,
    name: restaurant.name,
    email: restaurant.email,
    description: restaurantUpdatedBodyMock.description
};