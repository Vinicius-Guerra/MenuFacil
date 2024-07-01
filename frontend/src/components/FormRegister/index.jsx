import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formRegisterSchema } from "./formRegisterSchema";
import { Input } from "../Input";
import style from "./style.module.scss";
import { useRestaurantContext } from "../../providers/RestaurantContext";

export const FormRegister = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(formRegisterSchema)
    });

    const  { restaurantRegister } = useRestaurantContext()

    const onSubmit = (payload) => {
        restaurantRegister(payload)
    };

    return (
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
            <Input label="Nome" type="text" placeholder="Nome do seu estabelecimento" error={errors.name} {...register("name")} />
            <Input label="Email" type="email" placeholder="E-mail do seu estabelecimento" error={errors.email} {...register("email")} />
            <Input label="Senha" type="password" placeholder="Digite aqui sua senha" error={errors.password} {...register("password")} />
            <Input label="Confirmar senha" type="password" placeholder="Digite aqui sua senha" error={errors.confirmPassword} {...register("confirmPassword")} />
            <Input label="Descrição" type="text" placeholder="Digite sua descrição" {...register("description")} />
            <button type="submit" className={style.button}>Cadastrar</button>
        </form>
    );
};