import { useState } from "react";
import { useRestaurantContext } from "../../providers/RestaurantContext";
import { useCategoryContext } from "../../providers/CategoryContext";
import { useRecipeContext } from "../../providers/RecipeContext";
import { ModalDinamic } from "../ModalDinamic";
import style from "./style.module.scss";

export const CardRestaurantProfile = () => {
    const { restaurant, restaurantUpdate } = useRestaurantContext();
    const { addCategory } = useCategoryContext();
    const { addRecipe } = useRecipeContext();
    
    const [visibleModal, setVisibleModal] = useState(false);
    const [modalType, setModalType] = useState("");
    const [defaultValues, setDefaultValues] = useState({});

    const handleEditClick = () => {
        setModalType("editRestaurant");
        setDefaultValues({ name: restaurant.name, description: restaurant.description });
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

    const getSubmitFunction = () => {
        switch (modalType) {
            case "editRestaurant":
                return restaurantUpdate;
            case "createCategory":
                return addCategory;
            case "createRecipe":
                return addRecipe;
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
                    </ul>
                </nav>
            </div>
            {visibleModal && (
                <ModalDinamic
                    setVisibleModal={setVisibleModal}
                    modalType={modalType}
                    defaultValues={defaultValues}
                    onSubmit={getSubmitFunction()}
                />
            )}
        </section>
    );
};
