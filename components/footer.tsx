import { ChurchIcon as Mosque, Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-navy-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-emerald-600 p-2 rounded-lg">
                <Mosque className="h-6 w-6 text-white" />
              </div>
              <div className="text-xl font-bold font-amiri">হাছিরপাড়া ইসলামী সমাজকল্যাণ পরিষদ</div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              আমাদের হাছিরপাড়া সমাজের কল্যাণে নিবেদিত একটি অরাজনৈতিক ও অলাভজনক সংস্থা। ইসলামী মূল্যবোধের ভিত্তিতে সমাজসেবায় আমরা
              প্রতিশ্রুতিবদ্ধ।
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">যোগাযোগ</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-emerald-400" />
                <span className="text-sm">+৮৮০ ১৭১২-৩৪৫৬৭৮</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-emerald-400" />
                <span className="text-sm">info@islamicwelfare.org</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-emerald-400" />
                <span className="text-sm">গ্রাম: সুখছড়ী হাছির পাড়া, উপজেলা: লোহাগাড়া, জেলা: চট্টগ্রাম</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">গুরুত্বপূর্ণ লিংক</h3>
            <div className="space-y-2">
              <a href="/about" className="block text-sm text-gray-300 hover:text-emerald-400 transition-colors">
                আমাদের সম্পর্কে
              </a>
              <a href="/campaigns" className="block text-sm text-gray-300 hover:text-emerald-400 transition-colors">
                চলমান ক্যাম্পেইন
              </a>
              <a href="/donate" className="block text-sm text-gray-300 hover:text-emerald-400 transition-colors">
                দান করুন
              </a>
              <a href="/admin" className="block text-sm text-gray-300 hover:text-emerald-400 transition-colors">
                অ্যাডমিন প্যানেল
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">© ২০২৪ ইসলামী সমাজকল্যাণ পরিষদ। সকল অধিকার সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  )
}
