import { BrowserRouter } from "react-router-dom"
import Main from "./components/Main"
import { CartProvider } from "./context/cartContext"

function App() {

  return (
    <CartProvider>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
