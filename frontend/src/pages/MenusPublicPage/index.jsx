import { HeaderMenus } from "../../components/HeaderMenus";
import { ListRestaurants } from "../../components/ListRestaurants";
import { MenusTitles } from "../../components/MenusTitles";


export const MenusPublicPage = () => {
    return (
        <>  
            <HeaderMenus />
            <main>
                <MenusTitles />
                <ListRestaurants />
            </main>
        </>
    )
}
