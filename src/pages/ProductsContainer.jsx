import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore'
import { DATABASE } from '../config/firebaseConfig';
import Product from '../components/Product';
import LoadingModal from '../components/LoadingModal';
import { useParams } from 'react-router-dom';

const ProductsContainer = () => {

    const { category } = useParams()

    const [products, setProducts] = useState([]);

    const [isLoading, setIsLoading] = useState(true)

    const getProducts = async () => {

        setIsLoading(true)
        const objCollection = collection(DATABASE, 'products')

        const itemsProducts = category ? query(objCollection, where('category', '==', category)) : query(objCollection)
        const arrData = await getDocs(itemsProducts)
            .then(result => {
                const arrProducts = result.docs.map(item => {
                    const product = {
                        id: item.id,
                        ...item.data()
                    }
                    return product
                })
                return arrProducts
            })
            .catch(err => {
                console.log(err)
                return []
            })

        setProducts(await arrData)
        setIsLoading(false)

    }

    useEffect(() => {

        getProducts()

    }, [category]);

    return (
        <section className='d-flex flex-sm-wrap justify-content-center gap-3'>
            {
                isLoading ? (
                    <LoadingModal />
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
