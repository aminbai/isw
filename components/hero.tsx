import Link from "next/link"
import { Heart, Users, HandIcon as Hands } from "lucide-react"
import { HeroSlideshow } from "./hero-slideshow"

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-emerald-50 to-blue-50 islamic-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-navy-800 mb-2 font-amiri">হাছিরপাড়া ইসলামী সমাজকল্যাণ পরিষদ</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            গ্রামীণ সমাজের উন্নয়নে নিবেদিত একটি অরাজনৈতিক ও অলাভজনক সংস্থা
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/donate" className="btn-primary text-lg px-8 py-3">
              দান করুন
            </Link>
            <Link href="/join-campaign" className="btn-secondary text-lg px-8 py-3">
              ক্যাম্পেইনে যোগদান করুন
            </Link>
          </div>

          {/* Hero Slideshow - Right after buttons */}
          <div className="mb-16">
            <HeroSlideshow />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">সেবার মানসিকতা</h3>
              <p className="text-gray-600">মানবতার সেবায় নিবেদিত</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">সমাজ উন্নয়ন</h3>
              <p className="text-gray-600">গ্রামীণ সমাজের সার্বিক উন্নতি</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Hands className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">সহযোগিতা</h3>
              <p className="text-gray-600">পারস্পরিক সহায়তা ও সহযোগিতা</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
