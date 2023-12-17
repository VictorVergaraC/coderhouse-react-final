import React from 'react';

const NavBar = () => {
    return (
        <section className='d-flex justify-content-between mb-3 bg-dark align-items-center text-white p-3'>
            <article>
                <h3>Mi Tienda</h3>
            </article>
            <article className='d-flex justify-content-between gap-5'>
                <h5>Productos</h5>
                <h5>Ofertas</h5>
                <h5>Nosotros</h5>
            </article>
            <article>
                <h5>Carrito</h5>
            </article>
        </section>
    );
}

export default NavBar;
