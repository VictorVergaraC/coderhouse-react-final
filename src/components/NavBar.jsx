import { Link } from 'react-router-dom';
import CartShopping from './CartShopping';
import useHoverStyles from '../hooks/useHoverStyles';

const NavBar = () => {

    const [homeStyles, handleHoverHome, handleHoverOutHome] = useHoverStyles("#edf0f1", "#0088a9");
    const [ropaStyles, handleHoverRopa, handleHoverOutRopa] = useHoverStyles("#edf0f1", "#0088a9");
    const [calzadoStyles, handleHoverCalzado, handleHoverOutCalzado] = useHoverStyles("#edf0f1", "#0088a9");
    const [otrosStyles, handleHoverOtros, handleHoverOutOtros] = useHoverStyles("#edf0f1", "#0088a9");

    return (
        <section className='d-flex justify-content-between mb-3 bg-dark align-items-center text-white p-3'>
            <article>
                <Link
                    to={'/'}
                    className='text-decoration-none'
                    style={homeStyles}
                    onMouseOver={handleHoverHome}
                    onMouseOut={handleHoverOutHome}
                >
                    <h3>Mi Tienda</h3>
                </Link>
            </article>
            <article className='d-flex justify-content-between gap-5'>
                <Link
                    to={'/categoria/ropa'}
                    className='text-decoration-none'
                    style={ropaStyles}
                    onMouseOver={handleHoverRopa}
                    onMouseOut={handleHoverOutRopa}
                >
                    <h5>Ropa</h5>
                </Link>
                <Link
                    to={'/categoria/calzado'}
                    className='text-decoration-none'
                    style={calzadoStyles}
                    onMouseOver={handleHoverCalzado}
                    onMouseOut={handleHoverOutCalzado}
                >
                    <h5>Zapatos</h5>
                </Link>
                <Link
                    to={'/categoria/otros'}
                    className='text-decoration-none'
                    style={otrosStyles}
                    onMouseOver={handleHoverOtros}
                    onMouseOut={handleHoverOutOtros}
                >
                    <h5>Otros</h5>
                </Link>
            </article>
            <article>
                <CartShopping />
            </article>
        </section>
    );
}

export default NavBar;
