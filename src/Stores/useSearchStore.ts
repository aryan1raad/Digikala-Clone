import { create } from "zustand";

interface SearchFilters {
    query: string;
    category: string;
    sorter: "price" | "takhfif" | null;
    currentMin: number;
    currentMax: number;

    setQuery: (query: string) => void;
    setCategory: (category: string) => void;
    setSorter: (sorter: "price" | "takhfif" | null) => void;
    setPriceRange: (min: number, max: number) => void;
    resetFilters: () => void;
}

export const useSearchStore = create<SearchFilters>((set) => ({
    query: "",
    category: "",
    sorter: null,
    currentMin: 0,
    currentMax: Infinity,

    setQuery: (query) => set({ query }),
    setCategory: (category) => set({ category }),
    setSorter: (sorter) => set({ sorter }),
    setPriceRange: (min, max) => set({ currentMin: min, currentMax: max }),

    resetFilters: () =>
        set({
            query: "",
            category: "",
            sorter: null,
            currentMin: 0,
            currentMax: Infinity,
        }),
}));