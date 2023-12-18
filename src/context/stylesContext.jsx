import { useState } from "react";
import { createContext } from "react";

export const StylesContext = createContext()

export const StylesProvider = ({ children }) => {

    const [showingModal, setShowingModal] = useState(false)

    const handleShowModal = (value) => setShowingModal(value)

    const objValues = {
        showingModal, handleShowModal
    }

    return (
        <StylesContext.Provider value={objValues}>
            {children}
        </StylesContext.Provider>
    )
}