import PropTypes from 'prop-types';
import { motion } from "framer-motion";


const messageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  }
};

/**
 * A message bubble component that displays a message with animation.
 *
 * @param {object} message - an object with sender and text properties
 * @returns {JSX.Element} The message bubble component
 *
 * The component will animate the message bubble with a spring animation
 * when the message is displayed or removed. The message bubble will also
 * scale up when hovered over.
 */

const MessageBubble = ({ message }) => {
  const { sender, text } = message;

  return (
    <motion.div
      className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`}
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      layout
    >
      <motion.div
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
          sender === 'user'
            ? 'bg-blue-600 text-white rounded-br-none shadow-lg shadow-blue-500/30'
            : 'bg-white text-gray-800 rounded-bl-none shadow-lg shadow-gray-200'
        }`}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {text}
      </motion.div>
    </motion.div>
  );
};

MessageBubble.propTypes = {
  message: PropTypes.shape({
    sender: PropTypes.oneOf(['user', 'bot']).isRequired,
    text: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }).isRequired
};

export default MessageBubble;