import { Target, Eye, Award, Users, Heart, HandIcon as Hands } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4 font-amiri">আমাদের সম্পর্কে</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            ইসলামী মূল্যবোধের ভিত্তিতে গড়ে ওঠা আমাদের সংস্থা গ্রামীণ সমাজের কল্যাণে নিরলসভাবে কাজ করে যাচ্ছে
          </p>
        </div>

        {/* Organization Overview */}
        <div className="card mb-12">
          <h2 className="text-2xl font-bold text-navy-800 mb-6 font-amiri">সংস্থার পরিচয়</h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="leading-relaxed mb-4">
              ইসলামী সমাজকল্যাণ পরিষদ একটি অরাজনৈতিক ও অলাভজনক সংস্থা যা ২০২৫ সালে প্রতিষ্ঠিত হয়েছে। আমাদের মূল লক্ষ্য হলো গ্রামীণ সমাজের
              সার্বিক উন্নয়ন এবং ইসলামী মূল্যবোধের প্রচার ও প্রসার।
            </p>
            <p className="leading-relaxed mb-4">
              আমরা বিশ্বাস করি যে, একটি আদর্শ সমাজ গঠনের জন্য শিক্ষা, স্বাস্থ্য, আর্থিক উন্নয়ন এবং নৈতিক মূল্যবোধের সমন্বয় প্রয়োজন। এই
              লক্ষ্যে আমরা বিভিন্ন সমাজসেবামূলক কার্যক্রম পরিচালনা করি।
            </p>
            <p className="leading-relaxed">
              আমাদে����� সকল কার্যক্রম স্বচ্ছতা, জবাবদিহিতা এবং ইসলামী শরীয়াহর নির্দেশনার ভিত্তিতে পরিচালিত হয়।
            </p>
          </div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
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

        {/* Our Work Areas */}
        <div className="card mb-12">
          <h2 className="text-2xl font-bold text-navy-800 mb-6 font-amiri">আমাদের কার্যক্রম</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start space-x-4">
              <div className="bg-emerald-100 p-3 rounded-lg">
                <Heart className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-semibold text-navy-800 mb-2">দারিদ্র্য বিমোচন</h4>
                <p className="text-sm text-gray-600">দরিদ্র পরিবারগুলোকে আর্থিক সহায়তা ও কর্মসংস্থানের ব্যবস্থা</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-navy-800 mb-2">শিক্ষা উন্নয়ন</h4>
                <p className="text-sm text-gray-600">বিনামূল্যে শিক্ষা উপকরণ বিতরণ ও শিক্ষা বৃত্তি প্রদান</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Hands className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-navy-800 mb-2">স্বাস্থ্য সেবা</h4>
                <p className="text-sm text-gray-600">বিনামূল্যে চিকিৎসা সেবা ও ওষুধ বিতরণ কর্মসূচি</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h4 className="font-semibold text-navy-800 mb-2">দক্ষতা উন্নয়ন</h4>
                <p className="text-sm text-gray-600">বিভিন্ন ট্রেড ও কারিগরি প্রশিক্ষণ কর্মসূচি</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-navy-800 mb-2">ইসলামী শিক্ষা</h4>
                <p className="text-sm text-gray-600">কুরআন ও হাদিসের শিক্ষা এবং নৈতিক মূল্যবোধ প্রচার</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-red-100 p-3 rounded-lg">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h4 className="font-semibold text-navy-800 mb-2">জরুরি সহায়তা</h4>
                <p className="text-sm text-gray-600">প্রাকৃতিক দুর্যোগ ও জরুরি অবস্থায় ত্রাণ বিতরণ</p>
              </div>
            </div>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="card">
          <h2 className="text-2xl font-bold text-navy-800 mb-6 font-amiri">নেতৃত্ব</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-gray-200 w-24 h-24 rounded-full mx-auto mb-4"></div>
              <h4 className="font-semibold text-navy-800">মোহাম্মদ সাইফুল ইসলাম</h4>
              <p className="text-sm text-gray-600">সভাপতি</p>
            </div>

            <div className="text-center">
              <div className="bg-gray-200 w-24 h-24 rounded-full mx-auto mb-4"></div>
              <h4 className="font-semibold text-navy-800">মোহাম্মদ পারবেজ উদ্দিন</h4>
              <p className="text-sm text-gray-600">সাধারণ সম্পাদক</p>
            </div>

            <div className="text-center">
              <div className="bg-gray-200 w-24 h-24 rounded-full mx-auto mb-4"></div>
              <h4 className="font-semibold text-navy-800">মোহাম্মদ জসিম উদ্দিন</h4>
              <p className="text-sm text-gray-600">কোষাধ্যক্ষ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
