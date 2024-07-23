import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import style from "./style.module.scss";
import { useCategoryContext } from "../../providers/CategoryContext";
import { useRestaurantContext } from "../../providers/RestaurantContext";

export const ModalDinamic = ({ setVisibleModal, modalType, defaultValues, onSubmit }) => {
    const [loading, setLoading] = useState(false);
    const { categories, fetchCategoriesByRestaurant, deleteCategory } = useCategoryContext();
    const { restaurant } = useRestaurantContext();

    useEffect(() => {
        if ((modalType === "createRecipe" || modalType === "editRecipe" || modalType === "viewCategories") && restaurant?.id) {
            fetchCategoriesByRestaurant(restaurant.id);
        }
    }, [modalType, restaurant, fetchCategoriesByRestaurant]);

    const { handleSubmit, register, reset } = useForm({
        defaultValues: defaultValues
    });

    const submit = async (payload) => {
        setLoading(true);
        try {
            await onSubmit(payload);
        } finally {
            setLoading(false);
            reset(defaultValues);
            setVisibleModal(false);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        await deleteCategory(categoryId);
        fetchCategoriesByRestaurant(restaurant.id);
    };

    const renderFormFields = () => {
        switch (modalType) {
            case "editRestaurant":
                return (
                    <>
                        <div className={style.formGroup}>
                            <label htmlFor="name">Nome</label>
                            <input id="name" {...register("name")} />
                        </div>
                        <div className={style.formGroup}>
                            <label htmlFor="description">Descrição</label>
                            <textarea id="description" {...register("description")} />
                        </div>
                    </>
                );
            case "createCategory":
                return (
                    <div className={style.formGroup}>
                        <label htmlFor="name">Nome</label>
                        <input id="name" {...register("name")} />
                    </div>
                );
            case "createRecipe":
            case "editRecipe":
                return (
                    <>
                        <div className={style.formGroup}>
                            <label htmlFor="name">Nome</label>
                            <input id="name" {...register("name")} />
                        </div>
                        <div className={style.formGroup}>
                            <label htmlFor="description">Descrição</label>
                            <textarea id="description" {...register("description")} />
                        </div>
                        <div className={style.formGroup}>
                            <label htmlFor="price">Preço</label>
                            <input id="price" type="number" {...register("price")} />
                        </div>
                        <div className={style.formGroup}>
                            <label htmlFor="categoryId">Categoria</label>
                            <select id="categoryId" {...register("categoryId")}>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </>
                );
            case "viewCategories":
                return (
                    <div className={style.categoryList}>
                        <ul>
                            {categories.map(category => (
                                <li key={category.id} className={style.categoryItem}>
                                    <span>{category.name}</span>
                                    <button onClick={() => handleDeleteCategory(category.id)} className={style.deleteButton}>Excluir</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            default:
                return null;
        }
    };

    const getTitle = () => {
        switch (modalType) {
            case "editRestaurant":
                return "Editar Restaurante";
            case "createCategory":
                return "Criar Categoria";
            case "createRecipe":
                return "Criar Receita";
            case "editRecipe":
                return "Editar Receita";
            case "viewCategories":
                return "Categorias";
            default:
                return "";
        }
    };

    return (
        <div className={style.modalBackground}>
            <div className={style.modalContainer}>
                <h2 className={style.titleModal}>{getTitle()}</h2>
                {modalType === "viewCategories" ? (
                    <div className={style.modalContent}>
                        {renderFormFields()}
                        <div className={style.formActions}>
                            <button type="button" onClick={() => setVisibleModal(false)}>
                                Fechar
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(submit)}>
                        {renderFormFields()}
                        <div className={style.formActions}>
                            <button type="submit" disabled={loading}>
                                {loading ? "Salvando..." : "Salvar"}
                            </button>
                            <button type="button" onClick={() => setVisibleModal(false)}>
                                Cancelar
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

ModalDinamic.propTypes = {
    setVisibleModal: PropTypes.func.isRequired,
    modalType: PropTypes.string.isRequired,
    defaultValues: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired
};
