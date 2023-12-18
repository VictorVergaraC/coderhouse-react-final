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

        if (category) {
            const itemsCategory = query(objCollection, where('category', '==', category))
            const arrData = await getDocs(itemsCategory)
                .then(result => {
                    const arrProducts = result.docs.map(item => {
                        const product = {
                            id: item.id,
                            ...item.data()
                        }
                        return product
                    })
                    setProducts([...arrProducts])
                    setIsLoading(false)
                    return arrProducts
                })
                .catch(err => {
                    console.log(err)
                    setIsLoading(false)
                    return []
                })

            return
        }
        
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
                setIsLoading(false)
                return arrProducts
            })
            .catch(err => {
                console.log("Error en getDocs()...", err)
                setIsLoading(false)
                return []
            })

    }

    useEffect(() => {

        getProducts()

    }, [category]);

    return (
        <section className='d-flex flex-sm-wrap justify-content-center gap-3'>
            {
                isLoading ? (
                    <LoadingModal />
                ) : products.map(item => (
                    <Product key={item.id} {...item} />
                ))
            }
        </section>
    );
}

export default ProductsContainer;
