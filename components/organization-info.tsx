import { Target, Eye, Award } from "lucide-react"

export function OrganizationInfo() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4 font-amiri">আমাদের পরিচয়</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            ইসলামী মূল্যবোধের ভিত্তিতে গড়ে ওঠা আমাদের সংস্থা গ্রামীণ সমাজের কল্যাণে কাজ করে যাচ্ছে
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="card text-center">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Eye className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-navy-800 mb-4">আমাদের দৃষ্টিভঙ্গি</h3>
            <p className="text-gray-600 leading-relaxed">
              একটি আদর্শ ইসলামী সমাজ গঠন যেখানে সকলে শান্তি, সমৃদ্ধি ও ন্যায়বিচারের মধ্যে বসবাস করবে। শিক্ষা, স্বাস্থ্য ও আর্থিক উন্নয়নের
              মাধ্যমে একটি স্বনির্ভর সমাজ প্রতিষ্ঠা করা।
            </p>
          </div>

          <div className="card text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-navy-800 mb-4">আমাদের লক্ষ্য</h3>
            <p className="text-gray-600 leading-relaxed">
              গ্রামীণ জনগোষ্ঠীর শিক্ষা, স্বাস্থ্য, আর্থিক ও সামাজিক উন্নয়নে কাজ করা। দরিদ্র ও অসহায় মানুষদের পাশে দাঁড়ানো এবং তাদের জীবনযাত্রার মান
              উন্নয়নে সহায়তা করা।
            </p>
          </div>

          <div className="card text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-navy-800 mb-4">আমাদের মূল্যবোধ</h3>
            <p className="text-gray-600 leading-relaxed">
              ইসলামী শিক্ষা ও মূল্যবোধের প্রচার ও প্রসার। সততা, ন্যায়বিচার, পারস্পরিক সহযোগিতা ও মানবিক মূল্যবোধের ভিত্তিতে সমাজ গঠন।
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
