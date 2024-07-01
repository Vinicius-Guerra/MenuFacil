import { Route, Routes } from "react-router-dom"
import { HomePage } from "../pages/HomePage"
import { RegisterPage } from "../pages/RegisterPage"
import { ProfilePage } from "../pages/ProfilePage"

export const RoutesMain = () => {
    return (
        <Routes>
            <Route path="/restaurants/login" element={<HomePage />}/>
            <Route path="/restaurants" element={<RegisterPage />}/>
            <Route path="/restaurants/profile" element={<ProfilePage />}/>
        </Routes>
    )
}