import { Footer } from "../../components/Footer";
import { HeaderMenus } from "../../components/HeaderMenus";
import { ListRestaurants } from "../../components/ListRestaurants";
import { MenusTitles } from "../../components/MenusTitles";
import style from "./style.module.scss";

export const MenusPublicPage = () => {
    return (
        <>  
            <HeaderMenus />
            <main className={style.main}>
                <MenusTitles />
                <ListRestaurants />
            </main>
            <Footer />
        </>
    )
}
