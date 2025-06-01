"use client"

import type React from "react"
import { useState } from "react"
import { User, Phone, MapPin, Calendar, GraduationCap, Briefcase } from "lucide-react"
import { submitAdmissionForm } from "@/lib/firestore"

export default function AdmissionPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    guardianName: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    education: "",
    profession: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const result = await submitAdmissionForm(formData)

      if (result.success) {
        setSubmitted(true)
      } else {
        setError(result.error || "আবেদন জমা দিতে সমস্যা হয়েছে")
      }
    } catch (error) {
      setError("আবেদন জমা দিতে সমস্যা হয়েছে")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card text-center">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="h-8 w-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-navy-800 mb-4">আবেদন সফলভাবে জমা হয়েছে!</h2>
            <p className="text-gray-600 mb-6">আপনার ভর্তির আবেদন আমাদের কাছে পৌঁছেছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
            <button
              onClick={() => {
                setSubmitted(false)
                setFormData({
                  fullName: "",
                  guardianName: "",
                  phone: "",
                  address: "",
                  dateOfBirth: "",
                  education: "",
                  profession: "",
                })
              }}
              className="btn-primary"
            >
              নতুন আবেদন করুন
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4 font-amiri">ভর্তির আবেদন ফর্ম</h1>
          <p className="text-lg text-gray-600">আমাদের সংস্থায় যোগদানের জন্য নিচের ফর্মটি পূরণ করুন</p>
        </div>

        <div className="card">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="inline h-4 w-4 mr-2" />
                পূর্ণ নাম *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="আপনার পূর্ণ নাম লিখুন"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="inline h-4 w-4 mr-2" />
                অভিভাবকের নাম *
              </label>
              <input
                type="text"
                name="guardianName"
                value={formData.guardianName}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="অভিভাবকের নাম লিখুন"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="inline h-4 w-4 mr-2" />
                মোবাইল নম্বর *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="০১৭xxxxxxxx"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline h-4 w-4 mr-2" />
                ঠিকানা *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows={3}
                className="form-input"
                placeholder="সম্পূর্ণ ঠিকানা লিখুন"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline h-4 w-4 mr-2" />
                জন্ম তারিখ *
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <GraduationCap className="inline h-4 w-4 mr-2" />
                শিক্ষাগত যোগ্যতা *
              </label>
              <select
                name="education"
                value={formData.education}
                onChange={handleChange}
                required
                className="form-input"
              >
                <option value="">শিক্ষাগত যোগ্যতা নির্বাচন করুন</option>
                <option value="primary">প্রাথমিক</option>
                <option value="secondary">মাধ্যমিক</option>
                <option value="higher_secondary">উচ্চ মাধ্যমিক</option>
                <option value="bachelor">স্নাতক</option>
                <option value="master">স্নাতকোত্তর</option>
                <option value="other">অন্যান্য</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Briefcase className="inline h-4 w-4 mr-2" />
                পেশা *
              </label>
              <input
                type="text"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="আপনার পেশা লিখুন"
              />
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-3 text-lg">
              {isSubmitting ? "জমা দেওয়া হচ্ছে..." : "আবেদন জমা দিন"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
