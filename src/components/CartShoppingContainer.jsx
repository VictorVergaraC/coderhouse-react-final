import { useContext, useEffect } from "react";
import { CartContext } from "../context/cartContext";

const CartShoppingContainer = () => {

    const { shoppingCart } = useContext(CartContext)

    useEffect(() => {
        
        console.table(shoppingCart);

    }, []);

    return (
        <main className='d-flex my-3 p-3'>

        </main>
    );
}

export default CartShoppingContainer;
