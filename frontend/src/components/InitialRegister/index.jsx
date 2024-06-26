import { FormRegister } from "../FormRegister";
import style from "./style.module.scss";

export const InitialRegister = () => {
    return (
        <section className={style.section}>
            <div className={style.container}>
                <h1>Crie sua conta Menu Fácil!</h1>
                <div className={style.info}>
                    <p>Use instantaneamente</p>
                    <p>Totalmente Grátis</p>
                </div>
                <div className={style.formContainer}>
                    <FormRegister />
                </div>
            </div>
            <div>
                <img src="" alt="" />
            </div>
        </section>
    );
};
