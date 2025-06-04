"use client"

import type React from "react"
import { useState } from "react"
import { Heart, Phone, MapPin, CreditCard, Hash, Download } from "lucide-react"
import { generatePDFReceipt } from "@/lib/pdf-receipt-generator"
import { submitDonationForm, generateDonationId } from "@/lib/firestore"

export default function DonatePage() {
  const [formData, setFormData] = useState({
    donorName: "",
    phone: "",
    address: "",
    amount: "",
    paymentMethod: "",
    transactionId: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [receiptData, setReceiptData] = useState<any>(null)
  const [error, setError] = useState("")

  const paymentMethods = [
    { value: "bkash", label: "বিকাশ (bKash)" },
    { value: "nagad", label: "নগদ (Nagad)" },
    { value: "bank", label: "ব্যাংক ট্রান্সফার" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const donationId = generateDonationId()
      const donationData = {
        ...formData,
        amount: Number(formData.amount),
        donationId,
      }

      const result = await submitDonationForm(donationData)

      if (result.success) {
        const receiptInfo = {
          ...donationData,
          date: new Date().toLocaleDateString("bn-BD"),
          time: new Date().toLocaleTimeString("bn-BD"),
        }
        setReceiptData(receiptInfo)
        setSubmitted(true)
      } else {
        setError(result.error || "দান জমা দিতে সমস্যা হয়েছে")
      }
    } catch (error) {
      setError("দান জমা দিতে সমস্যা হয়েছে")
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

  const handleDownloadReceipt = () => {
    if (receiptData) {
      generatePDFReceipt(receiptData)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card text-center">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-8 w-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-navy-800 mb-4">দান সফলভাবে গ্রহণ করা হয়েছে!</h2>
            <p className="text-gray-600 mb-6">আপনার দানের জন্য ধন্যবাদ। আল্লাহ আপনাকে উত্তম প্রতিদান দিন।</p>

            <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
              <h3 className="font-semibold text-navy-800 mb-2">দানের বিবরণ:</h3>
              <p>
                <strong>দানকারী:</strong> {receiptData?.donorName}
              </p>
              <p>
                <strong>পরিমাণ:</strong> ৳{receiptData?.amount}
              </p>
              <p>
                <strong>পেমেন্ট মেথড:</strong>{" "}
                {paymentMethods.find((m) => m.value === receiptData?.paymentMethod)?.label}
              </p>
              <p>
                <strong>ট্রানজেকশন আইডি:</strong> {receiptData?.transactionId}
              </p>
              <p>
                <strong>দান আইডি:</strong> {receiptData?.donationId}
              </p>
              <p>
                <strong>তারিখ:</strong> {receiptData?.date}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={handleDownloadReceipt} className="btn-primary flex items-center justify-center">
                <Download className="h-4 w-4 mr-2" />
                সুন্দর রসিদ ডাউনলোড করুন
              </button>
              <button
                onClick={() => {
                  setSubmitted(false)
                  setReceiptData(null)
                  setFormData({
                    donorName: "",
                    phone: "",
                    address: "",
                    amount: "",
                    paymentMethod: "",
                    transactionId: "",
                  })
                }}
                className="btn-secondary"
              >
                নতুন দান করুন
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4 font-amiri">দান করুন</h1>
          <p className="text-lg text-gray-600">আমাদের সমাজসেবামূলক কাজে অংশগ্রহণ করুন</p>
        </div>

        <div className="card">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Heart className="inline h-4 w-4 mr-2" />
                দানকারীর নাম *
              </label>
              <input
                type="text"
                name="donorName"
                value={formData.donorName}
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
                <CreditCard className="inline h-4 w-4 mr-2" />
                দানের পরিমাণ (টাকা) *
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                min="1"
                className="form-input"
                placeholder="দানের পরিমাণ লিখুন"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <CreditCard className="inline h-4 w-4 mr-2" />
                পেমেন্ট মেথড *
              </label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                required
                className="form-input"
              >
                <option value="">পেমেন্ট মেথড নির্বাচন করুন</option>
                {paymentMethods.map((method) => (
                  <option key={method.value} value={method.value}>
                    {method.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Hash className="inline h-4 w-4 mr-2" />
                ট্রানজেকশন আইডি *
              </label>
              <input
                type="text"
                name="transactionId"
                value={formData.transactionId}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="ট্রানজেকশন আইডি লিখুন"
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-navy-800 mb-2">পেমেন্ট তথ্য:</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <strong>বিকাশ:</strong> ০১৭১২-৩৪৫৬৭৮ (Personal)
                </p>
                <p>
                  <strong>নগদ:</strong> ০১৭১২-৩৪৫৬৭৮
                </p>
                <p>
                  <strong>ব্যাংক:</strong> ইসলামী ব্যাংক, A/C: ১২৩৪৫৬৭৮৯০
                </p>
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-3 text-lg">
              {isSubmitting ? "দান জমা দেওয়া হচ্ছে..." : "দান করুন"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
