import type { Product } from "./product";
import type { Dispatch, SetStateAction } from "react";

export interface UserType {
    isAuthorized: boolean;
    userName: string | null;
    numOrMail?: string | null;
}
export interface ProductContextType {
    product: Product | null;
    setProduct: Dispatch<SetStateAction<Product | null>>;
    items: Product[];
    user: UserType;
    setUser: Dispatch<SetStateAction<UserType>>;
}