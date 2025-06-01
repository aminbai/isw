"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, Mail } from "lucide-react"
import { signIn } from "@/lib/auth"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const result = await signIn(formData.email, formData.password)

      if (result.success) {
        router.push("/admin")
      } else {
        setError("ইমেইল বা পাসওয়ার্ড ভুল")
      }
    } catch (error) {
      setError("লগইন করতে সমস্যা হয়েছে")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
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
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>
          )}

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
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Lock className="inline h-4 w-4 mr-2" />
                পাসওয়ার্ড *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="আপনার পাসওয়ার্ড লিখুন"
              />
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-3 text-lg">
              {isSubmitting ? "লগইন করা হচ্ছে..." : "লগইন করুন"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">ডেমো অ্যাকাউন্ট: admin@islamicwelfare.org / password123</p>
          </div>
        </div>
      </div>
    </div>
  )
}
