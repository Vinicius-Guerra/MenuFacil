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

    const editRecipe = async (restaurantId, recipeId, updatedRecipe) => {
        const formattedRecipe = {
            ...updatedRecipe,
            price: Number(updatedRecipe.price)
        };

        try {
            const { data } = await menuAPI.patch(`/recipes/restaurante/${restaurantId}/${recipeId}`, formattedRecipe, authHeader);
            setRecipes(recipes.map(recipe => recipe.id === recipeId ? data : recipe));
            toast.success("Receita editada com sucesso!");
        } catch (error) {
            console.error("Erro ao editar receita:", error);
            toast.error("Não foi possível editar a receita.");
        }
    };

    const deleteRecipe = async (restaurantId, recipeId) => {
        try {
            await menuAPI.delete(`/recipes/restaurante/${restaurantId}/${recipeId}`, authHeader);
            setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
            toast.success("Receita deletada com sucesso!");
        } catch (error) {
            console.error("Erro ao deletar receita:", error);
            toast.error("Não foi possível deletar a receita.");
        }
    };

    return (
        <RecipeContext.Provider value={{ recipes, fetchRecipesByRestaurant, fetchRecipes, addRecipe, editRecipe, deleteRecipe }}>
            {children}
        </RecipeContext.Provider>
    );
};

export const useRecipeContext = () => useContext(RecipeContext);