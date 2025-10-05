import apiRequest from "@/client/clientApi";
import { toast } from "react-toastify";

export const sendUserQuery = async (query, sessionId) => {
  const data = {
    user_message: query,
  };

  try {
    const response = await apiRequest.post(`/chat?session_id=${sessionId}`, data);
    console.log(response?.data?.data, "??");

    return response?.data?.data;
  } catch (err) {
    console.log(err, "?");
    toast.error("Something went wrong, try again later");
    return false;
  }
};

export const getSessionData = async (sessionId) => {
  try {
    const response = await apiRequest.get(
      `/chat/sessions/${sessionId}/messages`
    );
    return response?.data?.data?.messages;
  } catch (err) {
    console.log(err, "err");
    toast.error("Something went wrong, try again later");
    return false;
  }
};
