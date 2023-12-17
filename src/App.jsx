import Main from "./components/Main"
import { CartProvider } from "./context/cartContext"

function App() {

  return (
    <CartProvider>
      <Main/>
    </CartProvider>
  )
}

export default App
