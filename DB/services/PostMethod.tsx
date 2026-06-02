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