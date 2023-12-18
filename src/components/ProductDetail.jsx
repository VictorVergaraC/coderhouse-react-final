import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingModal from "./LoadingModal";
import { DATABASE } from "../config/firebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";

const ProductDetail = () => {

    const { id } = useParams()

    const [isLoading, setIsLoading] = useState(true)
    const [objProduct, setObjProduct] = useState({});

    // Quizás no es lo más óptimo, pero tuve que traer todos los productos y luego filtrar,
    // debido a que no me funcionaba con: `const docProduct = query(objCollection, where('id', '==', id))`
    // no me traía ningún registro.

    const getProduct = async () => {

        const objCollection = collection(DATABASE, 'products')
        const docProduct = query(objCollection)

        try {
            const objData = await getDocs(docProduct)
            const productData = objData.docs.map(doc => {
                const product = {
                    id: doc.id,
                    ...doc.data()
                }

                return product
            })
            const object = productData.find(product => product.id === id)

            setObjProduct(object)

            setIsLoading(false)
        } catch (error) {
            console.error("Error fetching product:", error)
            return null
        }
    }

    useEffect(() => {

        getProduct()

    }, []);

    return (
        <section className='d-flex justify-content-center align-items-center p-3'>
            {
                isLoading ? (
                    <LoadingModal />
                ) : (
                    <article className="d-flex flex-column border border-3 rounded-3 p-3">
                        <img className='mb-3 rounded' style={{ width: '300px', height: '350px' }} src={objProduct.img} alt={objProduct.description} />
                        <h4 className="text-center mb-3">{objProduct.description}</h4>
                        <h5 className="mb-3">${objProduct.price}</h5>
                        <p className="mb-3">Unidades disponibles: {objProduct.stock}</p>
                    </article>
                )
            }
        </section>
    );
}

export default ProductDetail;
