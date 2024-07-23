import { useNavigate } from "react-router-dom"
import { CardRestaurantProfile } from "../../components/CardRestaurantProfile"
import { FooterProfile } from "../../components/FooterProfile"
import { HeaderProfile } from "../../components/HeaderProfile"
import { useRestaurantContext } from "../../providers/RestaurantContext"
import { useEffect } from "react"

export const ProfilePage = () => {
    const { restaurant, token } = useRestaurantContext();
    const navigate = useNavigate();

    useEffect(() => {
        if(!token) {
            navigate("/restaurants/login");
        }
    }, [token, navigate]);

    if(!restaurant) {
        return <div>Loading...</div>
    }

    return (
        <body>
            <HeaderProfile />
            <main>
                <CardRestaurantProfile />
            </main>
            <FooterProfile />
        </body>
    )
}