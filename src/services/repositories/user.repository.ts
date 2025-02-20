import { apiRequest } from "@/utils/api-request";
import { UserManagement } from "../models/user.model";

export const UserService = {
  async getUserProfile() {
    return apiRequest("/users/profile", "GET");
  },

  async updateUserProfile(body: Partial<UserManagement>) {
    return apiRequest("/users/profile", "PATCH", body);
  },

  async uploadImage(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    return apiRequest("/upload", "POST", formData, true);
  },

  async Register(email: string, password: string) {
    return apiRequest(
      "/users/register",
      "POST",
      { email, password },
      false,
      false
    );
  },
};
