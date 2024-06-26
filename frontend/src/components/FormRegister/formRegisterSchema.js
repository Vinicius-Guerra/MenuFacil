import { z } from "zod";

const formRegisterSchema = z.object({
    name: z.string().min(1, "Nome do estabelecimento é obrigatório."),
    description: z.string().optional().nullable(),
    email: z.string().min(1, "Este campo é obrigatório.").email("Forneça um e-mail válido."),
    password: z
        .string()
        .min(8, "É necessário pelo menos 8 caracteres.")
        .regex(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+{}[\]:;<>,.?~-]).*$/,
            "Senha inválida"
        ),
    confirmPassword: z.string().min(1, "Confirmar a senha é obrigatório"),
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "As senhas não correspondem",
    path: ["confirmPassword"],
});

export { formRegisterSchema };
