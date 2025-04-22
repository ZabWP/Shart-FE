import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      username: null,
      setUser: (userData) => set({ user: userData }),
      setUsername: (Dusername) => set({ username: Dusername }),
      logout: () => set({ user: null, username: null }),
    }),
    {
      name: "user-store",
    }
  )
);

export default useUserStore;
