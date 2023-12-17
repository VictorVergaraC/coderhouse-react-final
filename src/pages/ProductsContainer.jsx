import { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore'
import { DATABASE } from '../config/firebaseConfig';
import Product from '../components/Product';
import LoadingModal from '../components/LoadingModal';

const ProductsContainer = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        const allProducts = query(collection(DATABASE, "products"))
        getDocs(allProducts)
            .then(result => {
                const arrProducts = result.docs.map(item => {
                    const product = {
                        id: item.id,
                        ...item.data()
                    }
                    return product
                })
                setProducts([...arrProducts])

                return arrProducts
            })
            .catch(err => {
                console.log("Error en getDocs()...", err)
                return []
            })


    }, []);

    return (
        <section className='d-flex flex-sm-wrap justify-content-center gap-3'>
            {
                products.length > 0 ?
                    products.map(item => (
                        <Product key={item.id} {...item} />
                    ))
                : (
                    <LoadingModal/>
                )
            }
        </section>
    );
}

export default ProductsContainer;
