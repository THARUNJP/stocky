import { useEffect, useState } from "react";
import { ChatSidebar } from "./components/chat-sidebar";
import { ChatMain } from "./components/chat-main";
import { getToken } from "@/lib/localStorage";
import { validateAccessToken } from "@/service/auth.service";

export default function ChatInterface() {
  const [selectedChat, setSelectedChat] = useState("current");
  const [user, setUser] = useState(null);

  useEffect(() => {
    authValidate();
  }, []);

async function authValidate() {
  try {
    const token = getToken;
    if (!token) return;

    const response = await validateAccessToken(token);
    if (response?.valid) {
      setUser(response.user || null);
    }
  } catch (err) {
    console.error("Auth validation failed:", err);
  }
}

  return (
    <div className="flex h-screen bg-background">
      <ChatSidebar selectedChat={selectedChat} onSelectChat={setSelectedChat} />
      <ChatMain user={user} />
    </div>
  );
}
