import { useState } from "react"
import { Input, Button, Label } from "../../lib/common"
import { useNavigate } from "react-router-dom"
import { loginService } from "@/service/auth.service"
import { toast } from "react-toastify"

export default function LoginPage() {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  })
const [loading,setLoading] = useState(false)
  // Validation logic
  const validations = {
    email: {
      isValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      message: "Please enter a valid email address",
    },
    password: {
      minLength: formData.password.length >= 8,
    },
  }

  const isPasswordValid = validations.password.minLength
  const isFormValid = validations.email.isValid && isPasswordValid

 const handleSubmit = async (e) => {
  e.preventDefault()
  if (!isFormValid) return

  setLoading(true)
  try {
    await loginService(formData.email, formData.password, navigate)
  } catch (err) {
    console.error(err)
  } finally {
    setLoading(false)
  }
}

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login to Your Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Password requirement */}
            {touched.password && (
              <p
                className={`mt-1 text-xs ${
                  validations.password.minLength ? "text-green-600" : "text-red-600"
                }`}
              >
                • At least 8 characters
              </p>
            )}
          </div>

         <Button type="submit" disabled={!isFormValid || loading}>
  {loading ? "Logging in..." : "Login"}
</Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <button onClick={()=>navigate("/register")} className="cursor-pointer text-blue-600 hover:underline">Register</button>
        </p>
      </div>
    </div>
  )
}
