import { apiRequest } from "@/utils/api-request";

export const AuthService = {
  async LogIn(email: string, password: string) {
    return apiRequest("/auth/login", "POST", { email, password }, false, false);
  },

  async Recover(email: string) {
    return apiRequest("/auth/recover", "POST", { email }, false, false);
  },

  async ResetPass(email: string, newPassword: string, resetToken: string) {
    return apiRequest(
      "/auth/reset-password",
      "POST",
      { email, newPassword, resetToken },
      false,
      false
    );
  },
};
