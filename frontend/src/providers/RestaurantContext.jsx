import { createContext, useContext, useState } from "react";
import { menuAPI } from "../services/api";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
    const [ restaurant, setRestaurant ] = useState(null);

    const tokenLocal = localStorage.getItem("@TOKEN");

    const [token, setToken] = useState(tokenLocal ? tokenLocal : "");

    const restaurantIdLocal = localStorage.getItem("@RESTAURANTID");

    const [restaurantId, setRestaurantId] = useState(restaurantIdLocal ? restaurantIdLocal : 0);

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
            console.log(payload)
            const { data } = await menuAPI.post("/restaurants/login", payload);
            localStorage.setItem("@TOKEN", data.token);
            localStorage.setItem("@RESTAURANTID", data.user.id);

            setToken(data.token);
            setRestaurantId(data.user.id);
            setRestaurant(data.user);
            toast.success("Login realizado com sucesso!");
            navigate("/restaurants/profile");
        } catch (error) {
            console.log(error.response ? error.response.data : error.message);
            toast.error("Credenciais inválidas");
        }
    };
    

    return (
        <RestaurantContext.Provider value={{token, restaurant, restaurantId, restaurantRegister, restaurantLogin}}>
            {children}
        </RestaurantContext.Provider>
    )
}

export const useRestaurantContext = () => useContext(RestaurantContext);