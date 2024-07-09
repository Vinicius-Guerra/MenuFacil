import { useState } from "react";
import { useForm } from "react-hook-form";
import style from "./style.module.scss";

export const ModalDinamic = ({ setVisibleModal, modalType, defaultValues, onSubmit }) => {
    const [loading, setLoading] = useState(false);

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
                            <label htmlFor="category">Categoria</label>
                            <input id="category" {...register("category")} />
                        </div>
                    </>
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
            default:
                return "";
        }
    };

    return (
        <div className={style.modalBackground}>
            <div className={style.modalContainer}>
                <h2 className={style.titleModal}>{getTitle()}</h2>
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
            </div>
        </div>
    );
};
