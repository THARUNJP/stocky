// apiClient.js

import axios from "axios";
import { RefreshAccessToken } from "../service/refreshTokens/acessToken";

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

// Add access token to headers
apiRequest.interceptors.request.use(async (config) => {
  try {
    const token = localStorage.getItem("token");
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
  } catch (err) {
    console.error("Error adding Authorization header:", err);
  }
  return config;
});

// Response interceptor to handle expired access tokens
apiRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    console.log("/Failed Request:", {
      url: error?.config?.url,
      method: error?.config?.method,
      data: error?.config?.data,
      headers: error?.config?.headers,
    });

    if (
      error?.response?.status === 401 &&
      error?.response?.data?.problem?.detail === "token is expired" &&
      !originalRequest._retryAccessToken
    ) {
      originalRequest._retryAccessToken = true;
      const response = await RefreshAccessToken();

      if (!response) {
        // Redirect user to login page
        return Promise.reject(
          new Error("Access token expired. Redirect to login.")
        );
      }

      return apiRequest(originalRequest); // Retry the original request
    }

    return Promise.reject(error);
  }
);


export { apiRequest };
