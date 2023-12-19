import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { getLsItem, setLsItem } from "../assets/js/helpers";

export const CartContext = createContext()

const initialShoppingCart = getLsItem('shopping-cart') || []

export const CartProvider = ({ children }) => {

    const [shoppingCart, setShoppingCart] = useState(initialShoppingCart)

    const addProduct = (objProduct, newAmount) => {
        const { id, description, img, price, stock } = objProduct
        const newObject = { id, description, img, price, amount: newAmount, stock }

        let newShoppingCart = [...shoppingCart]

        const productExist = productInCart(objProduct)

        if (productExist) {
            const { id: idExist } = productExist

            const index = newShoppingCart.findIndex(product => product.id === idExist)

            newShoppingCart[index] = {
                ...newShoppingCart[index],
                amount: newShoppingCart[index].amount + newAmount <= stock ? newShoppingCart[index].amount + newAmount : newShoppingCart[index].amount,
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

    const removeItem = (objProduct) => {
        const { id } = objProduct
        const newShoppingCart = shoppingCart.filter(product => product.id !== id)
        setShoppingCart([...newShoppingCart])
    }

    const itemsInCart = () => shoppingCart.reduce((acc, prod) => acc + prod.amount, 0)

    const totalPrice = () => shoppingCart.reduce((acc, prod) => acc + prod.price * prod.amount, 0)

    useEffect(() => {

        setLsItem('shopping-cart', shoppingCart)

    }, [shoppingCart]);

    const objValues = {
        addProduct, removeItem, itemsInCart, totalPrice, shoppingCart
    }

    return (
        <CartContext.Provider value={objValues}>
            {children}
        </CartContext.Provider>
    )
}
