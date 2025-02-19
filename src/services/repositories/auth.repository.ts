import { apiRequest } from "@/utils/api-request";

export const AuthService = {
  async LogIn(email: string, password: string) {
    return apiRequest("/auth/login", "POST", { email, password });
  },
};
