import { useNavigate } from "react-router-dom";
import { useRestaurantContext } from "../../providers/RestaurantContext";
import style from "./style.module.scss";

export const ListRestaurants = () => {
    const { restaurants } = useRestaurantContext();
    
    const navigate = useNavigate();

    const handleCardClick = (restaurantId) => {
        navigate(`/restaurants/${restaurantId}/menu`);
    };

    return (
        <section className={style.restaurantList}>
            <h1>Restaurantes Parceiros</h1>
            <div className={style.cards}>
                {restaurants.map((restaurant) => (
                    <div key={restaurant.id} className={style.card} onClick={() => handleCardClick(restaurant.id)}>
                        <h2>{restaurant.name}</h2>
                        <p>{restaurant.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
