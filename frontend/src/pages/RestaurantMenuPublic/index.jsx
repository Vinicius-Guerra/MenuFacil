import { Footer } from "../../components/Footer"
import { HeaderMenus } from "../../components/HeaderMenus"
import { ListRecipesForRestaurants } from "../../components/ListRecipesForRestaurants";

export const RestaurantMenuPublic = () => {
    return (
        <body>
            <HeaderMenus />
            <main>
                <ListRecipesForRestaurants />
            </main>
            <Footer />
        </body>
    )
}