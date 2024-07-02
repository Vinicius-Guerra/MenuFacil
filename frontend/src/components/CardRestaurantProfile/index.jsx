import { useRestaurantContext } from "../../providers/RestaurantContext";
import style from "./style.module.scss";

export const CardRestaurantProfile = () => {
    const { restaurant } = useRestaurantContext();
    
    return (
        <section className={style.profileSection}>
            <div className={style.profileCard}>
                <h2>Olá! Seja bem-vindo ao seu Perfil.</h2>
                <h3>{restaurant?.name}</h3>
            </div>
        </section>
    );
}
