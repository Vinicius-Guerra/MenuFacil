import { Link } from "react-router-dom";
import style from "./style.module.scss";

export const RegisterNowHome = () => {
    return (
        <section className={style.registerBanner}>
            <h3 className={style.bannerTitle}>Registre o seu negócio e comece a aproveitar nossas funcionalidades!</h3>
            <Link to="/restaurants" className={style.bannerButton}>
                Cadastre-se agora
            </Link>
        </section>
    );
};
