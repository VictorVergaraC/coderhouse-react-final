import { useCount } from "../hooks/useCount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const Count = ({ init, min, max, handleDecrement, handleIncrement }) => {

    const { count, increment, decrement } = useCount(init, min, max)

    return (
        <aside className="d-flex gap-1 align-items-center">
            <button className="btn btn-sm btn-warning" onClick={decrement} >
                <FontAwesomeIcon icon={faMinus} />
            </button>
            <strong>{count}</strong>
            <button className="btn btn-sm btn-primary" onClick={increment}>
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </aside>
    );
}

export default Count;
