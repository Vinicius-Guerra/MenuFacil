import { Route, Routes, Navigate } from "react-router-dom"
import { HomePage } from "../pages/HomePage"
import { RegisterPage } from "../pages/RegisterPage"
import { ProfilePage } from "../pages/ProfilePage"
import { useRestaurantContext } from "../providers/RestaurantContext";
import { MenusPublicPage } from "../pages/MenusPublicPage";

const ProtectedRoute = ({ children }) => {
    const { token } = useRestaurantContext();

    return token ? children : <Navigate to="/restaurants/login" />;
};

export const RoutesMain = () => {
    return (
        <Routes>
            <Route path="/restaurants/login" element={<HomePage />} />
            <Route path="/restaurants" element={<RegisterPage />} />
            <Route path="/restaurants/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/menus" element={<MenusPublicPage />}/>
        </Routes>
    )
}