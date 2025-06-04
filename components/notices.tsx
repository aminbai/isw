"use client"

import { useState, useEffect } from "react"
import { Bell, Calendar, AlertCircle, ChevronDown, ChevronUp } from "lucide-react"

export function Notices() {
  const [expandedNotice, setExpandedNotice] = useState<number | null>(null)
  const [visibleNotices, setVisibleNotices] = useState<number[]>([])

  const notices = [
    {
      id: 1,
      title: "মাসিক সাধারণ সভা",
      content: "আগামী ১৫ জানুয়ারি, ২০২৫ তারিখে সকাল ১০টায় মাসিক সাধারণ সভা অনুষ্ঠিত হবে। সকল সদস্যদের উপস্থিতি কাম্য।",
      date: "১০ জানুয়ারি, ২০২৫",
      type: "সভা",
      priority: "high",
      isNew: true,
    },
    {
      id: 2,
      title: "নতুন সদস্য নিবন্ধন",
      content:
        "নতুন সদস্য নিবন্ধনের জন্য আবেদন গ্রহণ করা হচ্ছে। আগ্রহী ব্যক্তিরা যোগাযোগ করুন। প্রয়োজনীয় কাগজপত্র: জাতীয় পরিচয়পত্র, ছবি, শিক্ষাগত যোগ্যতার সনদ।",
      date: "৮ জানুয়ারি, ২০২৫",
      type: "নিবন্ধন",
      priority: "medium",
      isNew: false,
    },
    {
      id: 3,
      title: "দান সংগ্রহ কর্মসূচি",
      content: "শীতবস্ত্র বিতরণের জন্য দান সংগ্রহ কর্মসূচি চলমান। আপনার অংশগ্রহণ কাম্য। লক্ষ্য: ৫০০ পরিবারের জন্য শীতবস্ত্র সংগ্রহ।",
      date: "৫ জানুয়ারি, ২০২৫",
      type: "দান",
      priority: "high",
      isNew: true,
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

  const toggleExpand = (id: number) => {
    setExpandedNotice(expandedNotice === id ? null : id)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-500 bg-red-50"
      case "medium":
        return "border-yellow-500 bg-yellow-50"
      default:
        return "border-blue-500 bg-blue-50"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "সভা":
        return <Calendar className="h-5 w-5 text-blue-600" />
      case "নিবন্ধন":
        return <Bell className="h-5 w-5 text-yellow-600" />
      case "দান":
        return <AlertCircle className="h-5 w-5 text-red-600" />
      default:
        return <Bell className="h-5 w-5 text-gray-600" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "সভা":
        return "bg-blue-100 text-blue-800"
      case "নিবন্ধন":
        return "bg-yellow-100 text-yellow-800"
      case "দান":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4 font-amiri animate-fade-in-up">
            গুরুত্বপূর্ণ ঘোষণা
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto animate-fade-in-up delay-200">
            আমাদের সাম্প্রতিক ঘোষণা ও আপডেটসমূহ
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {notices.map((notice, index) => (
            <div
              key={notice.id}
              className={`transform transition-all duration-500 ease-out ${
                visibleNotices.includes(index) ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                className={`card border-l-4 ${getPriorityColor(notice.priority)} hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`p-2 rounded-lg ${
                      notice.priority === "high"
                        ? "bg-red-100"
                        : notice.priority === "medium"
                          ? "bg-yellow-100"
                          : "bg-blue-100"
                    } animate-pulse-slow`}
                  >
                    {getTypeIcon(notice.type)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold text-navy-800">{notice.title}</h3>
                        {notice.isNew && (
                          <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">
                            নতুন
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">{notice.date}</span>
                    </div>

                    <p
                      className={`text-gray-600 leading-relaxed transition-all duration-300 ${
                        expandedNotice === notice.id ? "" : "line-clamp-2"
                      }`}
                    >
                      {notice.content}
                    </p>

                    <div className="flex items-center justify-between mt-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(notice.type)}`}
                      >
                        {notice.type}
                      </span>

                      <button
                        onClick={() => toggleExpand(notice.id)}
                        className="flex items-center text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors duration-200"
                      >
                        {expandedNotice === notice.id ? (
                          <>
                            কম দেখুন <ChevronUp className="h-4 w-4 ml-1" />
                          </>
                        ) : (
                          <>
                            আরো দেখুন <ChevronDown className="h-4 w-4 ml-1" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Animated border effect */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating notification indicator */}
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-emerald-600 text-white p-3 rounded-full shadow-lg animate-bounce">
            <Bell className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {notices.filter((n) => n.isNew).length}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
