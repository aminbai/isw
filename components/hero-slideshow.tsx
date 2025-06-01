"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play, Pause, Users, Heart, BookOpen, Stethoscope } from "lucide-react"

const slides = [
  {
    id: 1,
    image: "/placeholder.svg?height=600&width=800",
    title: "শিক্ষা কার্যক্রম",
    description: "গ্রামীণ শিশুদের শিক্ষার আলো ছড়িয়ে দিচ্ছি। আমাদের বিনামূল্যে শিক্ষা কার্যক্রমে অংশগ্রহণ করুন।",
    stats: "৫০০+ শিক্ষার্থী",
    icon: BookOpen,
    color: "from-blue-500 to-indigo-600",
    accent: "blue",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=600&width=800",
    title: "স্বাস্থ্য সেবা",
    description: "বিনামূল্যে চিকিৎসা সেবা প্রদান করে আমরা গ্রামীণ জনগোষ্ঠীর স্বাস্থ্য সেবা নিশ্চিত করছি।",
    stats: "১০০০+ রোগী সেবা",
    icon: Stethoscope,
    color: "from-emerald-500 to-teal-600",
    accent: "emerald",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=600&width=800",
    title: "দারিদ্র্য বিমোচন",
    description: "কর্মসংস্থান সৃষ্টি ও আর্থিক সহায়তার মাধ্যমে দারিদ্র্য বিমোচনে কাজ করছি।",
    stats: "৩০০+ পরিবার উপকৃত",
    icon: Heart,
    color: "from-rose-500 to-pink-600",
    accent: "rose",
  },
  {
    id: 4,
    image: "/placeholder.svg?height=600&width=800",
    title: "সামাজিক কাজ",
    description: "সমাজের সকল শ্রেণীর মানুষের কল্যাণে আমাদের বিভিন্ন সামাজিক কর্মসূচি পরিচালিত হচ্ছে।",
    stats: "২০+ ক্যাম্পেইন সম্পন্ন",
    icon: Users,
    color: "from-purple-500 to-violet-600",
    accent: "purple",
  },
]

export function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
      setProgress(0)
    }, 5000)

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 2))
    }, 100)

    return () => {
      clearInterval(interval)
      clearInterval(progressInterval)
    }
  }, [isAutoPlaying, currentSlide])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setProgress(0)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setProgress(0)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setProgress(0)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  const currentSlideData = slides[currentSlide]

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="relative h-96 md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800">
        {/* Background Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-80`} />
          </div>
        ))}

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="text-center text-white max-w-4xl">
            {/* Icon */}
            <div
              className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-6 transition-all duration-700 ${
                isLoaded ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
            >
              <currentSlideData.icon className="w-10 h-10" />
            </div>

            {/* Stats Badge */}
            <div
              className={`inline-block px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6 transition-all duration-700 delay-200 ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              {currentSlideData.stats}
            </div>

            {/* Title */}
            <h2
              className={`text-3xl md:text-5xl lg:text-6xl font-bold font-amiri mb-6 transition-all duration-700 delay-400 ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              {currentSlideData.title}
            </h2>

            {/* Description */}
            <p
              className={`text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto mb-8 transition-all duration-700 delay-600 ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              {currentSlideData.description}
            </p>

            {/* Action Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-800 ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              <button className="bg-white text-gray-900 hover:bg-gray-100 font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                আরও জানুন
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
                যোগদান করুন
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 group"
        >
          <ChevronLeft className="h-6 w-6 group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 group"
        >
          <ChevronRight className="h-6 w-6 group-hover:scale-110 transition-transform" />
        </button>

        {/* Bottom Controls */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-6">
          {/* Slide Indicators */}
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 ${
                  index === currentSlide
                    ? "w-8 h-3 bg-white rounded-full"
                    : "w-3 h-3 bg-white/50 hover:bg-white/75 rounded-full"
                }`}
              />
            ))}
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={toggleAutoPlay}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110"
          >
            {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
        </div>

        {/* Progress Bar */}
        {isAutoPlaying && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
            <div
              className="h-full bg-white transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Slide Counter */}
        <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
          {String(currentSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </div>
      </div>
    </div>
  )
}
