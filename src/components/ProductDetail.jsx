import { useContext, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingModal from "./LoadingModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../context/cartContext";
import { showSimpleAlert } from "../assets/js/helpers";
import { FireBaseContext } from "../context/firebaseContext";

const ProductDetail = () => {

    const { id } = useParams()

    const { addProduct, shoppingCart } = useContext(CartContext)

    const { currentProduct: objProduct, maxAdd, setMaxAdd, getProductById: getProduct, isLoading } = useContext(FireBaseContext)

    const [currentStock, setCurrentStock] = useState('')

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

    useEffect(() => {

        if (Object.keys(objProduct).length > 0) {
            const { stock } = objProduct
            setCurrentStock(stock.toString())
        }

    }, [objProduct]);

    useEffect(() => {

        getProduct(id)

        const prodInCart = productInCart()
        if (prodInCart) {
            const { stock } = objProduct
            setMaxAdd(prodInCart ? (stock - prodInCart.amount) : stock)
        }

    }, [shoppingCart]);

    return (
        <section className='d-flex justify-content-center align-items-center p-3'>
            {
                isLoading ? (
                    <div className="mx-auto my-auto">
                        <LoadingModal />
                    </div>
                ) : (
                    <article className="d-flex flex-column border border-3 rounded-3 p-3">
                        <img className='mb-2 rounded' style={{ width: '300px', height: '350px' }} src={objProduct.img} alt={objProduct.description} />
                        <h4 className="text-center mb-2">{objProduct.description}</h4>
                        <h5 className="mb-2">${objProduct.price}</h5>
                        {
                            currentStock.length > 0 ? (
                                <p className="mb-2">Unidades disponibles: {currentStock}</p>
                            ) : null
                        }
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
