import { useEffect, useState } from "react";
import { useCategoryContext } from "../../providers/CategoryContext";
import { useRecipeContext } from "../../providers/RecipeContext";
import { useRestaurantContext } from "../../providers/RestaurantContext";
import style from "./style.module.scss";
import { ModalDinamic } from "../ModalDinamic";
import CardRecipe from "../CardRecipe";

export const CardRestaurantProfile = () => {
    const { restaurant, restaurantUpdate } = useRestaurantContext();
    const { addCategory, fetchCategoriesByRestaurant, categories } = useCategoryContext();
    const { recipes, fetchRecipesByRestaurant, addRecipe, editRecipe, deleteRecipe } = useRecipeContext();

    const [visibleModal, setVisibleModal] = useState(false);
    const [modalType, setModalType] = useState("");
    const [defaultValues, setDefaultValues] = useState({});

    useEffect(() => {
        if (restaurant?.id) {
            fetchRecipesByRestaurant(restaurant.id);
            fetchCategoriesByRestaurant(restaurant.id);
        }
    }, [restaurant]);

    const handleEditClick = () => {
        setModalType("editRestaurant");
        setDefaultValues({ name: restaurant.name, description: restaurant.description });
        setVisibleModal(true);
    };

    const handleEditClickRecipe = (recipe) => {
        setModalType("editRecipe");
        setDefaultValues(recipe);
        setVisibleModal(true);
    };

    const handleAddCategoryClick = () => {
        setModalType("createCategory");
        setDefaultValues({ name: "" });
        setVisibleModal(true);
    };

    const handleAddRecipeClick = () => {
        setModalType("createRecipe");
        setDefaultValues({ name: "", description: "", price: "", category: "" });
        setVisibleModal(true);
    };

    const handleViewCategoriesClick = () => {
        setModalType("viewCategories");
        setVisibleModal(true);
    };

    const handleDeleteClick = async (recipeId) => {
        await deleteRecipe(restaurant.id, recipeId);
    };

    const getSubmitFunction = () => {
        switch (modalType) {
            case "editRestaurant":
                return restaurantUpdate;
            case "createCategory":
                return addCategory;
            case "createRecipe":
                return addRecipe;
            case "editRecipe":
                return (updatedRecipe) => editRecipe(restaurant.id, defaultValues.id, updatedRecipe);
            default:
                return null;
        }
    };

    return (
        <section className={style.profileSection}>
            <div className={style.profileCard}>
                <h2>Olá! Seja bem-vindo ao seu Perfil.</h2>
                <h3>{restaurant?.name}</h3>
                <p>{restaurant?.description}</p>
            </div>
            <div>
                <nav>
                    <ul>
                        <li onClick={handleEditClick}>Editar perfil</li>
                        <li onClick={handleAddCategoryClick}>Adicionar categoria</li>
                        <li onClick={handleAddRecipeClick}>Adicionar Receita</li>
                        <li onClick={handleViewCategoriesClick}>Ver minhas categorias</li>
                    </ul>
                </nav>
                <section className={style.profileSection}>
                    <h1>Menu Online - {restaurant?.name}</h1>
                    {recipes.length === 0 ? (
                        <div className={style.noRecipesCard}>
                            <h2>Seu restaurante ainda não possui receitas cadastradas.</h2>
                        </div>
                    ) : (
                        <div className={style.recipeList}>
                            {recipes.map((recipe) => (
                                <CardRecipe
                                    key={recipe.id}
                                    recipe={recipe}
                                    onEdit={handleEditClickRecipe}
                                    onDelete={handleDeleteClick}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </div>
            {visibleModal && (
                <ModalDinamic
                    setVisibleModal={setVisibleModal}
                    modalType={modalType}
                    defaultValues={defaultValues}
                    onSubmit={getSubmitFunction()}
                    categories={categories}
                />
            )}
        </section>
    );
};
