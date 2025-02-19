import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { UserManagement } from "../services/models/user.model";
import { UserService } from "@/services/repositories/user.repository";

export interface UserManagementState {
  userProfile: UserManagement | null;
  uploading: boolean;
  uploadImage: string | null;
  getUserProfile: () => Promise<void>;
  updateUserProfile: (body: Partial<UserManagement>) => Promise<void>;
  uploadProfileImage: (file: File) => Promise<void>;
}

export const useUserManagementStore = create<UserManagementState>()(
  devtools(
    persist(
      (set) => ({
        userProfile: null,
        uploading: false,
        uploadImage: null,
        getUserProfile: async () => {
          try {
            const result = await UserService.getUserProfile();
            set({ userProfile: result.data || null });
          } catch (error) {
            console.error("Failed to get user profile:", error);
          }
        },

        updateUserProfile: async (body: Partial<UserManagement>) => {
          try {
            await UserService.updateUserProfile(body);
            const result = await UserService.getUserProfile();
            set({ userProfile: result.data || null });
          } catch (error) {
            console.error("Failed to update user profile:", error);
          }
        },

        uploadProfileImage: async (file: File) => {
          set({ uploading: true });

          try {
            const imageUrl = await UserService.uploadImage(file);

            set({ uploadImage: imageUrl.data.url });
          } catch (error) {
            console.error("Image upload failed:", error);
          } finally {
            set({ uploading: false });
          }
        },
      }),
      {
        name: "userManagement-storage",
      }
    )
  )
);
