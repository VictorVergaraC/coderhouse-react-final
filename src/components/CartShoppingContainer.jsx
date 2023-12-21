import { useContext } from "react";
import { CartContext } from "../context/cartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FireBaseContext } from "../context/firebaseContext";
import { showSimpleAlert } from "../assets/js/helpers";

const CartShoppingContainer = () => {

    const { shoppingCart, removeItem, totalPrice, resetCart } = useContext(CartContext)
    const { saveOrder } = useContext(FireBaseContext)

    const initialCredentials = { name: '', email: '' }
    const [credentials, setCredentials] = useState(initialCredentials)

    const navigate = useNavigate()

    const handleRemoveItem = (objProduct) => {

        Swal.fire({
            title: shoppingCart.length === 1 ? 'Su carrito quedará vacío!' : 'No podrá revertir esta acción!',
            text: "¿Seguro que desea quitar el producto del carrito?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, quitar!",
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                removeItem(objProduct)

                showSimpleAlert('success', 'Eliminado!', 'El producto ha sido removido del carrito.')
            }
        });

    }

    const handleCretendials = e => {
        const { name, value } = e.target
        setCredentials({
            ...credentials,
            [name]: value,
        })
    }

    const handleFinish = (evt) => {

        evt.preventDefault()

        saveOrder([...shoppingCart], credentials, totalPrice())
        showSimpleAlert('success', 'Pedido realizado!', 'Pronto nos contactaremos con usted!')

        const timer = setTimeout(() => {
            resetCart()
            navigate('/')
        }, 5000);


    }

    return (
        <main className='d-flex justify-content-center gap-3 my-3 p-3'>
            {
                shoppingCart.length > 0 ? (
                    <>
                        <section className="table-responsive p-3 border rounded">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th className="text-center">Descripción</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th>Sub-Total</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        shoppingCart.map(item => (
                                            <tr key={item.id} className="align-items-center">
                                                <td>
                                                    <Link to={`/producto/${item.id}`}>
                                                        <img src={item.img} alt={item.description} style={{ width: '70px', height: '90px' }} />
                                                    </Link>
                                                </td>
                                                <td className="text-center">
                                                    <Link to={`/producto/${item.id}`} className='link-body-emphasis link-offset-2 text-decoration-none'>
                                                        {item.description}
                                                    </Link>
                                                </td>
                                                <td>${item.price}</td>
                                                <td className="text-center">{item.amount}</td>
                                                <td>${item.price * item.amount}</td>
                                                <td className="text-center">
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => handleRemoveItem(item)}>
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td><strong>Total:</strong></td>
                                        <td>${totalPrice()}</td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </section>
                        <section className="d-flex flex-column p-3 border rounded">
                            <h5 className="text-center mb-3"><strong>Ingrese sus datos de contacto</strong></h5>

                            <form className="form" onSubmit={(evt) => evt.preventDefault()}>
                                <article className="mb-3">
                                    <label htmlFor='nombre_cliente' className="form-label">Nombre</label>
                                    <input id='nombre_cliente' name="name" type="text" className="form-control" onChange={handleCretendials} required />
                                </article>
                                <article className="mb-3">
                                    <label htmlFor='email_cliente' className="form-label">Email</label>
                                    <input id='email_cliente' name="email" type="email" className="form-control" onChange={handleCretendials} required />
                                </article>
                                <article className="d-flex gap-3 p-2 justify-content-end">
                                    <button className="btn btn-sm btn-secondary">Cancelar</button>
                                    <button className="btn btn-sm btn-success" onClick={handleFinish}>Finalizar Compra</button>
                                </article>
                            </form>
                        </section>
                    </>
                ) : (
                    <section className="justify-content-center align-items-center">
                        <article className="alert alert-primary" role="alert">
                            Su carrito se encuentra vacío.
                        </article>
                    </section>
                )
            }
        </main>
    );
}

export default CartShoppingContainer;
