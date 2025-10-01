import { motion } from "framer-motion";


/**
 * A sidebar component that displays a list of features and today's insights.
 * The sidebar is animated to slide in and out of view.
 *
 * @param {array} features - an array of objects with icon, title, and description properties
 * @returns {JSX.Element} The Sidebar component
 */
const Sidebar = ({ features }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="w-80 bg-gradient-to-b from-blue-50 to-white border-r border-gray-200 p-6"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
    >
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
          AI-Powered Financial Insights That Deliver Results in Minutes
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          FinAssist automates financial analysis from start to finish with intelligent insights.
        </p>
      </motion.div>

      <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer"
            variants={itemVariants}
            whileHover={{
              scale: 1.02,
              y: -2,
              boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(59, 130, 246, 0.04)",
            }}
          >
            <div className="flex items-center space-x-3">
              <motion.div className="text-2xl" whileHover={{ scale: 1.2, rotate: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                {feature.icon}
              </motion.div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">{feature.title}</h3>
                <p className="text-gray-600 text-xs">{feature.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mt-8 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileHover={{ y: -2 }}
      >
        <h4 className="font-semibold text-gray-900 text-sm mb-3">Today's Insights</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">Portfolio Growth</span>
            <span className="text-green-600 font-medium">+2.3%</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">Savings Progress</span>
            <span className="text-blue-600 font-medium">78%</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">Market Trends</span>
            <span className="text-purple-600 font-medium">Positive</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;