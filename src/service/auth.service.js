import apiRequest from "@/client/clientApi";
import { toast } from "react-toastify"


export const validateAccessToken = async (token) => {
  if (!token) return { valid: false };

  try {
    // Call the backend to validate the token
    const response = await apiRequest.get("/auth/validate");

    // If backend returns user info, token is valid
    return { valid: response?.data?.status, user: response?.data?.username };
  } catch (err) {
    console.error("Access token validation failed:", err?.response?.data || err);
    return { valid: false };
  }
};

export const loginService = async (email, password, navigate) => {
  const data = { email, password }
  try {
    const response = await apiRequest.post("/auth/login", data)

    toast.success(response?.message || "Login successful")

    localStorage.setItem("token", response?.data?.data?.access_token)
    localStorage.setItem("refreshToken", response?.data?.data?.refresh_token)

    navigate("/")
  } catch (err) {
    toast.error(err?.response?.data?.message || "Login failed")
  }
}
