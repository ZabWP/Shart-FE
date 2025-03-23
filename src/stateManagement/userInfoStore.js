import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  token: null,
  setUser: (userData) => set({ user: userData }),
  setToken: (token) => set({ token }),
  logout: () => set({user: null}),
}));

export default useUserStore;
