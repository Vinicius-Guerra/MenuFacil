import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCategoryContext } from "../../providers/CategoryContext";
import style from "./style.module.scss";

export const ModalCreateCategory = ({ setVisibleCreateModal }) => {
    const { addCategory } = useCategoryContext();
    const [loading, setLoading] = useState(false);

    const { handleSubmit, register, reset } = useForm({
        defaultValues: {
            name: ""
        }
    });

    const submit = async (formData) => {
        setLoading(true);
        await addCategory(formData);
        setLoading(false);
        reset();
        setVisibleCreateModal(false);
    };

    return (
        <div className={style.modalBackground}>
            <div className={style.modalContainer}>
                <h2>Criar Categoria</h2>
                <form onSubmit={handleSubmit(submit)}>
                    <div className={style.formGroup}>
                        <label htmlFor="name">Nome</label>
                        <input id="name" {...register("name")} />
                    </div>
                    <div className={style.formActions}>
                        <button type="submit" disabled={loading}>
                            {loading ? "Criando..." : "Criar"}
                        </button>
                        <button type="button" onClick={() => setVisibleCreateModal(false)}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
