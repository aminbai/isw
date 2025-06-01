import Link from "next/link"
import { Heart, Users, HandIcon as Hands, ArrowDown } from "lucide-react"
import { HeroSlideshow } from "./hero-slideshow"

export function Hero() {
  return (
    <>
      {/* Main Hero Section - Full Width */}
      <section className="relative w-full min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 islamic-pattern overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-emerald-200/20 to-transparent rounded-full animate-spin-slow"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-200/20 to-transparent rounded-full animate-spin-slow-reverse"></div>
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto text-center">
            {/* Organization Title with Enhanced Animation */}
            <div className="mb-12 space-y-6">
              <div className="inline-block">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-navy-800 mb-6 font-amiri leading-tight">
                  <span className="inline-block animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                    ইসলামী
                  </span>{" "}
                  <span className="inline-block animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                    সমাজকল্যাণ
                  </span>{" "}
                  <span className="inline-block animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                    পরিষদ
                  </span>
                </h1>
                <div
                  className="w-32 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto rounded-full animate-fade-in-up"
                  style={{ animationDelay: "0.7s" }}
                ></div>
              </div>

              <p
                className="text-xl md:text-3xl lg:text-4xl text-gray-600 max-w-5xl mx-auto leading-relaxed animate-fade-in-up"
                style={{ animationDelay: "0.9s" }}
              >
                গ্রামীণ সমাজের উন্নয়নে নিবেদিত একটি অরাজনৈতিক ও অলাভজনক সংস্থা
              </p>
            </div>

            {/* Enhanced Action Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-up"
              style={{ animationDelay: "1.1s" }}
            >
              <Link
                href="/donate"
                className="group relative bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xl px-12 py-5 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl overflow-hidden"
              >
                <span className="relative z-10">দান করুন</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Link>

              <Link
                href="/join-campaign"
                className="group relative bg-white hover:bg-gray-50 text-emerald-600 border-2 border-emerald-600 font-bold text-xl px-12 py-5 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl overflow-hidden"
              >
                <span className="relative z-10">ক্যাম্পেইনে যোগদান করুন</span>
                <div className="absolute inset-0 bg-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>

            {/* Enhanced Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
              {[
                {
                  icon: Heart,
                  title: "সেবার মানসিকতা",
                  description: "মানবতার সেবায় নিবেদিত",
                  color: "emerald",
                  delay: "1.3s",
                },
                {
                  icon: Users,
                  title: "সমাজ উন্নয়ন",
                  description: "গ্রামীণ সমাজের সার্বিক উন্নতি",
                  color: "blue",
                  delay: "1.5s",
                },
                {
                  icon: Hands,
                  title: "সহযোগিতা",
                  description: "পারস্পরিক সহায়তা ও সহযোগিতা",
                  color: "purple",
                  delay: "1.7s",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group text-center animate-fade-in-up hover:transform hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: feature.delay }}
                >
                  <div
                    className={`bg-${feature.color}-100 group-hover:bg-${feature.color}-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:shadow-lg`}
                  >
                    <feature.icon
                      className={`h-10 w-10 text-${feature.color}-600 group-hover:scale-110 transition-transform duration-300`}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-navy-800 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Scroll Down Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="flex flex-col items-center text-gray-600">
                <span className="text-sm mb-2">আরও দেখুন</span>
                <ArrowDown className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Width Hero Slideshow */}
      <HeroSlideshow />
    </>
  )
}
