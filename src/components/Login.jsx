import PropTypes from "prop-types";

/**
 * A login form component with animation
 * 
 * @param {string} username - the username of the user
 * @param {function} setUsername - a function to set the username
 * @param {string} password - the password of the user
 * @param {function} setPassword - a function to set the password
 * @param {function} handleLogin - a function to handle the login
 */
const Login = ({ username, setUsername, password, setPassword, handleLogin }) => (
  <motion.div
    className="absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-64 z-20"
    initial={{ opacity: 0, scale: 0.9, y: -10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9, y: -10 }}
    transition={{ type: "spring", stiffness: 500, damping: 30 }}
  >
    <form onSubmit={handleLogin} className="space-y-3">
      <div>
        <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-1">
          Username
        </label>
        <motion.input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter username"
          required
          whileFocus={{ scale: 1.02 }}
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">
          Password
        </label>
        <motion.input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter password"
          required
          whileFocus={{ scale: 1.02 }}
        />
      </div>
      <motion.button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 shadow-lg shadow-blue-500/40"
        whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.4)" }}
        whileTap={{ scale: 0.98 }}
      >
        Sign In
      </motion.button>
    </form>
  </motion.div>
);

Login.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default Login;