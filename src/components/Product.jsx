import { useContext } from "react";
import { CartContext } from "../context/cartContext";

const Product = ({ id, description, name, img, price }) => {

    const { addProduct } = useContext(CartContext)

    const handleAppend = () => {
        const product = { id, description, name, img, price };
        addProduct(product, 1)
    }

    return (
        <article className='d-flex flex-column border border-3 rounded-3 p-3'>
            <h6 className='mb-3'>{description}</h6>
            <img className='mb-3 rounded mb-3' style={{ width: '150px', height: '200px' }} src={img} alt={description} />
            <h5>${price}</h5>
            <button className='btn btn-sm btn-success' onClick={handleAppend}>Agregar</button>
        </article>
    );
}

export default Product;
