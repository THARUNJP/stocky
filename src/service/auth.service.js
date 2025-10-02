import apiRequest from "@/client/clientApi";


export const validateAccessToken = async (token) => {
  if (!token) return { valid: false };

  try {
    // Call the backend to validate the token
    const response = await apiRequest.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // If backend returns user info, token is valid
    return { valid: response?.data?.status, user: response.data.user_name };
  } catch (err) {
    console.error("Access token validation failed:", err?.response?.data || err);
    return { valid: false };
  }
};
