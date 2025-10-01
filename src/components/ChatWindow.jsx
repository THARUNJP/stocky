import { useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import MessageBubble from "./MessageBubble";
import QuickActions from "./QuickActions";

/**
 * The ChatWindow component displays a chat window with messages, a message input form, and quick actions.
 *
 * @param {array} messages - an array of message objects with id, text, and sender
 * @param {string} inputMessage - the message input by the user
 * @param {function} setInputMessage - a function to set the message input
 * @param {function} handleSendMessage - a function to handle the send message
 * @param {boolean} isTyping - whether the AI is typing
 * @param {array} quickActions - an array of quick action objects with text and icon
 */
const ChatWindow = ({
  messages,
  inputMessage,
  setInputMessage,
  handleSendMessage,
  isTyping,
  quickActions,
}) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col relative z-10">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div className="flex justify-start" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-bl-none shadow-lg shadow-gray-200">
              <div className="flex space-x-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions and Message Input */}
      <div className="border-t border-gray-200 bg-white/80 backdrop-blur-sm p-4">
        <QuickActions actions={quickActions} setInputMessage={setInputMessage} />

        <motion.form
          onSubmit={handleSendMessage}
          className="flex space-x-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            placeholder="Ask about your finances..."
            whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)" }}
          />
          <motion.button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 font-medium shadow-lg shadow-blue-500/40"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center space-x-2">
              <span>Send</span>
              <motion.span animate={{ rotate: [0, 15, 0] }} transition={{ duration: 0.5 }}>
                ⚡
              </motion.span>
            </span>
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
};

ChatWindow.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    text: PropTypes.string.isRequired,
    sender: PropTypes.oneOf(['user', 'bot']).isRequired,
  })).isRequired,
  inputMessage: PropTypes.string.isRequired,
  setInputMessage: PropTypes.func.isRequired,
  handleSendMessage: PropTypes.func.isRequired,
  isTyping: PropTypes.bool.isRequired,
  quickActions: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  })).isRequired,
};

export default ChatWindow;