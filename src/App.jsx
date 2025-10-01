import { useState } from "react";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";

/**
 * The main App component, which displays a login form if the user is not logged in,
 * and a chat window with financial insights if the user is logged in.
 *
 * The App component also handles login and logout functionality.
 *
 * @returns {JSX.Element} The App component.
 */
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const financialResponses = [
    "Based on your spending patterns, I recommend increasing your emergency fund by 15%.",
    "Your portfolio shows a 7.2% return this quarter. Consider diversifying into tech stocks.",
    "I've detected an unusual transaction. Would you like me to flag it for review?",
    "Your savings are on track to reach your $10,000 goal by December.",
    "Market analysis suggests now might be a good time to consider bond investments.",
    "Your credit score has improved by 12 points this month. Great job!",
    "I can help you create a budget for your upcoming vacation. Let me know your destination.",
    "Based on current interest rates, refinancing your mortgage could save you $200/month.",
  ];

  const features = [
    { icon: "⚡", title: "Instant Analysis", description: "Real-time financial insights" },
    { icon: "🔒", title: "Secure & Private", description: "Bank-level encryption" },
    { icon: "📱", title: "Always Available", description: "24/7 financial guidance" },
  ];

  const quickActions = [
    { text: "Portfolio Review", icon: "📊" },
    { text: "Budget Analysis", icon: "💰" },
    { text: "Investment Tips", icon: "📈" },
    { text: "Savings Goals", icon: "🎯" },
  ];

  /**
   * Handles the login form submission.
   *
   * If the username and password are valid, it logs the user in,
   * hides the login form, and sets the initial message from the bot.
   */
  const handleLogin = (e) => {
    e.preventDefault();

    if (username && password) {
      setIsLoggedIn(true);
      setShowLogin(false);
      setMessages([
        {
          id: 1,
          text: `Welcome back, ${username}! I'm your AI financial assistant. How can I help with your finances today?`,
          sender: "bot",
        },
      ]);
    }
  };

  /**
   * Logs the user out, resets the username and password, and clears the message log.
   */
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setMessages([]);
  };

  /**
   * Handles the message form submission.
   *
   * If the input message is not empty, it adds the message to the message log,
   * clears the input message, and sets the AI to typing.
   * After a 1.5 second delay, it adds a random response from the bot to the message log,
   * and sets the AI to not typing.
   */
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newUserMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const randomResponse = financialResponses[Math.floor(Math.random() * financialResponses.length)];
      const newBotMessage = {
        id: messages.length + 2,
        text: randomResponse,
        sender: "bot",
      };
      setMessages((prev) => [...prev, newBotMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-hidden">
      <TopBar
        isLoggedIn={isLoggedIn}
        username={username}
        setShowLogin={setShowLogin}
        showLogin={showLogin}
        handleLogout={handleLogout}
        usernameInput={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />

      <div className="flex-1 flex">
        <Sidebar features={features} />

        {isLoggedIn ? (
          <ChatWindow
            messages={messages}
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            handleSendMessage={handleSendMessage}
            isTyping={isTyping}
            quickActions={quickActions}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 text-gray-600">
            Please sign in to access chat and financial insights.
          </div>
        )}
      </div>
    </div>
  );
};

export default App;