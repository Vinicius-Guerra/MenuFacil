import { Link } from "react-router-dom";
import style from "./style.module.scss";
import { useState } from "react";
import { SupportModal } from "../SupportModal";

export const Footer = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if(section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

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
                        <Link to="/restaurants" className={style.navLink}>
                            Registre-se
                        </Link>
                    </li>
                    <li>
                        <Link to="/restaurants/login" onClick={() => scrollToSection("initialHome")} className={style.navLink}>
                            Login
                        </Link>
                    </li>
                </ul>
            </nav>
            <p className={style.footerText}>Projeto criado por Vinicius Guerra &copy;</p>
            <SupportModal isOpen={isModalOpen} onClose={closeModal} />
        </footer>
    );
};
