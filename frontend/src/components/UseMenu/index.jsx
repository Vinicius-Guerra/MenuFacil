import image1 from "../../assets/use1.svg";
import image2 from "../../assets/use2.svg";
import image3 from "../../assets/use3.svg";
import style from "./style.module.scss";

export const UseMenu = () => {
    return (
        <section className={style.useMenu}>
            <h2 className={style.title}>Faça em poucos minutos o seu menu digital.</h2>
            <div className={style.cardContainer}>
                <ul>
                    <li className={style.card}>
                        <img src={image2} alt="Compartilhe o link do seu menu" className={style.cardImage} />
                        <p className={style.cardFooter}>Compartilhe o link do seu menu.</p>
                    </li>
                    <li className={style.card}>
                        <img src={image3} alt="Seus clientes com mais comodidade nas escolhas" className={style.cardImage} />
                        <p className={style.cardFooter}>Seus clientes com mais comodidade nas escolhas.</p>
                    </li>
                    <li className={style.card}>
                        <img src={image1} alt="Pronto! Cliente e estabelecimento satisfeitos" className={style.cardImage} />
                        <p className={style.cardFooter}>Pronto! Clientes e seu estabelecimento satisfeitos.</p>
                    </li>
                </ul>
            </div>
        </section>
    );
}
