import { useRef } from "react"
import { AllowCustomersHome } from "../../components/AllowCustomersHome"
import { Footer } from "../../components/Footer"
import { ForWhin } from "../../components/ForWhin"
import { Header } from "../../components/Header"
import { InitialHome } from "../../components/InitialHome"
import { QuestionsHome } from "../../components/QuestionsHome"
import { RegisterNowHome } from "../../components/RegisterNowHome"
import { UseMenu } from "../../components/UseMenu"

export const HomePage = () => {
    return (
        <body>
            <Header />
            <main>
                <div id="initialHome">
                    <InitialHome />
                </div>
                <AllowCustomersHome />
                <UseMenu />
                <div id="forWhin">
                    <ForWhin />
                </div>
                <QuestionsHome />
                <RegisterNowHome />
            </main>
            <Footer />
        </body>
    )
}