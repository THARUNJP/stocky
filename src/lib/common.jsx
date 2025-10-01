// Minimal Button component
export const Button = ({ children, type = "button", disabled = false, className = "" }) => (
  <button
    type={type}
    disabled={disabled}
    className={`w-full h-12 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition ${className}`}
  >
    {children}
  </button>
)

// Minimal Input component
export const Input = ({ value, onChange, onBlur, type = "text", placeholder = "", className = "" }) => (
  <input
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    type={type}
    placeholder={placeholder}
    className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
  />
)

// Minimal Label component
export const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="text-sm font-medium text-gray-700">
    {children}
  </label>
)
