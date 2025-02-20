import { AuthService } from "@/services/repositories/auth.repository";
import { create } from "zustand";
import { devtools, persist, PersistStorage } from "zustand/middleware";

export interface AuthManagementState {
  accessToken: string | null;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => void;
  loadTokenFromCookie: () => Promise<void>;
  recover: (email: string) => Promise<void>;
  resetPass: (
    email: string,
    newPassword: string,
    resetToken: string
  ) => Promise<void>;
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
              window.location.href = "/";
            }
          } catch (error) {
            console.error("Failed to sign in user:", error);
          }
        },
        logOut: async () => {
          try {
            await fetch("/api/logout", {
              method: "POST",
              credentials: "include",
            });

            set({ accessToken: null });

            window.location.href = "/signin";
          } catch (error) {
            console.error("Error logging out:", error);
          }
        },
        loadTokenFromCookie: async () => {
          try {
            const response = await fetch("/api/get-token", {
              method: "GET",
              credentials: "include",
            });

            const data = await response.json();
            if (data.token) {
              set({ accessToken: data.token });
            }
          } catch (error) {
            console.error("Error loading JWT from cookie:", error);
          }
        },
        recover: async (email: string) => {
          try {
            await AuthService.Recover(email);
          } catch (error) {
            console.error("Failed to recover password:", error);
          }
        },
        resetPass: async (
          email: string,
          newPassword: string,
          resetToken: string
        ) => {
          try {
            await AuthService.ResetPass(email, newPassword, resetToken);
          } catch (error) {
            console.error("Failed to reset password:", error);
          }
        },
      }),

      {
        name: "AuthManagement-storage",
        storage: sessionStorageHandler,
      }
    )
  )
);
