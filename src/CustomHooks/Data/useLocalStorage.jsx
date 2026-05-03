import React, { useCallback, useEffect, useState } from 'react'
//هوک سفارشی برای لوکال استورج
const useLocalStorage = (key, initValue) => {
    const [state, setState] = useState(() => {
        try {
            const storedItem = localStorage.getItem(key);
            if (storedItem === null || storedItem === undefined)
                return initValue
            return (JSON.parse(storedItem))

        } catch (error) {
            console.log(error);
            return initValue
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state))
    }, [key, state])

    //حذف آیتم خاص
    const removeItem = useCallback((identifier) => {
        if (!Array.isArray(state)) {
            console.warn('فقط برای آرایه‌ها کار می‌کند');
            return;
        }
        if (typeof identifier === 'function') {
            const newState = state.filter(identifier);
            setState(newState);
        } else if (typeof identifier === 'object' && identifier !== null) {
            const newState = state.filter(item => {
                // حذف اگر تمام کلیدها مطابقت داشته باشند
                //خط کد زیر از AI
                return !Object.keys(identifier).every(key => item[key] === identifier[key]);
            });
            setState(newState);
        }
    }, [state]);

    const clearAll = useCallback(() => {
        setState(initValue);
    }, [initValue])

    return [state, setState, { removeItem, clearAll }]
}

export default useLocalStorage