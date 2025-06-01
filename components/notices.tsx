"use client"

import { useState, useEffect } from "react"
import { Bell, Calendar, AlertCircle, X } from "lucide-react"
import { NotificationSystem } from "./notification-system"

export function Notices() {
  const [expandedNotice, setExpandedNotice] = useState<number | null>(null)
  const [visibleNotices, setVisibleNotices] = useState<number[]>([])

  const notices = [
    {
      id: 1,
      title: "মাসিক সাধারণ সভা",
      content: "আগামী ১৫ জানুয়ারি, ২০২৫ তারিখে সকাল ১০টায় মাসিক সাধারণ সভা অনুষ্ঠিত হবে। সকল সদস্যদের উপস্থিত থাকার জন্য অনুরোধ করা হচ্ছে।",
      date: "১০ জানুয়ারি, ২০২৫",
      type: "সভা",
      priority: "high",
    },
    {
      id: 2,
      title: "নতুন সদস্য নিবন্ধন",
      content:
        "নতুন সদস্য নিবন্ধনের জন্য আবেদন গ্রহণ করা হচ্ছে। আগ্রহী ব্যক্তিরা যোগাযোগ করুন। প্রয়োজনীয় কাগজপত্র ও ফি সংক্রান্ত তথ্যের জন্য অফিসে যোগাযোগ করুন।",
      date: "৮ জানুয়ারি, ২০২৫",
      type: "নিবন্ধন",
      priority: "medium",
    },
    {
      id: 3,
      title: "দান সংগ্রহ কর্মসূচি",
      content: "শীতবস্ত্র বিতরণের জন্য দান সংগ্রহ কর্মসূচি চলমান। আপনার অংশগ্রহণ কাম্য। নগদ অর্থ অথবা কাপড়-চোপড় দান করতে পারেন।",
      date: "৫ জানুয়ারি, ২০২৫",
      type: "দান",
      priority: "high",
    },
  ]

  useEffect(() => {
    // Animate notices appearing one by one
    notices.forEach((_, index) => {
      setTimeout(() => {
        setVisibleNotices((prev) => [...prev, index])
      }, index * 200)
    })
  }, [])

  const toggleNotice = (id: number) => {
    setExpandedNotice(expandedNotice === id ? null : id)
  }

  return (
    <>
      <section className="py-16 bg-white relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <div className="inline-block">
              <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4 font-amiri relative">
                গুরুত্বপূর্ণ ঘোষণা
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"></div>
              </h2>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto animate-fade-in-up">আমাদের সাম্প্রতিক ঘোষণা ও আপডেটসমূহ</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {notices.map((notice, index) => (
              <div
                key={notice.id}
                className={`transform transition-all duration-700 ${
                  visibleNotices.includes(index) ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className={`card border-l-4 border-l-emerald-500 hover:shadow-xl transition-all duration-300 cursor-pointer group ${
                    expandedNotice === notice.id ? "ring-2 ring-emerald-200" : ""
                  }`}
                  onClick={() => toggleNotice(notice.id)}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-3 rounded-lg transition-all duration-300 group-hover:scale-110 ${
                        notice.priority === "high"
                          ? "bg-red-100 group-hover:bg-red-200"
                          : notice.priority === "medium"
                            ? "bg-yellow-100 group-hover:bg-yellow-200"
                            : "bg-blue-100 group-hover:bg-blue-200"
                      }`}
                    >
                      {notice.type === "সভা" && (
                        <Calendar className="h-6 w-6 text-blue-600 transition-all duration-300" />
                      )}
                      {notice.type === "নিবন্ধন" && (
                        <Bell className="h-6 w-6 text-yellow-600 transition-all duration-300" />
                      )}
                      {notice.type === "দান" && (
                        <AlertCircle className="h-6 w-6 text-red-600 transition-all duration-300" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-navy-800 group-hover:text-emerald-600 transition-colors duration-300">
                          {notice.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">{notice.date}</span>
                          <div
                            className={`transform transition-transform duration-300 ${
                              expandedNotice === notice.id ? "rotate-45" : "rotate-0"
                            }`}
                          >
                            {expandedNotice === notice.id ? (
                              <X className="h-5 w-5 text-gray-400" />
                            ) : (
                              <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div
                        className={`transition-all duration-500 ease-in-out overflow-hidden ${
                          expandedNotice === notice.id ? "max-h-96 opacity-100" : "max-h-16 opacity-75"
                        }`}
                      >
                        <p className="text-gray-600 leading-relaxed">{notice.content}</p>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                            notice.type === "সভা"
                              ? "bg-blue-100 text-blue-800 group-hover:bg-blue-200"
                              : notice.type === "নিবন্ধন"
                                ? "bg-yellow-100 text-yellow-800 group-hover:bg-yellow-200"
                                : "bg-red-100 text-red-800 group-hover:bg-red-200"
                          }`}
                        >
                          {notice.type}
                        </span>

                        {notice.priority === "high" && (
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
                            <span className="text-xs text-red-600 font-medium">জরুরি</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notification System */}
      <NotificationSystem />
    </>
  )
}
