import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./style.module.scss";
import { useRestaurantContext } from "../../providers/RestaurantContext";
import { SupportModal } from "../SupportModal";

export const HeaderProfile = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { restaurantLogout } = useRestaurantContext();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <header className={style.container}>
            <div className={style.container_logo}>
                <p>Menu</p>
                <p className={style.easy}>Fácil</p>
            </div>
            <div className={style.hamburger} onClick={toggleMenu}>
                <div className={`${style.bar} ${menuOpen ? style.open : ""}`}></div>
                <div className={`${style.bar} ${menuOpen ? style.open : ""}`}></div>
                <div className={`${style.bar} ${menuOpen ? style.open : ""}`}></div>
            </div>
            <nav className={menuOpen ? style.open : ""}>
                <ul>
                    <li>
                        <Link className={style.link} onClick={openModal}>
                            <p>Suporte</p>
                        </Link>
                    </li>
                    <li>
                        <Link className={style.link} to="/menus">
                            <p>Ver menus</p>
                        </Link>
                    </li>
                    <li>
                        <Link className={style.link} onClick={restaurantLogout}>
                            <p>Sair</p>
                        </Link>
                    </li>
                </ul>
            </nav>
            <SupportModal isOpen={isModalOpen} onClose={closeModal} />
        </header>
    );
};
