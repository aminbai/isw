import { Bell, Calendar, AlertCircle } from "lucide-react"

export function Notices() {
  const notices = [
    {
      id: 1,
      title: "মাসিক সাধারণ সভা",
      content: "আগামী ১৫ জানুয়ারি, ২০২৫ তারিখে সকাল ১০টায় মাসিক সাধারণ সভা অনুষ্ঠিত হবে।",
      date: "১০ জানুয়ারি, ২০২৫",
      type: "সভা",
      priority: "high",
    },
    {
      id: 2,
      title: "নতুন সদস্য নিবন্ধন",
      content: "নতুন সদস্য নিবন্ধনের জন্য আবেদন গ্রহণ করা হচ্ছে। আগ্রহী ব্যক্তিরা যোগাযোগ করুন।",
      date: "৮ জানুয়ারি, ২০২৫",
      type: "নিবন্ধন",
      priority: "medium",
    },
    {
      id: 3,
      title: "দান সংগ্রহ কর্মসূচি",
      content: "শীতবস্ত্র বিতরণের জন্য দান সংগ্রহ কর্মসূচি চলমান। আপনার অংশগ্রহণ কাম্য।",
      date: "৫ জানুয়ারি, ২০২৫",
      type: "দান",
      priority: "high",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4 font-amiri">গুরুত্বপূর্ণ ঘোষণা</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">আমাদের সাম্প্রতিক ঘোষণা ও আপডেটসমূহ</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {notices.map((notice) => (
            <div key={notice.id} className="card border-l-4 border-l-emerald-500">
              <div className="flex items-start space-x-4">
                <div
                  className={`p-2 rounded-lg ${
                    notice.priority === "high"
                      ? "bg-red-100"
                      : notice.priority === "medium"
                        ? "bg-yellow-100"
                        : "bg-blue-100"
                  }`}
                >
                  {notice.type === "সভা" && <Calendar className="h-5 w-5 text-blue-600" />}
                  {notice.type === "নিবন্ধন" && <Bell className="h-5 w-5 text-yellow-600" />}
                  {notice.type === "দান" && <AlertCircle className="h-5 w-5 text-red-600" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-navy-800">{notice.title}</h3>
                    <span className="text-sm text-gray-500">{notice.date}</span>
                  </div>

                  <p className="text-gray-600 leading-relaxed">{notice.content}</p>

                  <div className="mt-3">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        notice.type === "সভা"
                          ? "bg-blue-100 text-blue-800"
                          : notice.type === "নিবন্ধন"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {notice.type}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
