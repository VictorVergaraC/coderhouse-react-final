import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {

    useEffect(() => {
        
        document.title = "404 - Página no encontrada"

        return () => {
            document.title = "Fake eCommerce"  
        };
    }, []);

    return (
        <main className='container'>
            <article className='d-flex flex-column justify-content-center align-items-center'>
                <img
                    className='mb-3 p-5'
                    src="https://i.imgur.com/qIufhof.png"
                    alt="404 Not Found"
                    style={{ maxWidth: '350px' }}
                />
                <h2 className="text-danger mb-3">Oops! Página no encontrada</h2>
                <p className="lead mb-3">Lo sentimos, la página que estás buscando no existe.</p>
                <Link to="/" className="btn btn-primary mb-3">
                    Ir a la página principal
                </Link>
            </article>
        </main>
    );
}

export default NotFound;
