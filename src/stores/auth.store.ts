import { create } from "zustand";
import { devtools, persist, PersistStorage } from "zustand/middleware";
import authRepository from "@/services/repositories/auth.repository";

// Define the state interface
export interface AuthManagementState {
  accessToken: string | null;
  logIn: (username: string, password: string) => Promise<void>;
  logOut: () => void;
}

// ✅ Custom persist storage for sessionStorage with correct types
const sessionStorageHandler: PersistStorage<AuthManagementState> = {
  getItem: async (key) => {
    const storedValue = sessionStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null; // ✅ Ensure parsed object
  },
  setItem: async (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value)); // ✅ Store as JSON
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
            const result = await authRepository().LogIn(email, password);

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
        storage: sessionStorageHandler, // ✅ Use correctly typed sessionStorage
      }
    )
  )
);
