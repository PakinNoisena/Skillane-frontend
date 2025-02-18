export default () => {
  return {
    async LogIn(email: string, password: string) {
      const baseUrl = "http://localhost:8080/skillane/auth/login";

      try {
        const response = await fetch(baseUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        return result;
      } catch (error) {
        throw error;
      }
    },
  };
};
