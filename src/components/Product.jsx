import { useContext } from "react";
import { CartContext } from "../context/cartContext";
import { Link } from "react-router-dom";
import { showSimpleAlert } from "../assets/js/helpers";

const Product = ({ id, description, name, img, price, stock }) => {

    const { addProduct } = useContext(CartContext)

    const handleAppend = () => {
        const product = { id, description, name, img, price, stock };
        addProduct(product, 1)
        showSimpleAlert('success', 'Producto agregado!', 'Puede revisar el detalle en su carrito.')
    }

    return (
        <article className='d-flex flex-column border border-3 rounded-3 p-3'>
            <Link to={`/producto/${id}`} className="link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover mb-3">
                <h6>{description}</h6>
            </Link>
            <Link to={`/producto/${id}`}>
                <img className='mb-3 rounded mb-3' style={{ width: '150px', height: '200px' }} src={img} alt={description} />
            </Link>
            <h5 className="mb-3">${price}</h5>
            <button
                className={`btn btn-sm btn-success`}
                onClick={handleAppend}
                disabled={stock <= 0}
            >
                Agregar
            </button>
        </article>
    );
}

export default Product;
