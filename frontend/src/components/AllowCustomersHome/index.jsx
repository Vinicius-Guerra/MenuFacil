import mockup from "../../assets/mockup4.png";
import style from "./style.module.scss";

export const AllowCustomersHome = () => {
    return (
        <section className={style.allowCustomers}>
            <h2 className={style.title}>
                Permita que seus usuários tenham acesso ao seu cardápio de maneira interativa.
            </h2>
            <div className={style.imageContainer}>
                <ul>
                    <li>
                        <p>Cadastre suas receitas por categoria</p>
                    </li>
                    <li>
                        <p>Crie suas proprias categorias.</p>
                    </li>
                    <li>
                        <p>Compartilhe seu menu nas redes sociais.</p>
                    </li>
                    <li>
                        <p>Evite longos cardápios em suas mesas.</p>
                    </li>
                    <li>
                        <p>Acesso fácil através do seu WhatsApp.</p>
                    </li>
                    <li>
                        <p>Ganhe tempo e surpreenda seus clientes.</p>
                    </li>
                </ul>
                <figure>
                    <img src={mockup} alt="imagem vetorizada de personagem mechendo em um telefone gigante com menu aberto." className={style.image__container} />
                </figure>
            </div>
        </section>
    )
}
