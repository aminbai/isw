"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  Download,
  Search,
  Eye,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { getDonations, getAdmissions, getCampaignJoins } from "@/lib/firestore"

interface FinancialData {
  totalDonations: number
  totalExpenses: number
  netBalance: number
  monthlyDonations: number
  campaignFunds: number
  adminFees: number
}

interface Transaction {
  id: string
  type: "income" | "expense"
  category: string
  amount: number
  description: string
  date: string
  status: "completed" | "pending" | "cancelled"
}

export default function FinancialManagementPage() {
  const { user, loading, isAuthenticated } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [financialData, setFinancialData] = useState<FinancialData>({
    totalDonations: 0,
    totalExpenses: 0,
    netBalance: 0,
    monthlyDonations: 0,
    campaignFunds: 0,
    adminFees: 0,
  })
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [dateRange, setDateRange] = useState("this-month")

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }
  }, [loading, isAuthenticated, router])

  useEffect(() => {
    if (isAuthenticated) {
      fetchFinancialData()
    }
  }, [isAuthenticated])

  const fetchFinancialData = async () => {
    setIsLoading(true)
    try {
      const [donationsResult, admissionsResult, campaignJoinsResult] = await Promise.all([
        getDonations(),
        getAdmissions(),
        getCampaignJoins(),
      ])

      // Calculate financial data
      const donations = donationsResult.success ? donationsResult.data : []
      const totalDonations = donations.reduce((sum: number, donation: any) => sum + (donation.amount || 0), 0)

      // Sample expense data (in real app, this would come from database)
      const sampleExpenses = [
        { id: "1", amount: 15000, category: "শিক্ষা উপকরণ", description: "বই ও খাতা ক্রয়", date: "2024-01-15" },
        { id: "2", amount: 25000, category: "চিকিৎসা", description: "ওষুধ ক্রয়", date: "2024-01-10" },
        { id: "3", amount: 8000, category: "প্রশাসনিক", description: "অফিস খরচ", date: "2024-01-05" },
      ]

      const totalExpenses = sampleExpenses.reduce((sum, expense) => sum + expense.amount, 0)

      setFinancialData({
        totalDonations,
        totalExpenses,
        netBalance: totalDonations - totalExpenses,
        monthlyDonations: totalDonations * 0.3, // Sample calculation
        campaignFunds: totalDonations * 0.7,
        adminFees: totalExpenses * 0.1,
      })

      // Create transaction list
      const donationTransactions: Transaction[] = donations.map((donation: any) => ({
        id: donation.id,
        type: "income",
        category: "দান",
        amount: donation.amount || 0,
        description: `${donation.donorName} থেকে দান`,
        date: donation.submittedAt?.toDate?.()?.toISOString().split("T")[0] || new Date().toISOString().split("T")[0],
        status: "completed",
      }))

      const expenseTransactions: Transaction[] = sampleExpenses.map((expense) => ({
        id: expense.id,
        type: "expense",
        category: expense.category,
        amount: expense.amount,
        description: expense.description,
        date: expense.date,
        status: "completed",
      }))

      setTransactions(
        [...donationTransactions, ...expenseTransactions].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        ),
      )
    } catch (error) {
      console.error("Error fetching financial data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || transaction.type === filterType
    return matchesSearch && matchesFilter
  })

  const exportData = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "তারিখ,ধরন,বিভাগ,পরিমাণ,বিবরণ,অবস্থা\n" +
      filteredTransactions
        .map(
          (t) =>
            `${t.date},${t.type === "income" ? "আয়" : "ব্যয়"},${t.category},${t.amount},${t.description},${t.status}`,
        )
        .join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `financial-report-${new Date().toISOString().split("T")[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">লোড হচ্ছে...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4 font-amiri">আর্থিক ব্যবস্থাপনা</h1>
          <p className="text-lg text-gray-600">সংস্থার সকল আর্থিক লেনদেন ও হিসাব-নিকাশ</p>
        </div>

        {/* Financial Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm">মোট দান</p>
                <p className="text-2xl font-bold">৳{financialData.totalDonations.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span className="text-sm">+১২% এই মাসে</span>
                </div>
              </div>
              <DollarSign className="h-12 w-12 text-emerald-200" />
            </div>
          </div>

          <div className="card bg-gradient-to-br from-red-500 to-red-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">মোট ব্যয়</p>
                <p className="text-2xl font-bold">৳{financialData.totalExpenses.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                  <span className="text-sm">-৮% এই মাসে</span>
                </div>
              </div>
              <TrendingDown className="h-12 w-12 text-red-200" />
            </div>
          </div>

          <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">নেট ব্যালেন্স</p>
                <p className="text-2xl font-bold">৳{financialData.netBalance.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span className="text-sm">+২০% এই মাসে</span>
                </div>
              </div>
              <TrendingUp className="h-12 w-12 text-blue-200" />
            </div>
          </div>

          <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">ক্যাম্পেইন ফান্ড</p>
                <p className="text-2xl font-bold">৳{financialData.campaignFunds.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span className="text-sm">+১৫% এই মাসে</span>
                </div>
              </div>
              <Users className="h-12 w-12 text-purple-200" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="card">
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: "overview", label: "সংক্ষিপ্ত বিবরণ", icon: BarChart3 },
                { id: "transactions", label: "লেনদেন তালিকা", icon: Calendar },
                { id: "reports", label: "রিপোর্ট", icon: PieChart },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? "border-emerald-500 text-emerald-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-navy-800 mb-4">আয়ের উৎস</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">ব্যক্তিগত দান</span>
                      <span className="font-semibold">৭০%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">প্রাতিষ্ঠানিক দান</span>
                      <span className="font-semibold">২০%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">ফান্ড রেইজিং</span>
                      <span className="font-semibold">১০%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-navy-800 mb-4">ব্যয়ের খাত</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">শিক্ষা কার্যক্রম</span>
                      <span className="font-semibold">৪০%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">স্বাস্থ্য সেবা</span>
                      <span className="font-semibold">৩৫%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">প্রশাসনিক খরচ</span>
                      <span className="font-semibold">১৫%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">অন্যান্য</span>
                      <span className="font-semibold">১০%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === "transactions" && (
            <div>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="লেনদেন খুঁজুন..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full"
                    />
                  </div>
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">সব ধরনের</option>
                  <option value="income">আয়</option>
                  <option value="expense">ব্যয়</option>
                </select>
                <button onClick={exportData} className="btn-primary flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  এক্সপোর্ট
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        তারিখ
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ধরন
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        বিভাগ
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        পরিমাণ
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        বিবরণ
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        অবস্থা
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTransactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(transaction.date).toLocaleDateString("bn-BD")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              transaction.type === "income"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {transaction.type === "income" ? "আয়" : "ব্যয়"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ৳{transaction.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{transaction.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              transaction.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : transaction.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {transaction.status === "completed"
                              ? "সম্পন্ন"
                              : transaction.status === "pending"
                                ? "অপেক্ষমান"
                                : "বাতিল"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredTransactions.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">কোন লেনদেন পাওয়া যায়নি</p>
                </div>
              )}
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === "reports" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-navy-800 mb-4">মাসিক আয়-ব্যয় রিপোর্ট</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-white rounded">
                      <span>জানুয়ারি ২০২৫</span>
                      <button className="text-emerald-600 hover:text-emerald-800">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded">
                      <span>ডিসেম্বর ২০২৪</span>
                      <button className="text-emerald-600 hover:text-emerald-800">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded">
                      <span>নভেম্বর ২০২৪</span>
                      <button className="text-emerald-600 hover:text-emerald-800">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-navy-800 mb-4">ক্যাম্পেইন ভিত্তিক রিপোর্ট</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-white rounded">
                      <span>শীতবস্ত্র বিতরণ</span>
                      <span className="text-emerald-600 font-semibold">৳৫০,০০০</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded">
                      <span>চিকিৎসা সেবা</span>
                      <span className="text-emerald-600 font-semibold">৳৭৫,০০০</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded">
                      <span>শিক্ষা উপকরণ</span>
                      <span className="text-emerald-600 font-semibold">৳৩০,০০০</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-navy-800 mb-4">বার্ষিক সারসংক্ষেপ</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white rounded">
                    <div className="text-2xl font-bold text-emerald-600">৳২,৫০,০০০</div>
                    <div className="text-sm text-gray-600">মোট আয়</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded">
                    <div className="text-2xl font-bold text-red-600">৳১,৮০,০০০</div>
                    <div className="text-sm text-gray-600">মোট ব্যয়</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded">
                    <div className="text-2xl font-bold text-blue-600">৳৭০,০০০</div>
                    <div className="text-sm text-gray-600">নেট সঞ্চয়</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
