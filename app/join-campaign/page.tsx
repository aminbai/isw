"use client"

import type React from "react"
import { useState } from "react"
import { Users, Phone, User, Award } from "lucide-react"
import { submitCampaignJoinForm } from "@/lib/firestore"

export default function JoinCampaignPage() {
  const [formData, setFormData] = useState({
    campaignId: "",
    name: "",
    phone: "",
    experience: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const campaigns = [
    { id: "1", name: "শীতবস্ত্র বিতরণ ক্যাম্পেইন" },
    { id: "2", name: "বিনামূল্যে চিকিৎসা সেবা" },
    { id: "3", name: "শিক্ষ�� উপকরণ বিতরণ" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const selectedCampaign = campaigns.find((c) => c.id === formData.campaignId)
      const submitData = {
        ...formData,
        campaignName: selectedCampaign?.name || "",
      }

      const result = await submitCampaignJoinForm(submitData)

      if (result.success) {
        setSubmitted(true)
      } else {
        setError(result.error || "ক্যাম্পেইনে যোগদানে সমস্যা হয়েছে")
      }
    } catch (error) {
      setError("ক্যাম্পেইনে যোগদানে সমস্যা হয়েছে")
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
              <Users className="h-8 w-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-navy-800 mb-4">ক্যাম্পেইনে যোগদান সফল!</h2>
            <p className="text-gray-600 mb-6">আপনি সফলভাবে ক্যাম্পেইনে যোগদান করেছেন। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
            <button
              onClick={() => {
                setSubmitted(false)
                setFormData({
                  campaignId: "",
                  name: "",
                  phone: "",
                  experience: "",
                })
              }}
              className="btn-primary"
            >
              আরেকটি ক্যাম্পেইনে যোগদান করুন
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
          <h1 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4 font-amiri">ক্যাম্পেইনে যোগদান করুন</h1>
          <p className="text-lg text-gray-600">আমাদের সমাজসেবামূলক ক্যাম্পেইনে অংশগ্রহণ করুন</p>
        </div>

        <div className="card">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="inline h-4 w-4 mr-2" />
                ক্যাম্পেইন নির্বাচন করুন *
              </label>
              <select
                name="campaignId"
                value={formData.campaignId}
                onChange={handleChange}
                required
                className="form-input"
              >
                <option value="">ক্যাম্পেইন নির্বাচন করুন</option>
                {campaigns.map((campaign) => (
                  <option key={campaign.id} value={campaign.id}>
                    {campaign.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="inline h-4 w-4 mr-2" />
                আপনার নাম *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="আপনার পূর্ণ নাম লিখুন"
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
                placeholder="০১xxxxxxxxx"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Award className="inline h-4 w-4 mr-2" />
                পূর্ববর্তী অভিজ্ঞতা
              </label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                rows={4}
                className="form-input"
                placeholder="সমাজসেবা বা স্বেচ্ছাসেবী কাজের পূর্ববর্তী অভিজ্ঞতা থাকলে লিখুন (ঐচ্ছিক)"
              />
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-3 text-lg">
              {isSubmitting ? "যোগদান করা হচ্ছে..." : "ক্যাম্পেইনে যোগদান করুন"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
