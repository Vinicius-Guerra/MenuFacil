import { ToastContainer } from "react-toastify";
import { RoutesMain } from "./routes"
import "react-toastify/dist/ReactToastify.css";
import "./styles/index.scss";

function App() {
  return (
    <>
      <RoutesMain />
      <ToastContainer />
    </>
  )
}

export default App
