import { createContext, useContext, useState } from "react";
import { menuAPI } from "../services/api";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
    const [restaurant, setRestaurant] = useState(null);

    const tokenLocal = localStorage.getItem("@TOKEN");
    const [token, setToken] = useState(tokenLocal ? tokenLocal : "");

    const restaurantIdLocal = localStorage.getItem("@RESTAURANTID");
    const [restaurantId, setRestaurantId] = useState(restaurantIdLocal ? restaurantIdLocal : 0);

    const [editRestaurant, setEditRestaurant] = useState(null);

    const authHeader = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const navigate = useNavigate();

    const restaurantRegister = async (payload) => {
        try {
            const { data } = await menuAPI.post("/restaurants", payload);
            toast.success("Conta criada com sucesso!");
            navigate("/restaurants/login");
            console.log(data);
        } catch (error) {
            console.log(error.response ? error.response.data : error.message);
            toast.error("Ops! Algo deu errado.");
        }
    }

    const restaurantLogin = async (payload) => {
        try {
            console.log("Login Payload:", payload);
            const { data } = await menuAPI.post(`/restaurants/login`, payload, {
                withCredentials: true,
            });
            console.log("Login Response:", data);

            localStorage.setItem("@TOKEN", data.accessToken);
            localStorage.setItem("@RESTAURANTID", data.restaurant.id);

            setToken(data.accessToken);
            setRestaurantId(data.restaurant.id);
            setRestaurant(data.restaurant);
            toast.success("Login realizado com sucesso!");
            navigate("/restaurants/profile");
        } catch (error) {
            console.error("Login Error:", error.response ? error.response.data : error.message);
            toast.error("Credenciais inválidas");
        }
    };

    const restaurantUpdate = async (formData) => {
        try {
            const newEditRestaurant = { ...editRestaurant, ...formData }
            const { data } = await menuAPI.patch(`restaurants/profile/${newEditRestaurant.id}`, newEditRestaurant, authHeader);

            setEditRestaurant(null);
            setRestaurant(data)
            toast.success("Seu perfil foi atualizado com sucesso.");
        } catch (error) {
            console.error("Erro ao atualizar restaurante:", error.response ? error.response.data : error.message);
            toast.error("Erro ao atualizar restaurante");
        }
    };

    return (
        <RestaurantContext.Provider value={{
            token,
            restaurant,
            restaurantId,
            restaurantRegister,
            restaurantLogin,
            restaurantUpdate,
            editRestaurant,
            setEditRestaurant
        }}>
            {children}
        </RestaurantContext.Provider>
    );
};

export const useRestaurantContext = () => useContext(RestaurantContext);