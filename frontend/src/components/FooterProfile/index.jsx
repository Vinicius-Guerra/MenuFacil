import { Link } from "react-router-dom";
import style from "./style.module.scss";
import { SupportModal } from "../SupportModal";
import { useState } from "react";

export const FooterProfile = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <footer className={style.footer}>
            <nav>
                <ul className={style.navList}>
                    <li>
                        <Link to={"/menus"} className={style.navLink}>
                            Cardápios
                        </Link>
                    </li>
                    <li>
                        <Link className={style.navLink} onClick={openModal}>
                            Suporte
                        </Link>
                    </li>
                    <li>
                        <Link className={style.navLink}>
                            Indique o Menu fácil
                        </Link>
                    </li>
                </ul>
            </nav>
            <p className={style.footerText}>Projeto criado por Vinicius Guerra &copy;</p>
            <SupportModal isOpen={isModalOpen} onClose={closeModal} />
        </footer>
    );
};
