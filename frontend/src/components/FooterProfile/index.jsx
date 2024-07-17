import { Link } from "react-router-dom";
import style from "./style.module.scss";

export const FooterProfile = () => {
    return (
        <footer className={style.footer}>
            <nav>
                <ul className={style.navList}>
                    <li>
                        <Link to={"/#"} className={style.navLink}>
                            Cardápios
                        </Link>
                    </li>
                    <li>
                        <Link to={"/#"} className={style.navLink}>
                            Suporte
                        </Link>
                    </li>
                    <li>
                        <Link to={"/#"} className={style.navLink}>
                            Indique o Menu fácil
                        </Link>
                    </li>
                </ul>
            </nav>
            <p className={style.footerText}>Projeto criado por Vinicius Guerra &copy;</p>
        </footer>
    );
};
