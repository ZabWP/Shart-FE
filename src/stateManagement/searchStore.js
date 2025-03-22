import { create } from "zustand";

const searchStore = create((set) => (
    {
        searchResults: { art: [], users: [] },
        setSearchResults: (results) => set({ searchResults: results }),
    }
))

export default searchStore;