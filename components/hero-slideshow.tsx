"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    id: 1,
    image: "/placeholder.svg?height=600&width=800",
    title: "শিক্ষা কার্যক্রম",
    description: "গ্রামীণ শিশুদের শিক্ষার আলো ছড়িয়ে দিচ্ছি",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=600&width=800",
    title: "স্বাস্থ্য সেবা",
    description: "বিনামূল্যে চিকিৎসা সেবা প্রদান",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=600&width=800",
    title: "দারিদ্র্য বিমোচন",
    description: "কর্মসংস্থান সৃষ্টি ও আর্থিক সহায়তা",
  },
  {
    id: 4,
    image: "/placeholder.svg?height=600&width=800",
    title: "সামাজিক কাজ",
    description: "সমাজের সকল শ্রেণীর মানুষের কল্যাণে কাজ",
  },
]

export function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)

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

  return (
    <section className="relative bg-gradient-to-br from-emerald-50 to-blue-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div
          className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Slides */}
          <div className="relative w-full h-full">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  index === currentSlide
                    ? "opacity-100 transform translate-x-0"
                    : index === currentSlide - 1 || (currentSlide === 0 && index === slides.length - 1)
                      ? "opacity-0 transform -translate-x-full"
                      : "opacity-0 transform translate-x-full"
                }`}
              >
                <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="max-w-2xl">
                    <h3
                      className={`text-2xl md:text-4xl font-bold mb-4 font-amiri transition-all duration-700 delay-300 ${
                        index === currentSlide
                          ? "opacity-100 transform translate-y-0"
                          : "opacity-0 transform translate-y-8"
                      }`}
                    >
                      {slide.title}
                    </h3>
                    <p
                      className={`text-lg md:text-xl leading-relaxed transition-all duration-700 delay-500 ${
                        index === currentSlide
                          ? "opacity-100 transform translate-y-0"
                          : "opacity-0 transform translate-y-8"
                      }`}
                    >
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 group"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 group-hover:scale-110 transition-transform" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-white/20">
            <div
              className="h-full bg-emerald-400 transition-all duration-100 ease-linear"
              style={{
                width: isAutoPlaying ? `${((currentSlide + 1) / slides.length) * 100}%` : "0%",
              }}
            />
          </div>
        </div>

        {/* Slide Counter */}
        <div className="text-center mt-6">
          <span className="text-gray-600 text-sm font-medium">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>
      </div>
    </section>
  )
}
