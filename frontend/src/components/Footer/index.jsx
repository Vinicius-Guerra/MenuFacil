import { Link } from "react-router-dom";
import style from "./style.module.scss";

export const Footer = () => {
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if(section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

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
                        <Link to={"/#"} className={style.navLink}>
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
        </footer>
    );
};
