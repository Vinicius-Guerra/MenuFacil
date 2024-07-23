import mockup from "../../assets/mockup3.png";
import style from "./style.module.scss";
import { FormLogin } from "../FormLogin";

export const InitialHome = () => {

    return (
        <section className={style.initialHome}>
            <div className={style.container}>
                <div className={style.content}>
                    <h1 className={style.title}>Conectando sabores</h1>
                    <h2 className={style.subtitle}>Crie seu cardápio digital <strong>Grátis</strong></h2>
                    <figure className={style.figure}>
                        <img 
                            className={style.image__main} 
                            src={mockup} 
                            alt="imagem vetorizada de mulher sentada mexendo no celular com imagem de celular grande com cardápio alimentar demonstrativo de fundo." 
                        />
                    </figure>
                    <h3 className={style.subtitle}>Melhore a experiência do seu cliente.</h3>
                </div>
                <div className={style.login}>
                    <h2 className={style.loginTitle}>Login</h2>
                    <FormLogin />
                </div>
            </div>
        </section>
    );
}
