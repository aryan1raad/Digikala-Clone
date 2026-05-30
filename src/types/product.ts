export interface ProductProperty {
    top: string;
    bottom: string;
}

export interface Product {
    img: string;
    title: string;
    prevPrice?: string;
    //چیزی که قرار است دیده شود
    price: string;
    percent?: number;
    priceNumber: number;
    id: number;
    colors: string[];
    properties: ProductProperty[];
    rate: number;
    //بعضی از محصولات فعلا کتگوری ندارند
    category?: string;
    // برای استوری
    video?: string;
    productImg?: string;
    textContent?: string;
}

export type Products = Product[];