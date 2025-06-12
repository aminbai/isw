import Link from "next/link"
import { Calendar, Users, Target } from "lucide-react"

export default function CampaignsPage() {
  const campaigns = [
    {
      id: 1,
      title: "শীতবস্ত্র বিতরণ ক্যাম্পেইন",
      description:
        "দরিদ্র পরিবারগুলোর মধ্যে শীতবস্ত্র বিতরণের জন্য আমাদের বার্ষিক ক্যাম্পেইন। এই ক্যাম্পেইনের মাধ্যমে আমরা ৫০০টি পরিবারের কাছে কম্বল, চাদর ও গরম কাপড় পৌঁছে দেওয়ার লক্ষ্য রেখেছি।",
      target: "৫০০ পরিবার",
      deadline: "৩১ ডিসেম্বর, ২০২৫",
      participants: 45,
      status: "চলমান",
      progress: 75,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 2,
      title: "বিনামূল্যে চিকিৎসা সেবা",
      description:
        "গ্রামের মানুষদের জন্য বিনামূল্যে চিকিৎসা সেবা ও ওষুধ বিতরণ কর্মসূচি। অভিজ্ঞ ডাক্তার ও নার্সদের নিয়ে আমরা সাপ্তাহিক চিকিৎসা ক্যাম্প পরিচালনা করি।",
      target: "১০০০ রোগী",
      deadline: "১৫ জানুয়ারি, ২০২৫",
      participants: 32,
      status: "চলমান",
      progress: 60,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 3,
      title: "শিক্ষা উপকরণ বিতরণ",
      description:
        "দরিদ্র শিক্ষার্থীদের মধ্যে বই, খাতা ও অন্যান্য শিক্ষা উপকরণ বিতরণ। নতুন শিক্ষাবর্ষের শুরুতে আমরা এই কর্মসূচি পরিচালনা করি।",
      target: "২০০ শিক্ষার্থী",
      deadline: "২৮ ফেব্রুয়ারি, ২০২৫",
      participants: 28,
      status: "শীঘ্রই",
      progress: 25,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 4,
      title: "ইফতার বিতরণ কর্মসূচি",
      description: "রমজান মাসে দরিদ্র ও অসহায় মানুষদের মধ্যে ইফতার বিতরণ কর্মসূচি। প্রতিদিন ১০০+ পরিবারে ইফতার পৌঁছে দেওয়া হয়।",
      target: "৩০০০ ইফতার",
      deadline: "রমজান মাস",
      participants: 0,
      status: "আসছে",
      progress: 0,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 5,
      title: "কুরবানীর গোশত বিতরণ",
      description: "ঈদুল আযহার সময় কুরবানীর গোশত দরিদ্র পরিবারগুলোর মধ্যে বিতরণ করা হয়। এটি আমাদের বার্ষিক একটি গুরুত্বপূর্ণ কর্মসূচি।",
      target: "৮০০ পরিবার",
      deadline: "ঈদুল আযহা",
      participants: 0,
      status: "আসছে",
      progress: 0,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 6,
      title: "বৃক্ষরোপণ কর্মসূচি",
      description: "পরিবেশ রক্ষা ও সবুজায়নের জন্য বৃক্ষরোপণ কর্মসূচি। গ্রামের বিভিন্ন স্থানে ফলদ ও বনজ গাছ রোপণ করা হয়।",
      target: "১০০০ গাছ",
      deadline: "বর্ষা মৌসুম",
      participants: 0,
      status: "আসছে",
      progress: 0,
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4 font-amiri">আমাদের ক্যাম্পেইনসমূহ</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">সমাজের কল্যাণে আমাদের বিভিন্ন ক্যাম্পেইন ও কর্মসূচি</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="card hover:shadow-lg transition-shadow duration-300">
              <img
                src={campaign.image || "/placeholder.svg"}
                alt={campaign.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    campaign.status === "চলমান"
                      ? "bg-emerald-100 text-emerald-800"
                      : campaign.status === "শীঘ্রই"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {campaign.status}
                </span>
                {campaign.progress > 0 && <span className="text-sm text-gray-500">{campaign.progress}% সম্পন্ন</span>}
              </div>

              <h3 className="text-xl font-bold text-navy-800 mb-3">{campaign.title}</h3>

              <p className="text-gray-600 mb-4 leading-relaxed text-sm">{campaign.description}</p>

              {campaign.progress > 0 && (
                <div className="mb-4">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${campaign.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

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

              <Link
                href={`/join-campaign?campaign=${campaign.id}`}
                className={`w-full text-center block py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                  campaign.status === "আসছে" ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "btn-primary"
                }`}
              >
                {campaign.status === "আসছে" ? "শীঘ্রই আসছে" : "যোগদান করুন"}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
