import { useState } from "react"

export const useCount = (initial = 0, minimo, maximo) => {

    const [count, setCount] = useState(initial);

    const increment = () => setCount(count < maximo ? count + 1 : count)

    const decrement = () => setCount(count > minimo ? count - 1 : count) 

    const reset = () => setCount(0)

    return {
        count,
        increment,
        decrement,
        reset
    }
}