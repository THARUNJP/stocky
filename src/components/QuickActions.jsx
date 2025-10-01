import { motion } from "framer-motion";

/**
 * A component that displays a grid of quick action buttons.
 *
 * @param {array} actions - an array of objects with icon and text properties
 * @param {function} setInputMessage - a function to set the input message
 * @returns {ReactElement} a grid of quick action buttons
 */
const QuickActions = ({ actions, setInputMessage }) => (
  <motion.div
    className="grid grid-cols-4 gap-3 mb-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
  >
    {actions.map((action, index) => (
      <motion.button
        key={index}
        className="bg-white border border-gray-200 text-gray-700 text-sm py-3 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all duration-300 flex items-center justify-center space-x-2 shadow-sm"
        onClick={() => setInputMessage(action.text)}
        whileHover={{
          scale: 1.05,
          y: -2,
          boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.1)",
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 + index * 0.1 }}
      >
        <motion.span className="text-lg" whileHover={{ scale: 1.2 }}>
          {action.icon}
        </motion.span>
        <span className="font-medium">{action.text}</span>
      </motion.button>
    ))}
  </motion.div>
);

export default QuickActions;