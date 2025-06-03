"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChurchIcon as Mosque } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: "হোম", href: "/" },
    { name: "আমাদের সম্পর্কে", href: "/about" },
    { name: "ক্যাম্পেইন", href: "/campaigns" },
    { name: "ভর্তির আবেদন", href: "/admission" },
    { name: "ক্যাম্পেইনে যোগদান", href: "/join-campaign" },
    { name: "দান করুন", href: "/donate" },
    { name: "আর্থিক ব্যবস্থাপনা", href: "/financial-management" },
    { name: "লগইন", href: "/login" },
  ]

  return (
    <nav className="bg-white shadow-lg border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-emerald-600 p-2 rounded-lg">
                <Mosque className="h-6 w-6 text-white" />
              </div>
              <div className="text-x1 font-bold text-navy-400 font-amiri"> হাছিরপাড়া ইসলামী সমাজকল্যাণ পরিষদ</div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-emerald-600 focus:outline-none focus:text-emerald-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-emerald-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
