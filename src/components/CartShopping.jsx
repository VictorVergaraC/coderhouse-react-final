import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { CartContext } from "../context/cartContext";
import { Link } from "react-router-dom";

const CartShopping = () => {
    const { itemsInCart } = useContext(CartContext);

    return (
        <>
            <Link to={'/carrito'} className="btn btn-primary position-relative">

                <FontAwesomeIcon icon={faCartShopping} />
                <span className="badge badge-danger position-absolute top-0 start-100 translate-middle rounded-circle" style={{ zIndex: 1, transform: 'translate(-50%, -50%)' }}>{itemsInCart()}</span>

            </Link>
        </>
    );
};

export default CartShopping;
