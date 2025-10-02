
import  { useState } from "react"
import {Input,Button,Label}  from  "../../lib/common"
import { useNavigate } from "react-router-dom"


export default function RegisterPage() {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
  })

  // Validation logic
  const validations = {
    username: {
      isValid: formData.username.length >= 3,
      message: "Username must be at least 3 characters",
    },
    email: {
      isValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      message: "Please enter a valid email address",
    },
    password: {
      minLength: formData.password.length >= 8,
      hasUpperCase: /[A-Z]/.test(formData.password),
      hasLowerCase: /[a-z]/.test(formData.password),
      hasNumber: /[0-9]/.test(formData.password),
    },
  }

  const isPasswordValid =
    validations.password.minLength &&
    validations.password.hasUpperCase &&
    validations.password.hasLowerCase &&
    validations.password.hasNumber

  const isFormValid =
    validations.username.isValid && validations.email.isValid && isPasswordValid

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isFormValid) {
      console.log("Form submitted:", formData)
      // handle registration logic here
    }
  }

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Create Your Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              onBlur={() => handleBlur("username")}
              placeholder="Choose a username"
            />
            {touched.username && !validations.username.isValid && (
              <p className="text-sm text-red-600">{validations.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onBlur={() => handleBlur("email")}
              placeholder="your.email@example.com"
            />
            {touched.email && !validations.email.isValid && (
              <p className="text-sm text-red-600">{validations.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                onBlur={() => handleBlur("password")}
                placeholder="Create a strong password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Password requirements */}
            {touched.password && formData.password && (
              <div className="mt-2 text-xs text-gray-600 space-y-1">
                <p className={validations.password.minLength ? "text-green-600" : ""}>
                  • At least 8 characters
                </p>
                <p className={validations.password.hasUpperCase ? "text-green-600" : ""}>
                  • One uppercase letter
                </p>
                <p className={validations.password.hasLowerCase ? "text-green-600" : ""}>
                  • One lowercase letter
                </p>
                <p className={validations.password.hasNumber ? "text-green-600" : ""}>• One number</p>
              </div>
            )}
          </div>

          <Button type="submit" disabled={!isFormValid}>
            Continue
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button onClick={()=>navigate("/login")} className="text-blue-600 hover:underline cursor-pointer">
            Log in
          </button>
        </p>
      </div>
    </div>
  )
}
