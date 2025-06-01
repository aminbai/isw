"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"

const slides = [
  {
    id: 1,
    image: "/placeholder.svg?height=800&width=1920",
    title: "শিক্ষা কার্যক্রম",
    description: "গ্রামীণ শিশুদের শিক্ষার আলো ছড়িয়ে দিচ্ছি। আমাদের বিনামূল্যে শিক্ষা কার্যক্রমে অংশগ্রহণ করুন।",
    stats: "৫০০+ শিক্ষার্থী",
    color: "from-blue-600 to-purple-700",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=800&width=1920",
    title: "স্বাস্থ্য সেবা",
    description: "বিনামূল্যে চিকিৎসা সেবা প্রদান করে আমরা গ্রামীণ জনগোষ্ঠীর স্বাস্থ্য সেবা নিশ্চিত করছি।",
    stats: "১০০০+ রোগী সেবা",
    color: "from-emerald-600 to-teal-700",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=800&width=1920",
    title: "দারিদ্র্য বিমোচন",
    description: "কর্মসংস্থান সৃষ্টি ও আর্থিক সহায়তার মাধ্যমে দারিদ্র্য বিমোচনে কাজ করছি।",
    stats: "৩০০+ পরিবার উপকৃত",
    color: "from-orange-600 to-red-700",
  },
  {
    id: 4,
    image: "/placeholder.svg?height=800&width=1920",
    title: "সামাজিক কাজ",
    description: "সমাজের সকল শ্রেণীর মানুষের কল্যাণে আমাদের বিভিন্ন সামাজিক কর্মসূচি পরিচালিত হচ্ছে।",
    stats: "২০+ ক্যাম্পেইন সম্পন্ন",
    color: "from-purple-600 to-pink-700",
  },
]

export function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            {/* Background Image with Parallax Effect */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transform transition-transform duration-1000"
              style={{
                backgroundImage: `url(${slide.image})`,
                transform: index === currentSlide ? "scale(1)" : "scale(1.1)",
              }}
            />

            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-80`} />

            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: "40px 40px",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-white space-y-8">
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`transition-all duration-700 ${
                      index === currentSlide
                        ? "opacity-100 transform translate-x-0"
                        : "opacity-0 transform translate-x-8"
                    }`}
                    style={{ transitionDelay: index === currentSlide ? "300ms" : "0ms" }}
                  >
                    {index === currentSlide && (
                      <>
                        <div className="space-y-4">
                          <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                            {slide.stats}
                          </div>
                          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-amiri leading-tight">
                            {slide.title}
                          </h2>
                          <p className="text-xl md:text-2xl leading-relaxed opacity-90 max-w-2xl">
                            {slide.description}
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                          <button className="bg-white text-gray-900 hover:bg-gray-100 font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                            আরও জানুন
                          </button>
                          <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
                            যোগদান করুন
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* Right Content - Statistics */}
              <div className="hidden lg:block">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { number: "৫০০+", label: "উপকারভোগী পরিবার" },
                    { number: "২০+", label: "সফল প্রকল্প" },
                    { number: "১০০০+", label: "সেবা প্রাপ্ত মানুষ" },
                    { number: "৫+", label: "বছরের অভিজ্ঞতা" },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center text-white transform transition-all duration-700 ${
                        isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                      }`}
                      style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                    >
                      <div className="text-3xl md:text-4xl font-bold font-amiri mb-2">{stat.number}</div>
                      <div className="text-sm opacity-90">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* Arrow Navigation */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-300 transform hover:scale-110 pointer-events-auto group"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6 group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-300 transform hover:scale-110 pointer-events-auto group"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6 group-hover:scale-110 transition-transform" />
        </button>

        {/* Bottom Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-6 pointer-events-auto">
          {/* Slide Indicators */}
          <div className="flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 ${
                  index === currentSlide
                    ? "w-12 h-3 bg-white rounded-full"
                    : "w-3 h-3 bg-white/50 hover:bg-white/75 rounded-full"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={toggleAutoPlay}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110"
            aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isAutoPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-white/20 pointer-events-none">
          <div
            className="h-full bg-white transition-all duration-100 ease-linear"
            style={{
              width: isAutoPlaying ? `${((currentSlide + 1) / slides.length) * 100}%` : "0%",
            }}
          />
        </div>

        {/* Slide Counter */}
        <div className="absolute top-8 right-8 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium pointer-events-none">
          {String(currentSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
    </section>
  )
}
