import { CardRestaurantProfile } from "../../components/CardRestaurantProfile"
import { FooterProfile } from "../../components/FooterProfile"
import { HeaderProfile } from "../../components/HeaderProfile"

export const ProfilePage = () => {
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