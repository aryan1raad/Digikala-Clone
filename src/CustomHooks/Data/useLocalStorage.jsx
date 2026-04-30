import React, { useEffect, useState } from 'react'
//هوک سفارشی برای لوکال استورج
const useLocalStorage = (key , initValue) => {
    const [state , setState] = useState(() => {
        try {
            const storedItem = localStorage.getItem(key);
            if (storedItem === null || storedItem === undefined)
                return initialValue
            return (JSON.parse(storedItem))

        } catch (error) {
            console.log(error);
            return initValue
        }
    })


    useEffect(() => {
        localStorage.setItem(key , JSON.stringify(state))
    } , [key, state])

    return [state , setState]
}

export default useLocalStorage