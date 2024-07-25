import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecipeContext } from "../../providers/RecipeContext";
import { useRestaurantContext } from "../../providers/RestaurantContext";
import { CardRecipePublic } from "../CardRecipePublic";
import style from './style.module.scss';

export const ListRecipesForRestaurants = () => {
    const { restaurantId } = useParams();
    const { recipes, fetchRecipesByRestaurant } = useRecipeContext();
    const { fetchRestaurantById } = useRestaurantContext();
    const [restaurantName, setRestaurantName] = useState('');

    useEffect(() => {
        const fetchRestaurantData = async () => {
            const restaurant = await fetchRestaurantById(restaurantId);
            setRestaurantName(restaurant.name);
            fetchRecipesByRestaurant(restaurantId);
        };
        fetchRestaurantData();
    }, [restaurantId, fetchRecipesByRestaurant, fetchRestaurantById]);
    
    return (
        <section className={style.recipeSection}>
            <h1 className={style.title}>Menu - {restaurantName}</h1>
            <div className={style.recipeCards}>
                {recipes.map(recipe => (
                    <CardRecipePublic key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </section>
    )
}