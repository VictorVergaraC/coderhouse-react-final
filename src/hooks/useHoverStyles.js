import { useState } from 'react';

const useHoverStyles = (initialColor, hoverColor) => {
    const [styles, setStyles] = useState({
        color: initialColor,
        transition: 'color 0.3s ease',
    });

    const handleHover = () => {
        setStyles({
            ...styles,
            color: hoverColor,
        });
    };

    const handleHoverOut = () => {
        setStyles({
            ...styles,
            color: initialColor,
        });
    };

    return [styles, handleHover, handleHoverOut];
};

export default useHoverStyles;