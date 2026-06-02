import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios";

export const useAddToCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ productId, color }: { productId: number | string; color: string }) => {

            //کل لیست
            const { data: cartItems } = await axios.get(`http://localhost:3001/cart`);

            // استرینگ برای عدم تداخل دیتا تایپ ها
            const existingItem = cartItems.find((item: any) =>
                String(item.productId) === String(productId) && item.color === color
            );

            if (existingItem) {
                const res = await axios.patch(`http://localhost:3001/cart/${existingItem.id}`, {
                    quantity: existingItem.quantity + 1
                });
                return res.data;
            } else {
                const res = await axios.post(`http://localhost:3001/cart`, {
                    productId: String(productId),
                    color: color,
                    quantity: 1
                });
                return res.data;
            }
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cartItems'] });
        }
    })
}

export const useSubFromCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ productId, color }: { productId: number | string; color: string }) => {
            const { data: cartItems } = await axios.get('http://localhost:3001/cart');

            const existingItem = cartItems.find((item: any) =>
                String(item.productId) === String(productId) && item.color === color
            );            
            console.log('existingItem', existingItem, 'productId' , productId , 'color' , color)
            if (existingItem && existingItem.quantity > 1 ) {
                const res = await axios.patch(`http://localhost:3001/cart/${existingItem.id}`, {
                    quantity: existingItem.quantity - 1
                })
                return res.data
            } else if (existingItem && existingItem.quantity === 1 ) {
                const res = await axios.delete(`http://localhost:3001/cart/${existingItem.id}`);
                return res.data
            }
            else console.warn('این محصول انتخاب نشده است که تعدادش کم شود')
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cartItems'] })
        }
    })
}