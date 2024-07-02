import { CardRestaurantProfile } from "../../components/CardRestaurantProfile"
import { HeaderProfile } from "../../components/HeaderProfile"

export const ProfilePage = () => {
    return (
        <body>
            <HeaderProfile />
            <main>
                <CardRestaurantProfile />
            </main>
        </body>
    )
}