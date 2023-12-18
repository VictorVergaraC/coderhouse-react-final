import { useState } from "react";

const UseInputText = ({ id }) => {

    const [state, setState] = useState('');

    const handleChangeValue = evt => {
        const value = evt.target.value;
        setState(value);
    };

    return [id, state, handleChangeValue, setState];
};

export default UseInputText;