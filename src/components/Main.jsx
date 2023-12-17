import Content from './Content';
import NavBar from './NavBar';

const Main = () => {
    return (
        <div className='d-flex flex-column'>
            <NavBar/>
            <Content/>
        </div>
    );
}

export default Main;
