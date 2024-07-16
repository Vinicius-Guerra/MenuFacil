import { createContext, useContext, useState } from "react";
import { menuAPI } from "../services/api";
import { toast } from 'react-toastify';
import { useRestaurantContext } from "./RestaurantContext";

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([]);
    const { token } = useRestaurantContext();

    const authHeader = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const fetchRecipesByRestaurant = async (restaurantId) => {
        try {
            const response = await menuAPI.get(`/recipes/restaurante/${restaurantId}`);
            setRecipes(response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching recipes", error);
            return [];
        }
    };

    const fetchRecipes = async () => {
        try {
            const { data } = await menuAPI.get("/recipes", authHeader);
            setRecipes(data);
        } catch (error) {
            toast.error("Erro ao carregar receitas.");
        }
    };

    const addRecipe = async (recipe) => {
        // Converter price para número
        const formattedRecipe = {
            ...recipe,
            price: Number(recipe.price)
        };

        console.log("Enviando receita para criação:", formattedRecipe);

        try {
            const { data } = await menuAPI.post("/recipes", formattedRecipe, authHeader);
            setRecipes([...recipes, data]);
            toast.success("Receita adicionada com sucesso!");
        } catch (error) {
            console.error("Erro ao adicionar receita:", error);
            if (error.response && error.response.status === 409) {
                toast.error("Receita já existe ou conflito de dados.");
            } else {
                toast.error("Não foi possível adicionar a receita.");
            }
        }
    };

    return (
        <RecipeContext.Provider value={{ recipes, fetchRecipesByRestaurant, fetchRecipes, addRecipe }}>
            {children}
        </RecipeContext.Provider>
    );
};

export const useRecipeContext = () => useContext(RecipeContext);