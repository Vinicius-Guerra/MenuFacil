import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./style.module.scss";

export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

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
                        <Link className={style.link} to="/restaurants/login">
                            <p>Log in</p>
                        </Link>
                    </li>
                    <li>
                        <Link className={style.link} to="/restaurants">
                            <p>Cadastre-se</p>
                        </Link>
                    </li>
                    <li>
                        <Link className={style.link} to="/#">
                            <p>Pra quem é?</p>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
