import { BrowserRouter } from "react-router-dom"
import Main from "./components/Main"
import { CartProvider } from "./context/cartContext"
import { StylesProvider } from "./context/stylesContext"

function App() {

  return (
    <CartProvider>
      <StylesProvider>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </StylesProvider>
    </CartProvider>
  )
}

export default App
