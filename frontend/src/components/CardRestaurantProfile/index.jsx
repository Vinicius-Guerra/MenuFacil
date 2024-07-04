import { useState } from "react";
import { useRestaurantContext } from "../../providers/RestaurantContext";
import { ModalEditRestaurant } from "../ModalEditRestaurant"; // Importe o modal de edição
import style from "./style.module.scss";
import { ModalCreateCategory } from "../ModalCreateCategory";

export const CardRestaurantProfile = () => {
    const { restaurant, setEditRestaurant } = useRestaurantContext();
    const [visibleEditModal, setVisibleEditModal] = useState(false);
    const [visibleCreateModal, setVisibleCreateModal] = useState(false);

    const handleEditClick = () => {
        setEditRestaurant(restaurant);
        setVisibleEditModal(true);
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
                        <li onClick={() => setVisibleCreateModal(true)}>Adicionar categoria</li>
                        <li>Adicionar Receita</li>
                    </ul>
                </nav>
            </div>
            {visibleEditModal && <ModalEditRestaurant setVisibleEditModal={setVisibleEditModal} />}
            {visibleCreateModal && <ModalCreateCategory setVisibleCreateModal={setVisibleCreateModal} />}
        </section>
    );
};
