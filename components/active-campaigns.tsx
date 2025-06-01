import Link from "next/link"
import { Calendar, Users, Target } from "lucide-react"

export function ActiveCampaigns() {
  const campaigns = [
    {
      id: 1,
      title: "শীতবস্ত্র বিতরণ ক্যাম্পেইন",
      description: "দরিদ্র পরিবারগুলোর মধ্যে শীতবস্ত্র বিতরণের জন্য আমাদের বার্ষিক ক্যাম্পেইন।",
      target: "৫০০ পরিবার",
      deadline: "৩১ ডিসেম্বর, ২০২৪",
      participants: 45,
      status: "চলমান",
    },
    {
      id: 2,
      title: "বিনামূল্যে চিকিৎসা সেবা",
      description: "গ্রামের মানুষদের জন্য বিনামূল্যে চিকিৎসা সেবা ও ওষুধ বিতরণ কর্মসূচি।",
      target: "১০০০ রোগী",
      deadline: "১৫ জানুয়ারি, ২০২৫",
      participants: 32,
      status: "চলমান",
    },
    {
      id: 3,
      title: "শিক্ষা উপকরণ বিতরণ",
      description: "দরিদ্র শিক্ষার্থীদের মধ্যে বই, খাতা ও অন্যান্য শিক্ষা উপকরণ বিতরণ।",
      target: "২০০ শিক্ষার্থী",
      deadline: "২৮ ফেব্রুয়ারি, ২০২৫",
      participants: 28,
      status: "শীঘ্রই",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4 font-amiri">চলমান ক্যাম্পেইনসমূহ</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            আমাদের বর্তমান ক্যাম্পেইনগুলোতে অংশগ্রহণ করুন এবং সমাজসেবায় অবদান রাখুন
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="card hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    campaign.status === "চলমান" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {campaign.status}
                </span>
              </div>

              <h3 className="text-xl font-bold text-navy-800 mb-3">{campaign.title}</h3>

              <p className="text-gray-600 mb-4 leading-relaxed">{campaign.description}</p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-500">
                  <Target className="h-4 w-4 mr-2" />
                  লক্ষ্য: {campaign.target}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  শেষ তারিখ: {campaign.deadline}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-2" />
                  অংশগ্রহণকারী: {campaign.participants} জন
                </div>
              </div>

              <Link href={`/join-campaign?campaign=${campaign.id}`} className="btn-primary w-full text-center block">
                যোগদান করুন
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/campaigns" className="btn-secondary">
            সকল ক্যাম্পেইন দেখুন
          </Link>
        </div>
      </div>
    </section>
  )
}
