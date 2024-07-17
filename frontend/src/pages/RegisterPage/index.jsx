import { Footer } from "../../components/Footer"
import { Header } from "../../components/Header"
import { InitialRegister } from "../../components/InitialRegister"

export const RegisterPage = () => {
    return (
        <body>
            <Header />
            <main>
                <InitialRegister />
            </main>
            <Footer />
        </body>
    )
}