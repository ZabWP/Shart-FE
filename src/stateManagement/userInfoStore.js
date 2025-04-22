import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  username: null,
  setUser: (userData) => set({ user: userData }),
  setUsername: (Dusername) => set({ username: Dusername }),
  logout: () => set({ user: null, username: null }),
}));

export default useUserStore;
