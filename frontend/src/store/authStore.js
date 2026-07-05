import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      role: null,
      isAuthenticated: false,

      login: (userData, token) => set({
        user: userData,
        token: token,
        role: userData?.role || null,
        isAuthenticated: true
      }),

      logout: () => set({
        user: null,
        token: null,
        role: null,
        isAuthenticated: false
      }),

      setRole: (role) => set({ role })
    }),
    {
      name: 'krushimart-auth',
    }
  )
);

export default useAuthStore;
