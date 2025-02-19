import { useAuthManagementStore } from "@/stores/auth.store";

export const apiRequest = async (
  endpoint: string,
  method: "GET" | "POST" | "PATCH" | "DELETE" = "GET",
  body?: any,
  isFormData: boolean = false
) => {
  const { accessToken } = useAuthManagementStore.getState();
  const baseUrl = "http://localhost:8080/skillane";

  if (!accessToken) {
    throw new Error("No access token found. User might not be logged in.");
  }

  const headers: HeadersInit = {
    Authorization: `Bearer ${accessToken}`,
  };

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method,
      headers,
      body: isFormData ? body : JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`❌ API Request Error (${method} ${endpoint}):`, error);
    throw error;
  }
};
