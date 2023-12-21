import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LoadingModal from './LoadingModal';
import { FireBaseContext } from '../context/firebaseContext';

const OrderDetail = () => {

    const { getOrderById } = useContext(FireBaseContext)
    const { id } = useParams()
    const [objOrder, setObjOrder] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const getOrder = async () => {
        setIsLoading(true)

        const response = await getOrderById(id)
            .then(result => {
                console.log(result)
                setObjOrder(result)
                setIsLoading(false)
            })

    }

    useEffect(() => {

        getOrder()

    }, []);

    return (
        <main className='d-flex flex-column justify-content-center align-items-center p-3'>
            {
                isLoading ? (
                    <div className='mx-auto my-auto'>
                        <LoadingModal />
                    </div>
                ) : (
                    <div className='container'>
                        <div className="jumbotron text-center">
                            <h1 className="display-4 text-success">¡Compra realizada exitosamente!</h1>
                            <p className="lead">Gracias por tu compra. Aquí tienes los detalles de tu pedido:</p>
                            <hr className="my-4" />

                            <aside className='container'>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th className="text-center">Descripción</th>
                                            <th>Precio</th>
                                            <th>Cantidad</th>
                                            <th>Sub-Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            objOrder.items.map((item, index) => (
                                                <tr key={index}>
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
                                            <td><strong>${objOrder.total}</strong></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </aside>

                            <p>Recibirás un correo electrónico de confirmación con más detalles. Si tienes alguna pregunta, no dudes en contactarnos.</p>
                            <p className="lead">
                                {/* <a className="btn btn-primary btn-lg" href="../index.html" role="button">Volver a la tienda</a> */}
                                <Link to={'/'} className='btn btn-primary btn-lg'>
                                    Volver a la tienda
                                </Link>
                            </p>
                        </div>
                    </div>
                )
            }
        </main >
    );
}

export default OrderDetail;
