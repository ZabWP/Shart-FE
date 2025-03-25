import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  username: null,
  token: null,
  setUser: (userData) => set({ user: userData }),
  setUsername: (Dusername) => set({username: Dusername}),
  setToken: (token) => set({ token }),
  logout: () => set({user: null}),
}));

export default useUserStore;
