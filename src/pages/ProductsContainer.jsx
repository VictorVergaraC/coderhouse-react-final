import { useContext, useEffect, useState } from 'react';
import Product from '../components/Product';
import LoadingModal from '../components/LoadingModal';
import { useParams } from 'react-router-dom';
import { FireBaseContext } from '../context/firebaseContext';
import { CartContext } from '../context/cartContext';

const ProductsContainer = () => {

    const { category } = useParams()

    const { getProducts } = useContext(FireBaseContext)
    const { shoppingCart } = useContext(CartContext)

    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const handleLoadData = async () => {
        setIsLoading(true)
        const data = await getProducts(category)
        setIsLoading(false)
        setProducts(data)
    }

    useEffect(() => {
        handleLoadData()

    }, [category, shoppingCart]);

    return (
        <section className='d-flex flex-sm-wrap justify-content-center gap-3'>
            {
                isLoading ? (
                    <div className="mx-auto my-auto">
                        <LoadingModal />
                    </div>
                ) : products.length > 0 ?
                    products.map(item => (
                        <Product key={item.id} {...item} />
                    )) : (
                        <article className="alert alert-danger" role="alert">
                            No se encontraron productos!
                        </article>
                    )

            }
        </section>
    );
}

export default ProductsContainer;
