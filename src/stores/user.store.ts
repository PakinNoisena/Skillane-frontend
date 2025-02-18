import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { UserManagement } from "../services/models/user.model";
import userRepository from "../services/repositories/user.repository";
import userRepo from "@/services/repositories/user.repository";

// Define the state interface
export interface UserManagementState {
  userProfile: UserManagement | null;
  getUserProfile: () => Promise<void>;
}

export const useUserManagementStore = create<UserManagementState>()(
  devtools(
    persist(
      (set) => ({
        userProfile: null,
        getUserProfile: async () => {
          try {
            const result = await userRepo().getUserProfile();

            set({ userProfile: result.data || null });
          } catch (error) {
            console.error("Failed to sign in user:", error);
          }
        },
      }),
      {
        name: "userManagement-storage",
      }
    )
  )
);
