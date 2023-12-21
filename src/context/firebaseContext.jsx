import { createContext } from "react";
import { useState } from "react";
import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { DATABASE } from "../config/firebaseConfig";

export const FireBaseContext = createContext()

export const FireBaseProvider = ({ children }) => {

    const [currentProduct, setCurrentProduct] = useState({})
    const [maxAdd, setMaxAdd] = useState(5)
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const objCollection = collection(DATABASE, 'products')

    const getProducts = async (category) => {
        setIsLoading(true)

        const allProducts = category ? query(objCollection, where('category', '==', category)) : query(objCollection)

        getDocs(allProducts)
            .then(result => {
                if (result.size <= 0) {
                    console.log('No existen productos!')
                }

                const arrProducts = result.docs.map(product => ({ id: product.id, ...product.data() }))
                setProducts(arrProducts)
                setIsLoading(false)
            })
    }

    const getProductById = (idProduct) => {
        setIsLoading(true)
        const objRef = doc(DATABASE, 'products', idProduct)
        getDoc(objRef)
            .then(result => {
                if (result.exists()) {
                    const product = {
                        id: result.id,
                        ...result.data()
                    }
                    setCurrentProduct(product)
                    setMaxAdd(product.stock)
                }
                setIsLoading(false)
            })

    }

    const getOrderById = async (idOrder) => {
        const objRef = doc(DATABASE, 'orders', idOrder)
        const objProd = await getDoc(objRef)
            .then(result => {
                if (result.exists()) {
                    const order = {
                        id: result.id,
                        ...result.data()
                    }
                    return order
                }
                return {}
            })
        return await objProd
    }

    const saveOrder = async (cartProducts, userData, total) => {

        const newOrder = {
            buyer: userData,
            items: cartProducts,
            data: serverTimestamp(),
            total
        }

        // addDoc(collection(DATABASE, "orders"), newOrder)

        try {
            const docRef = await addDoc(collection(DATABASE, "orders"), newOrder);

            const objCreated = await getDoc(docRef)
                .then(result => {
                    if (result.exists()) {
                        const product = {
                            id: result.id,
                            ...result.data()
                        }
                        return product
                    }
                })

            return await objCreated
        } catch (error) {
            console.error('Error al guardar el pedido:', error);
            throw error;
        }
    }

    const discountStock = async (objProduct, amount) => {

        const objRef = doc(DATABASE, "products", objProduct.id)
        const newStock = objProduct.stock - amount
        await updateDoc(objRef, { stock: newStock })

    }

    const objProvider = {
        isLoading,
        currentProduct, maxAdd, setMaxAdd,
        products, getProducts, getProductById, discountStock,
        saveOrder, getOrderById,
    }

    return <FireBaseContext.Provider value={objProvider}>
        {children}
    </FireBaseContext.Provider>
}