import { create } from 'zustand';

export interface CartItem {
    productId: string | number;
    color: string;
    quantity: number;
    productDetails: {
        id: string | number;
        title: string;
        img: string;
        priceNumber: number;
    };
}

interface CartStore {
    items: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (productId: string | number, color: string) => void;
    increaseQuantity: (productId: string | number, color: string) => void;
    decreaseQuantity: (productId: string | number, color: string) => void;
    clearCart: () => void;
    setCartItems: (items: CartItem[]) => void;

    getTotalPrice: () => number;
    getTotalQuantity: () => number;
    getCartItems: () => CartItem[];
}

export const useCartStore = create<CartStore>()((set, get) => ({

    items: [],

    addToCart: (item: CartItem) => {
        set((state) => {
            const existingItem = state.items.find(
                (i) => i.productId === item.productId && i.color === item.color
            );

            if (existingItem) {
                return {
                    items: state.items.map((i) =>
                        i.productId === item.productId && i.color === item.color
                            ? { ...i, quantity: i.quantity + 1 }
                            : i
                    ),
                };
            }

            return {
                items: [...state.items, { ...item, quantity: 1 }],
            };
        });
    },

    removeFromCart: (productId: string | number, color: string) => {
        set((state) => ({
            items: state.items.filter(
                (i) => !(i.productId === productId && i.color === color)
            ),
        }));
    },

    increaseQuantity: (productId: string | number, color: string) => {
        set((state) => ({
            items: state.items.map((i) =>
                i.productId === productId && i.color === color
                    ? { ...i, quantity: i.quantity + 1 }
                    : i
            ),
        }));
    },

    decreaseQuantity: (productId: string | number, color: string) => {
        set((state) => {
            const updatedItems = state.items.map((i) =>
                i.productId === productId && i.color === color
                    ? { ...i, quantity: Math.max(0, i.quantity - 1) }
                    : i
            );

            return {
                items: updatedItems.filter((i) => i.quantity > 0),
            };
        });
    },

    clearCart: () => {
        set({ items: [] });
    },

    getTotalPrice: () => {
        return get().items.reduce(
            (total, item) => total + item.quantity * item.productDetails.priceNumber,
            0
        );
    },

    getTotalQuantity: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
    },

    getCartItems: () => {
        return get().items;
    },

    setCartItems: (items: CartItem[]) => {
        set({ items });
    },
})
);
