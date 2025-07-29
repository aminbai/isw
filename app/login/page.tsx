"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Lock, Mail, Info, Eye, EyeOff } from "lucide-react"
import { signIn, getCurrentUser } from "@/lib/auth"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  // Check if user is already logged in
  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      console.log("User already logged in, redirecting to admin...")
      router.push("/admin")
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    console.log("=== LOGIN ATTEMPT ===")
    console.log("Email:", formData.email)
    console.log("Password length:", formData.password.length)

    try {
      const result = await signIn(formData.email, formData.password)

      console.log("=== LOGIN RESULT ===")
      console.log("Success:", result.success)
      console.log("User:", result.user)
      console.log("Error:", result.error)

      if (result.success) {
        console.log("Login successful! Redirecting to admin panel...")

        // Small delay to ensure state is updated
        setTimeout(() => {
          router.push("/admin")
        }, 100)
      } else {
        console.log("Login failed:", result.error)
        setError(result.error || "লগইন করতে সমস্যা হয়েছে")
      }
    } catch (error) {
      console.error("Unexpected login error:", error)
      setError("অপ্রত্যাশিত সমস্যা হয়েছে। আবার চেষ্টা করুন।")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    // Clear error when user starts typing
    if (error) {
      setError("")
    }
  }

  const fillDemoCredentials = () => {
    setFormData({
      email: "admin@islamicwelfare.org",
      password: "password123",
    })
    setError("")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-navy-800 mb-4 font-amiri">অ্যাডমিন লগইন</h1>
          <p className="text-gray-600">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
        </div>

        <div className="card">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Demo Credentials Info */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-emerald-600 mt-0.5 mr-3 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-emerald-800 mb-2">ডেমো অ্যাকাউন্ট</h3>
                <p className="text-sm text-emerald-700 mb-3">পরীক্ষার জন্য নিচের তথ্য ব্যবহার করুন:</p>
                <div className="bg-emerald-100 rounded p-3 mb-3 font-mono text-sm">
                  <div className="text-emerald-800">
                    <strong>ইমেইল:</strong> admin@islamicwelfare.org
                  </div>
                  <div className="text-emerald-800">
                    <strong>পাসওয়ার্ড:</strong> password123
                  </div>
                </div>
                <button
                  type="button"
                  onClick={fillDemoCredentials}
                  className="text-sm bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition-colors duration-200"
                >
                  ডেমো তথ্য ব্যবহার করুন
                </button>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="inline h-4 w-4 mr-2" />
                ইমেইল *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="আপনার ইমেইল লিখুন"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Lock className="inline h-4 w-4 mr-2" />
                পাসওয়ার্ড *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="form-input pr-10"
                  placeholder="আপনার পাসওয়ার্ড লিখুন"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  লগইন করা হচ্ছে...
                </div>
              ) : (
                "লগইন করুন"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">সমস্যা হলে ডেমো অ্যাকাউন্ট ব্যবহার করুন অথবা পেজ রিফ্রেশ করুন</p>
          </div>
        </div>
      </div>
    </div>
  )
}
