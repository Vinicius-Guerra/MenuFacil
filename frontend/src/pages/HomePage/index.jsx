import { AllowCustomersHome } from "../../components/AllowCustomersHome"
import { ForWhin } from "../../components/ForWhin"
import { Header } from "../../components/Header"
import { InitialHome } from "../../components/InitialHome"
import { UseMenu } from "../../components/UseMenu"

export const HomePage = () => {
    return (
        <body>
            <Header />
            <main>
                <InitialHome />
                <AllowCustomersHome />
                <UseMenu />
                <ForWhin />
            </main>
        </body>
    )
}