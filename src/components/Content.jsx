import { Route, Routes } from 'react-router-dom';
import ProductsContainer from '../pages/ProductsContainer';
import CartShoppingContainer from './CartShoppingContainer';
import ProductDetail from './ProductDetail';

const Content = () => {
    return (
        <main className='container'>
            <Routes>
                <Route path='/' element={<ProductsContainer/>} />
                <Route path='/categoria/:category' element={<ProductsContainer/>} />
                <Route path='/producto/:id' element={<ProductDetail/>} />
                <Route path='/carrito' element={<CartShoppingContainer/>} />
            </Routes>
            
        </main>
    );
}

export default Content;
