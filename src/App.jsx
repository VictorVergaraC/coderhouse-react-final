import { BrowserRouter } from "react-router-dom"
import Main from "./components/Main"
import { CartProvider } from "./context/cartContext"
import { FireBaseProvider } from "./context/firebaseContext"

function App() {

  return (
    <FireBaseProvider>
      <CartProvider>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </CartProvider>
    </FireBaseProvider>
  )
}

export default App
