import { AuthService } from "@/services/repositories/auth.repository";
import { create } from "zustand";
import { devtools, persist, PersistStorage } from "zustand/middleware";

export interface AuthManagementState {
  accessToken: string | null;
  logIn: (username: string, password: string) => Promise<void>;
  logOut: () => void;
}

const sessionStorageHandler: PersistStorage<AuthManagementState> = {
  getItem: async (key) => {
    const storedValue = sessionStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  },
  setItem: async (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: async (key) => {
    sessionStorage.removeItem(key);
  },
};

export const useAuthManagementStore = create<AuthManagementState>()(
  devtools(
    persist(
      (set) => ({
        accessToken: null,

        logIn: async (email: string, password: string) => {
          try {
            const result = await AuthService.LogIn(email, password);

            if (result?.data.accessToken) {
              set({ accessToken: result.data.accessToken });
            }
          } catch (error) {
            console.error("Failed to sign in user:", error);
          }
        },

        logOut: () => {
          set({ accessToken: null });
        },
      }),
      {
        name: "AuthManagement-storage",
        storage: sessionStorageHandler,
      }
    )
  )
);
