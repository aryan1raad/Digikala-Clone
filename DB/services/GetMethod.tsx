import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios";

const fetchProduct = async ( id: number | string ) => {
    const { data } = await axios.get(`http://localhost:3001/products/${id}`);
    return data
}

const fetchCart = async () => {
    const { data } = await axios.get('http://localhost:3001/cart');
    return data
}

const useGetProduct = ( id: number | string ) => {
    return useQuery({
        queryKey: ['product' , id], // آیدی باعث میشود در بین تمام کوئری های دیگر بازهم یکتا بماند
        queryFn: () => fetchProduct(id)
    })
}

const useGetCart = () => {
    return useQuery({
        queryKey: ['cartItems'],
        queryFn: () => fetchCart()
    })
}

export default useGetProduct
export {useGetCart}