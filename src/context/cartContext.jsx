import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { getLsItem, setLsItem } from "../assets/js/helpers";

const CartContext = createContext()

const initialShoppingCart = getLsItem('shopping-cart') || []

export const CartProvider = ({ children }) => {

    const [shoppingCart, setShoppingCart] = useState(initialShoppingCart)

    const addProduct = (objProduct, newAmount) => {

        const { id, description, image, price } = objProduct

        const newObject = { id, description, image, price, newAmount }

        let newShoppingCart = [...shoppingCart]

        const productExist = productInCart(objProduct)

        if (productExist) {
            const { id: idExist } = productExist

            const index = newShoppingCart.findIndex(product => product.id === idExist)

            newShoppingCart[index] = {
                ...newShoppingCart[index],
                amount: newShoppingCart[index].amount + newAmount
            }

            setShoppingCart([...newShoppingCart])

            return

        }

        setShoppingCart([...newShoppingCart, newObject])

    }

    const productInCart = objProduct => {

        const { id } = objProduct

        return shoppingCart.find(product => product.id === id)

    }

    useEffect(() => {

        setLsItem('shopping-cart', shoppingCart)

    }, [shoppingCart]);

    const objValues = {
        addProduct
    }

    return <CartContext.Provider value={objValues}>
        {children}
    </CartContext.Provider>
}
