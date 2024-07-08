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

    const fetchRecipes = async () => {
        try {
            const { data } = await menuAPI.get("/recipes", authHeader);
            setRecipes(data);
        } catch (error) {
            console.error("Error creating recipe:", error);
            if (error.response && error.response.status === 409) {
                toast.error("Receita já existe ou conflito de dados.");
            } else {
                toast.error("Erro ao criar receita. Tente novamente.");
            }
        }
    };

    const addRecipe = async (recipe) => {
        try {
            const { data } = await menuAPI.post("/recipes", recipe, authHeader);
            setRecipes([...recipes, data]);
            toast.success("Receita adicionada com sucesso!");
        } catch (error) {
            toast.error("Não foi possível adicionar a receita.");
        }
    };

    return (
        <RecipeContext.Provider value={{ recipes, fetchRecipes, addRecipe }}>
            {children}
        </RecipeContext.Provider>
    );
};

export const useRecipeContext = () => useContext(RecipeContext);
