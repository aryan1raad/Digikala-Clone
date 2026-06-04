import type { Product } from "./product";
import type { Dispatch, SetStateAction } from "react";

export interface UserType {
    isAuthorized: boolean;
    userName: string | null;
    numOrMail?: string | null;
}
export interface ProductContextType {
    //پروداکت و ست پروداکت برای لوکال استورج می باشند
    //وجودشان بی مصرف است
    // product: Product | null;
    // setProduct: Dispatch<SetStateAction<Product | null>>;
    items?: Product[]; //درکامپوننت اپ یکبار بدون آیتمز فرستاده ایم
    user: UserType;
    setUser: Dispatch<SetStateAction<UserType>>;
}