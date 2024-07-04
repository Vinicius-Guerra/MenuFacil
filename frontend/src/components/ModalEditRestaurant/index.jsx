import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRestaurantContext } from "../../providers/RestaurantContext";
import style from "./style.module.scss";

export const ModalEditRestaurant = ({ setVisibleEditModal }) => {
    const { restaurantUpdate, restaurant } = useRestaurantContext();
    const [loading, setLoading] = useState(false);

    const { handleSubmit, register, reset } = useForm({
        defaultValues: {
            name: restaurant.name,
            description: restaurant.description
        }
    });

    const submit = (formData) => {
        restaurantUpdate(formData, setLoading, reset);
        setVisibleEditModal(false);
    };

    return (
        <div className={style.modalBackground}>
            <div className={style.modalContainer}>
                <h2>Editar Restaurante</h2>
                <form onSubmit={handleSubmit(submit)}>
                    <div className={style.formGroup}>
                        <label htmlFor="name">Nome</label>
                        <input id="name" {...register("name")} />
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="description">Descrição</label>
                        <textarea id="description" {...register("description")} />
                    </div>
                    <div className={style.formActions}>
                        <button type="submit" disabled={loading}>
                            {loading ? "Salvando..." : "Salvar"}
                        </button>
                        <button type="button" onClick={() => setVisibleEditModal(false)}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
