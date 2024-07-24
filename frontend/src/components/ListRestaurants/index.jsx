import { useRestaurantContext } from "../../providers/RestaurantContext";
import style from "./style.module.scss";

export const ListRestaurants = () => {
    const { restaurants } = useRestaurantContext();

    return (
        <section className={style.restaurantList}>
            <h1>Lista de Restaurantes</h1>
            <div className={style.cards}>
                {restaurants.map((restaurant) => (
                    <div key={restaurant.id} className={style.card}>
                        <h2>{restaurant.name}</h2>
                        <p>{restaurant.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
