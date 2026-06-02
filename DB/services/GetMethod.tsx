import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios";

const fetchProduct = async ( id: number | string ) => {
    const { data } = await axios.get(`http://localhost:3001/products/${id}`);
    return data //یک محصول
}
const fetchProducts = async () => {
    const { data } = await axios.get("http://localhost:3001/products");
    return data; //محصولات
}
const fetchCart = async () => {
    const { data } = await axios.get('http://localhost:3001/cart');
    return data //سبد خرید بدون جزئیات
}

const useGetProduct = ( id: number | string ) => {
    return useQuery({
        queryKey: ['product' , id], // آیدی باعث میشود در بین تمام کوئری های دیگر بازهم یکتا بماند
        queryFn: () => fetchProduct(id)
    })
}
const useGetProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts
    });
}
const useGetCart = () => {
    return useQuery({
        queryKey: ['cartItems'],
        queryFn: () => fetchCart()
    })
}

// هوک های ترکیبی
const useGetCartWithDetails = () => {

    const { data: products } = useGetProducts();

    return useQuery({
        queryKey: ['cartItems'],
        queryFn: fetchCart,

        enabled: !!products,

        select: (cartItems) => {

            return cartItems.map(cartItem => {

                const fullProduct =
                    products?.find(
                        p =>
                            String(p.id) ===
                            String(cartItem.productId)
                    );

                return {
                    ...cartItem,
                    productDetails: fullProduct
                };
            });
        }
    });
}

export default useGetProduct
export {useGetCart , useGetCartWithDetails , useGetProducts}