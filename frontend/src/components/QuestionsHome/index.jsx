import { useState } from "react";
import style from "./style.module.scss";

export const QuestionsHome = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const questions = [
        {
            question: "O Menu Fácil serve apenas para restaurantes?",
            answer: "Não! O Menu Fácil serve para qualquer estabelecimento que recebe pedidos on-line ou presencial, pedidos na mesa ou encomendas, por exemplo, hamburguerias, pizzarias, panificadoras, confeitarias, sorveterias, encomendas de bolos, doces e salgados para festas e muitos outros."
        },
        {
            question: "Como funciona o cardápio online?",
            answer: "O cardápio online é a versão digital do seu cardápio físico, com a diferença de que seus clientes poderão acessá-lo de onde estiverem e quando quiserem, com informações e preços sempre atualizados. Você poderá compartilhar seu cardápio pelo Whatsapp, colocar na Bio do Instagram e também gerar o QRCode para seus clientes acessarem nas mesas."
        },
        {
            question: "Como criar o cardápio para meu estabelecimento?",
            answer: "Depois que você cadastrar seu estabelecimento, poderá começar adicionar os itens no seu cardápio imediatamente."
        },
        {
            question: "Dá para receber pedidos pelo Menu Fácil?",
            answer: "O Cardapiando não é um sistema de pedidos. Ele oferece uma versão digital do seu cardápio físico, simples de usar. Com isso você evita aquelas famosas desculpas do “ahhh, ainda não atualizamos nosso cardápio”. “ahhh… esse item está em falta” ou “ahhh... o preço mudou”. Nenhum cliente gosta disso, não é?"
        },
        {
            question: "Quanto custa?",
            answer: "O MenuFácil é um projeto 100% Gratuito."
        }
    ];

    return (
        <section className={style.questionsHome}>
            <h2 className={style.title}>Perguntas frequentes</h2>
            <div className={style.container}>
                <ul className={style.questionList}>
                    {questions.map((item, index) => (
                        <li
                            key={index}
                            className={`${style.card} ${activeIndex === index ? style.active : ""}`}
                            onClick={() => toggleAnswer(index)}
                        >
                            <h4 className={style.questionTitle}>{item.question}</h4>
                            <p className={style.answer}>{item.answer}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};
