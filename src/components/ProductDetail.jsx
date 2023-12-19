import { useContext, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingModal from "./LoadingModal";
import { DATABASE } from "../config/firebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../context/cartContext";
import { showSimpleAlert } from "../assets/js/helpers";

const ProductDetail = () => {

    const { id } = useParams()

    const { addProduct, shoppingCart } = useContext(CartContext)

    const [isLoading, setIsLoading] = useState(true)
    const [objProduct, setObjProduct] = useState({})

    const [maxAdd, setMaxAdd] = useState(5)
    const [count, setCount] = useState(0)

    const increment = () => setCount(count < maxAdd ? count + 1 : count)
    const decrement = () => setCount(count > 0 ? count - 1 : count)
    const reset = () => setCount(0)

    const handleAddProduct = () => {
        if (count > 0) {

            addProduct(objProduct, count)
            reset()
            showSimpleAlert('success', 'Producto Agregado!', 'Puede revisar el detalle haciendo click en el ícono del carrito!')
        }

    }

    const productInCart = () => shoppingCart.find(prod => prod.id === id)

    // Quizás no es lo más óptimo, pero tuve que traer todos los productos y luego filtrar,
    // debido a que no me funcionaba con: `const docProduct = query(objCollection, where('id', '==', id))`
    // no me traía ningún registro.

    const getProduct = async () => {

        const objCollection = collection(DATABASE, 'products')
        const docProduct = query(objCollection)

        try {
            const objData = await getDocs(docProduct)
            const productData = objData.docs.map(doc => {
                const product = {
                    id: doc.id,
                    ...doc.data()
                }

                return product
            })
            const object = productData.find(product => product.id === id)

            setObjProduct(object)
            setIsLoading(false)

        } catch (error) {
            console.error("Error fetching product:", error)
        }
    }


    // useEffect implementado para impedir que el usuario agregue más cantidad que el stock
    useEffect(() => {

        const prodInCart = productInCart()
        if (prodInCart) {
            const { stock } = objProduct
            setMaxAdd(prodInCart ? (stock - prodInCart.amount) : stock)
        }

    }, [shoppingCart]);

    useEffect(() => {

        getProduct()

    }, []);

    return (
        <section className='d-flex justify-content-center align-items-center p-3'>
            {
                isLoading ? (
                    <LoadingModal />
                ) : (
                    <article className="d-flex flex-column border border-3 rounded-3 p-3">
                        <img className='mb-2 rounded' style={{ width: '300px', height: '350px' }} src={objProduct.img} alt={objProduct.description} />
                        <h4 className="text-center mb-2">{objProduct.description}</h4>
                        <h5 className="mb-2">${objProduct.price}</h5>
                        <p className="mb-2">Unidades disponibles: {objProduct.stock}</p>
                        {
                            productInCart() ? (
                                <p className="mb-2">Usted ya lleva {productInCart().amount} {productInCart().amount > 1 ? 'unidades' : 'unidad'}</p>
                            ) : null
                        }
                        <section className="d-flex flex-column justify-content-center">
                            <aside className="d-flex justify-content-center align-items-center gap-2 mb-2">
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={decrement}
                                    disabled={maxAdd === 0}
                                >
                                    <FontAwesomeIcon icon={faMinus} />
                                </button>
                                <span>{count}</span>
                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={increment}
                                    disabled={maxAdd === 0}
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </aside>
                            <button
                                className="btn btn-sm btn-success"
                                onClick={handleAddProduct}
                                disabled={maxAdd === 0}
                            >
                                Agregar
                            </button>
                        </section>
                    </article>
                )
            }
        </section>
    );
}

export default ProductDetail;
