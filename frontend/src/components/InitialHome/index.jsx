import mockup from "../../assets/mockup3.png";
import style from "./style.module.scss";

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
                    <form className={style.loginForm}>
                        <input type="text" placeholder="Usuário" className={style.input} />
                        <input type="password" placeholder="Senha" className={style.input} />
                        <button type="submit" className={style.button}>Entrar</button>
                        <button type="submit" className={style.button}>Cadastre-se</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
