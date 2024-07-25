import { createContext, useContext, useEffect, useState } from "react";
import { menuAPI } from "../services/api";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
    const [restaurant, setRestaurant] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const restaurantLogout =  () => {
        try {
            localStorage.removeItem("@TOKEN");
            localStorage.removeItem("@RESTAURANTID");
            setToken("");
            setRestaurantId(0);
            setRestaurant(null);
            toast.success("Logout realizado com sucesso!");
            navigate("/restaurants/login");
        } catch (error) {
            toast.error("Erro ao sair do perfil do restaurante");
        }
    }

    const autoLogin = async () => {
        if (token && restaurantId) {
            try {
                const { data } = await menuAPI.get(`/restaurants/profile`, authHeader);
                setRestaurant(data);
                navigate("/restaurants/profile");
            } catch (error) {
                console.error("AutoLogin Error:", error.response ? error.response.data : error.message);
                localStorage.removeItem("@TOKEN");
                localStorage.removeItem("@RESTAURANTID");
                setToken("");
                setRestaurantId(0);
                navigate("/restaurants/login");
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    const fetchRestaurants = async () => {
        try {
            const { data } = await menuAPI.get("/restaurants");
            setRestaurants(data);
        } catch (error) {
            console.error("Erro ao obter lista de restaurantes:", error.response ? error.response.data : error.message);
            toast.error("Erro ao obter lista de restaurantes");
        }
    };

    const fetchRestaurantById = async (id) => {
        try {
            const { data } = await menuAPI.get(`/restaurants/${id}`);
            return data;
        } catch (error) {
            console.error("Erro ao obter restaurante:", error.response ? error.response.data : error.message);
            toast.error("Erro ao obter restaurante");
            return null;
        }
    };


    useEffect(() => {
        autoLogin();
        fetchRestaurants();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <RestaurantContext.Provider value={{
            token,
            restaurant,
            restaurantId,
            restaurantRegister,
            restaurantLogin,
            restaurantUpdate,
            restaurantLogout,
            editRestaurant,
            setEditRestaurant,
            restaurants,
            fetchRestaurantById
        }}>
            {children}
        </RestaurantContext.Provider>
    );
};

export const useRestaurantContext = () => useContext(RestaurantContext);