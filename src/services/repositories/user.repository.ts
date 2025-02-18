import { useAuthManagementStore } from "@/stores/auth.store";

export default () => {
  return {
    async getUserProfile() {
      const { accessToken } = useAuthManagementStore.getState();
      try {
        const baseUrl = "http://localhost:8080/skillane/users/profile";

        // ✅ Retrieve token dynamically from Zustand

        if (!accessToken) {
          throw new Error(
            "No access token found. User might not be logged in."
          );
        }

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        };

        const response = await fetch(baseUrl, {
          method: "GET",
          headers: headers,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const results = await response.json();
        return results;
      } catch (error) {
        console.error("Error fetching User Profile:", error);
        throw error;
      }
    },
  };
};
