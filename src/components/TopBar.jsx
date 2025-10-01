import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./Login";


/**
 * The TopBar component displays a login form if the user is not logged in,
 * and a username and logout button if the user is logged in.
 *
 * @param {boolean} isLoggedIn - whether the user is logged in
 * @param {string} username - the username of the user
 * @param {function} setShowLogin - a function to set showLogin
 * @param {boolean} showLogin - whether the login form is shown
 * @param {function} handleLogout - a function to handle the logout
 * @param {string} usernameInput - the username input by the user
 * @param {function} setUsername - a function to set the username
 * @param {string} password - the password input by the user
 * @param {function} setPassword - a function to set the password
 * @param {function} handleLogin - a function to handle the login
 */
const TopBar = ({
  isLoggedIn,
  username,
  setShowLogin,
  showLogin,
  handleLogout,
  usernameInput,
  setUsername,
  password,
  setPassword,
  handleLogin,
}) => (
  <motion.div
    className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center relative"
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
  >
    <div className="flex items-center space-x-3">
      <motion.div
        className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30"
        whileHover={{ scale: 1.05, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <span className="text-white font-bold text-lg">F</span>
      </motion.div>
      <div>
        <h1 className="text-xl font-bold text-gray-900">FinAssist AI</h1>
        <p className="text-sm text-gray-600">AI-powered financial insights</p>
      </div>
    </div>

    <div className="flex items-center space-x-4">
      {isLoggedIn ? (
        <motion.div
          className="flex items-center space-x-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-gray-700">Welcome, {username}</span>
          <motion.button
            onClick={handleLogout}
            className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-all duration-300 text-gray-800"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.95 }}
          >
            Logout
          </motion.button>
        </motion.div>
      ) : (
        <div className="relative">
          <motion.button
            onClick={() => setShowLogin(!showLogin)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-medium shadow-lg shadow-blue-500/40"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.button>

          <AnimatePresence>
            {showLogin && (
              <Login
                username={usernameInput}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                handleLogin={handleLogin}
              />
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  </motion.div>
);

TopBar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  setShowLogin: PropTypes.func.isRequired,
  showLogin: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
  usernameInput: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default TopBar;