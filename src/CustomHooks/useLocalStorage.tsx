import React, { useCallback, useEffect, useState } from 'react';

type RemoveItemPredicate<T> = (item: T) => boolean;
type RemoveItemFilter<T> = Partial<T>;

interface UseLocalStorageReturn<T> {
    state: T;
    setState: React.Dispatch<React.SetStateAction<T>>;
    actions: {
        removeItem: (identifier: RemoveItemPredicate<T> | RemoveItemFilter<T>) => void;
        clearAll: () => void;
    };
}
//این بخش فقط برای ثبت نام و ذخیره یوزر کار میکند
const useLocalStorage = <T,>(
    key: string,
    initValue: T
): UseLocalStorageReturn<T> => {
    const [state, setState] = useState<T>(() => {
        try {
            const storedItem = localStorage.getItem(key);
            if (storedItem === null || storedItem === undefined)
                return initValue;
            return JSON.parse(storedItem) as T;
        } catch (error) {
            console.error(error);
            return initValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    const removeItem = useCallback(
        (identifier: RemoveItemPredicate<T> | RemoveItemFilter<T>) => {
            // فقط در صورتی کار می‌کند که state یک آرایه باشد
            if (!Array.isArray(state)) {
                console.warn('فقط برای آرایه‌ها کار می‌کند');
                return;
            }

            // برای راحتی TypeScript، state را به آرایه‌ای از any تبدیل می‌کنیم
            const stateArray = state as any[];

            if (typeof identifier === 'function') {
                const newState = stateArray.filter(identifier);
                setState(newState as T);
            } 
            else if (typeof identifier === 'object' && identifier !== null) {
                const newState = stateArray.filter((item: any) => {
                    return !Object.keys(identifier).every((key) => {
                        const typedKey = key as keyof T; // کلید معتبر از نوع T
                        return item[typedKey] === identifier[typedKey];
                    });
                });
                setState(newState as T);
            }
        },
        [state]
    );

    const clearAll = useCallback(() => {
        setState(initValue);
    }, [initValue]);

    return {
        state,
        setState,
        actions: { removeItem, clearAll }
    };
};

export default useLocalStorage;