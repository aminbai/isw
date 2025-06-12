"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Heart, Users, HandIcon as Hands, ChevronLeft, ChevronRight } from "lucide-react"

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: "/placeholder.svg?height=600&width=800&text=মুসলিম+যুবকরা+কুরআন+পড়ছে",
      title: "ইসলামী শিক্ষায় আলোকিত সমাজ",
      subtitle: "কুরআন ও হাদিসের আলোকে নৈতিক মূল্যবোধ গঠন",
      description: "আমাদের শিক্ষা কর্মসূচিতে অংশগ্রহণ করুন এবং ইসলামী জ্ঞানে সমৃদ্ধ হন",
    },
    {
      image: "/placeholder.svg?height=600&width=800&text=মুসলিম+যুবকরা+সেবা+করছে",
      title: "মানবসেবায় নিবেদিত",
      subtitle: "দরিদ্র ও অসহায়দের পাশে দাঁড়ানো",
      description: "আমাদের সেবামূলক কার্যক্রমে যোগ দিন এবং সমাজের কল্যাণে অবদান রাখুন",
    },
    {
      image: "/placeholder.svg?height=600&width=800&text=মুসলিম+যুবকরা+দান+করছে",
      title: "দানের মাধ্যমে পুণ্য অর্জন",
      subtitle: "সদকা ও যাকাতের গুরুত্ব",
      description: "আল্লাহর সন্তুষ্টি অর্জনের জন্য দান করুন এবং সওয়াব লাভ করুন",
    },
    {
      image: "/placeholder.svg?height=600&width=800&text=মুসলিম+যুবকরা+একসাথে",
      title: "ঐক্যবদ্ধ মুসলিম সমাজ",
      subtitle: "ভ্রাতৃত্ব ও সহযোগিতার বন্ধন",
      description: "একসাথে মিলে গড়ি আদর্শ ইসলামী সমাজ",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <>
      {/* Original Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 to-blue-50 islamic-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-navy-800 mb-6 font-amiri">হাছিরপাড়া ইসলামী সমাজকল্যাণ পরিষদ</h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              আমাদের হাছিরপাড়া সমাজের উন্নয়নে নিবেদিত একটি অরাজনৈতিক ও অলাভজনক সংস্থা
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/donate" className="btn-primary text-lg px-8 py-3">
                দান করুন
              </Link>
              <Link href="/join-campaign" className="btn-secondary text-lg px-8 py-3">
                ক্যাম্পেইনে যোগদান করুন
              </Link>
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

      {/* New Dynamic Slideshow Hero Section */}
      <section className="relative h-[600px] overflow-hidden bg-gray-900">
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
            >
              <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>
          ))}
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <div className="transform transition-all duration-700 ease-out">
              <h2 className="text-4xl md:text-6xl font-bold mb-4 font-amiri animate-fade-in-up">
                {slides[currentSlide].title}
              </h2>
              <h3 className="text-xl md:text-2xl mb-6 text-emerald-300 animate-fade-in-up delay-200">
                {slides[currentSlide].subtitle}
              </h3>
              <p className="text-lg md:text-xl mb-8 leading-relaxed animate-fade-in-up delay-400">
                {slides[currentSlide].description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-600">
                <Link
                  href="/donate"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  এখনই দান করুন
                </Link>
                <Link
                  href="/join-campaign"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  আমাদের সাথে যোগ দিন
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-emerald-500 scale-125" : "bg-white bg-opacity-50 hover:bg-opacity-75"
              }`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white bg-opacity-20">
          <div
            className="h-full bg-emerald-500 transition-all duration-300 ease-linear"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          />
        </div>
      </section>
    </>
  )
}
