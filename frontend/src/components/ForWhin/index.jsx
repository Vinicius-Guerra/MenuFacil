import restaurant from "../../assets/local.png";
import restaurantOnline from "../../assets/restOnline.png";
import ecommerce from "../../assets/e-commerce.png";
import style from "./style.module.scss";

export const ForWhin = () => {
    return (
        <section id="forWhin" className={style.forWhin}>
            <h2 className={style.title}>Para quem somos?</h2>
            <ul className={style.cardContainer}>
                <li className={style.card}>
                    <img src={restaurant} alt="Restaurantes de todos os portes" className={style.cardImage} />
                    <p className={style.cardFooter}>Restaurantes de todos os portes.</p>
                </li>
                <li className={style.card}>
                    <img src={restaurantOnline} alt="Restaurante Online" className={style.cardImage} />
                    <p className={style.cardFooter}>Restaurantes On-line</p>
                </li>
                <li className={style.card}>
                    <img src={ecommerce} alt="E-commerce de qualquer setor" className={style.cardImage} />
                    <p className={style.cardFooter}>E-commerce de qualquer setor que deseja apresentar seus produtos de maneira fácil e funcional.</p>
                </li>
            </ul>
        </section>
    );
};
