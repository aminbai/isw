"use client"

import type React from "react"

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
  Plus,
  Save,
  X,
} from "lucide-react"
import {
  getDonations,
  getExpenses,
  getBudgets,
  getFinancialReports,
  submitExpenseForm,
  createBudget,
  generateFinancialReport,
  getDonationsByDateRange,
  getExpensesByDateRange,
} from "@/lib/firestore"
import { useAuth } from "@/hooks/use-auth"

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

interface ExpenseForm {
  category: string
  subcategory: string
  amount: string
  description: string
  approvedBy: string
  receiptNumber: string
  paymentMethod: string
  vendor: string
}

interface BudgetForm {
  category: string
  allocatedAmount: string
  fiscalYear: string
}

export default function FinancialManagementPage() {
  const router = useRouter()
  const { user, loading, isAuthenticated } = useAuth()
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
  const [expenses, setExpenses] = useState<any[]>([])
  const [budgets, setBudgets] = useState<any[]>([])
  const [reports, setReports] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [showExpenseForm, setShowExpenseForm] = useState(false)
  const [showBudgetForm, setShowBudgetForm] = useState(false)
  const [expenseForm, setExpenseForm] = useState<ExpenseForm>({
    category: "",
    subcategory: "",
    amount: "",
    description: "",
    approvedBy: "",
    receiptNumber: "",
    paymentMethod: "",
    vendor: "",
  })
  const [budgetForm, setBudgetForm] = useState<BudgetForm>({
    category: "",
    allocatedAmount: "",
    fiscalYear: new Date().getFullYear().toString(),
  })

  useEffect(() => {
    fetchFinancialData()
  }, [])

  const fetchFinancialData = async () => {
    setIsLoading(true)
    try {
      console.log("Fetching financial data from Firebase...")

      // Fetch all financial data
      const [donationsResult, expensesResult, budgetsResult, reportsResult] = await Promise.all([
        getDonations(),
        getExpenses(),
        getBudgets(),
        getFinancialReports(),
      ])

      console.log("Donations:", donationsResult)
      console.log("Expenses:", expensesResult)
      console.log("Budgets:", budgetsResult)
      console.log("Reports:", reportsResult)

      const donations = donationsResult.success ? donationsResult.data : []
      const expensesData = expensesResult.success ? expensesResult.data : []
      const budgetsData = budgetsResult.success ? budgetsResult.data : []
      const reportsData = reportsResult.success ? reportsResult.data : []

      // Calculate financial data
      const totalDonations = donations.reduce((sum: number, donation: any) => sum + (donation.amount || 0), 0)
      const totalExpenses = expensesData.reduce((sum: number, expense: any) => sum + (expense.amount || 0), 0)

      setFinancialData({
        totalDonations,
        totalExpenses,
        netBalance: totalDonations - totalExpenses,
        monthlyDonations: totalDonations * 0.3,
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
        date:
          donation.submittedAt?.toDate?.()?.toISOString().split("T")[0] ||
          (typeof donation.submittedAt === "string"
            ? donation.submittedAt.split("T")[0]
            : new Date().toISOString().split("T")[0]),
        status: "completed",
      }))

      const expenseTransactions: Transaction[] = expensesData.map((expense: any) => ({
        id: expense.id,
        type: "expense",
        category: expense.category,
        amount: expense.amount,
        description: expense.description,
        date:
          expense.submittedAt?.toDate?.()?.toISOString().split("T")[0] ||
          (typeof expense.submittedAt === "string"
            ? expense.submittedAt.split("T")[0]
            : new Date().toISOString().split("T")[0]),
        status: expense.status === "approved" ? "completed" : expense.status,
      }))

      setTransactions(
        [...donationTransactions, ...expenseTransactions].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        ),
      )

      setExpenses(expensesData)
      setBudgets(budgetsData)
      setReports(reportsData)
    } catch (error) {
      console.error("Error fetching financial data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleExpenseSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // ফর্ম ভ্যালিডেশন
    if (!expenseForm.category || !expenseForm.amount || !expenseForm.description || !expenseForm.paymentMethod) {
      alert("সকল প্রয়োজনীয় ক্ষেত্র পূরণ করুন")
      return
    }

    if (Number(expenseForm.amount) <= 0) {
      alert("পরিমাণ ০ এর চেয়ে বেশি হতে হবে")
      return
    }

    try {
      const result = await submitExpenseForm({
        category: expenseForm.category,
        subcategory: expenseForm.subcategory,
        amount: Number(expenseForm.amount),
        description: expenseForm.description,
        approvedBy: expenseForm.approvedBy || user?.email || "Admin",
        receiptNumber: expenseForm.receiptNumber,
        paymentMethod: expenseForm.paymentMethod,
        vendor: expenseForm.vendor,
      })

      if (result.success) {
        alert("ব্যয় সফলভাবে যোগ করা হয়েছে!")
        setShowExpenseForm(false)
        setExpenseForm({
          category: "",
          subcategory: "",
          amount: "",
          description: "",
          approvedBy: "",
          receiptNumber: "",
          paymentMethod: "",
          vendor: "",
        })
        fetchFinancialData() // Refresh data
      } else {
        alert(result.error || "ব্যয় যোগ করতে সমস্যা হয়েছে")
      }
    } catch (error) {
      console.error("Error submitting expense:", error)
      alert("ব্যয় যোগ করতে সমস্যা হয়েছে")
    }
  }

  const handleBudgetSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // ফর্ম ভ্যালিডেশন
    if (!budgetForm.category || !budgetForm.allocatedAmount || !budgetForm.fiscalYear) {
      alert("সকল প্রয়োজনীয় ক্ষেত্র পূরণ করুন")
      return
    }

    if (Number(budgetForm.allocatedAmount) <= 0) {
      alert("বরাদ্দ পরিমাণ ০ এর চেয়ে বেশি হতে হবে")
      return
    }

    try {
      const result = await createBudget({
        category: budgetForm.category,
        allocatedAmount: Number(budgetForm.allocatedAmount),
        spentAmount: 0,
        remainingAmount: Number(budgetForm.allocatedAmount),
        fiscalYear: budgetForm.fiscalYear,
      })

      if (result.success) {
        alert("বাজেট সফলভাবে তৈরি করা হয়েছে!")
        setShowBudgetForm(false)
        setBudgetForm({
          category: "",
          allocatedAmount: "",
          fiscalYear: new Date().getFullYear().toString(),
        })
        fetchFinancialData() // Refresh data
      } else {
        alert(result.error || "বাজেট তৈরি করতে সমস্যা হয়েছে")
      }
    } catch (error) {
      console.error("Error creating budget:", error)
      alert("বাজেট তৈরি করতে সমস্যা হয়েছে")
    }
  }

  const generateMonthlyReport = async () => {
    try {
      const currentDate = new Date()
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
      const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

      const [donationsResult, expensesResult] = await Promise.all([
        getDonationsByDateRange(startOfMonth, endOfMonth),
        getExpensesByDateRange(startOfMonth, endOfMonth),
      ])

      const monthlyDonations = donationsResult.success ? donationsResult.data : []
      const monthlyExpenses = expensesResult.success ? expensesResult.data : []

      const totalIncome = monthlyDonations.reduce((sum: number, donation: any) => sum + (donation.amount || 0), 0)
      const totalExpense = monthlyExpenses.reduce((sum: number, expense: any) => sum + (expense.amount || 0), 0)

      const result = await generateFinancialReport({
        reportType: "monthly",
        period: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}`,
        totalIncome,
        totalExpense,
        netBalance: totalIncome - totalExpense,
        generatedBy: user?.email || "Admin",
      })

      if (result.success) {
        alert("মাসিক রিপোর্ট সফলভাবে তৈরি করা হয়েছে!")
        fetchFinancialData() // Refresh data
      }
    } catch (error) {
      console.error("Error generating report:", error)
      alert("রিপোর্ট তৈরি করতে সমস্যা হয়েছে")
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
          <p className="text-gray-600">আর্থিক তথ্য লোড হচ্ছে...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4 font-amiri">আর্থিক ব্যবস্থাপনা</h1>
            <p className="text-lg text-gray-600">সংস্থার সকল আর্থিক লেনদেন ও হিসাব-নিকাশ</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowExpenseForm(true)} className="btn-primary flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              নতুন ব্যয়
            </button>
            <button onClick={() => setShowBudgetForm(true)} className="btn-secondary flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              বাজেট
            </button>
          </div>
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
                  <span className="text-sm">Firebase থেকে</span>
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
                  <span className="text-sm">{expenses.length} টি ব্যয়</span>
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
                  <span className="text-sm">লাইভ ডেটা</span>
                </div>
              </div>
              <TrendingUp className="h-12 w-12 text-blue-200" />
            </div>
          </div>

          <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">বাজেট</p>
                <p className="text-2xl font-bold">{budgets.length}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span className="text-sm">সক্রিয় বাজেট</span>
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
                { id: "expenses", label: "ব্যয় ব্যবস্থাপনা", icon: TrendingDown },
                { id: "budgets", label: "বাজেট", icon: PieChart },
                { id: "reports", label: "রিপোর্ট", icon: Eye },
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
                    {expenses.reduce((acc: any, expense: any) => {
                      const category = expense.category
                      if (!acc[category]) {
                        acc[category] = 0
                      }
                      acc[category] += expense.amount
                      return acc
                    }, {}) &&
                      Object.entries(
                        expenses.reduce((acc: any, expense: any) => {
                          const category = expense.category
                          if (!acc[category]) {
                            acc[category] = 0
                          }
                          acc[category] += expense.amount
                          return acc
                        }, {}),
                      ).map(([category, amount]: [string, any]) => (
                        <div key={category} className="flex justify-between items-center">
                          <span className="text-gray-600">{category}</span>
                          <span className="font-semibold">৳{amount.toLocaleString()}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-navy-800 mb-4">Firebase সংযোগ স্থিতি</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">
                      {transactions.filter((t) => t.type === "income").length}
                    </div>
                    <div className="text-sm text-gray-600">দান রেকর্ড</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{expenses.length}</div>
                    <div className="text-sm text-gray-600">ব্যয় রেকর্ড</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{budgets.length}</div>
                    <div className="text-sm text-gray-600">বাজেট</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{reports.length}</div>
                    <div className="text-sm text-gray-600">রিপোর্ট</div>
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

          {/* Expenses Tab */}
          {activeTab === "expenses" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-navy-800">ব্যয় ব্যবস্থাপনা</h3>
                <button onClick={() => setShowExpenseForm(true)} className="btn-primary flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  নতুন ব্যয় যোগ করুন
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
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
                        অনুমোদনকারী
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        তারিখ
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        অবস্থা
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {expenses.map((expense) => (
                      <tr key={expense.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {expense.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ৳{expense.amount?.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{expense.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{expense.approvedBy}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {expense.submittedAt?.toDate?.()?.toLocaleDateString("bn-BD") ||
                            (typeof expense.submittedAt === "string"
                              ? new Date(expense.submittedAt).toLocaleDateString("bn-BD")
                              : "N/A")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            অনুমোদিত
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {expenses.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">কোন ব্যয় রেকর্ড পাওয়া যায়নি</p>
                </div>
              )}
            </div>
          )}

          {/* Budgets Tab */}
          {activeTab === "budgets" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-navy-800">বাজেট ব্যবস্থাপনা</h3>
                <button onClick={() => setShowBudgetForm(true)} className="btn-primary flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  নতুন বাজেট তৈরি করুন
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {budgets.map((budget) => (
                  <div key={budget.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h4 className="text-lg font-semibold text-navy-800 mb-2">{budget.category}</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">বরাদ্দ:</span>
                        <span className="font-semibold">৳{budget.allocatedAmount?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ব্যয়িত:</span>
                        <span className="font-semibold text-red-600">৳{budget.spentAmount?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">অবশিষ্ট:</span>
                        <span className="font-semibold text-emerald-600">
                          ৳{budget.remainingAmount?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-emerald-600 h-2 rounded-full"
                          style={{
                            width: `${Math.min((budget.spentAmount / budget.allocatedAmount) * 100, 100)}%`,
                          }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {Math.round((budget.spentAmount / budget.allocatedAmount) * 100)}% ব্যবহৃত
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {budgets.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">কোন বাজেট পাওয়া যায়নি</p>
                </div>
              )}
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === "reports" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-navy-800">আর্থিক রিপোর্ট</h3>
                <button onClick={generateMonthlyReport} className="btn-primary flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  মাসিক রিপোর্ট তৈরি করুন
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-navy-800 mb-4">সাম্প্রতিক রিপোর্ট</h4>
                  <div className="space-y-4">
                    {reports.map((report) => (
                      <div key={report.id} className="flex justify-between items-center p-3 bg-white rounded">
                        <div>
                          <span className="font-medium">
                            {report.reportType} - {report.period}
                          </span>
                          <p className="text-sm text-gray-500">নেট: ৳{report.netBalance?.toLocaleString()}</p>
                        </div>
                        <button className="text-emerald-600 hover:text-emerald-800">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-navy-800 mb-4">বার্ষিক সারসংক্ষেপ</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="text-center p-4 bg-white rounded">
                      <div className="text-2xl font-bold text-emerald-600">
                        ৳{financialData.totalDonations.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">মোট আয়</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded">
                      <div className="text-2xl font-bold text-red-600">
                        ৳{financialData.totalExpenses.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">মোট ব্যয়</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded">
                      <div className="text-2xl font-bold text-blue-600">
                        ৳{financialData.netBalance.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">নেট সঞ্চয়</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Expense Form Modal */}
      {showExpenseForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-navy-800">নতুন ব্যয় যোগ করুন</h3>
              <button onClick={() => setShowExpenseForm(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleExpenseSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">বিভাগ *</label>
                <select
                  value={expenseForm.category}
                  onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
                  required
                  className="form-input"
                >
                  <option value="">বিভাগ নির্বাচন করুন</option>
                  <option value="শিক্ষা উপকরণ">শিক্ষা উপকরণ</option>
                  <option value="চিকিৎসা">চিকিৎসা</option>
                  <option value="প্রশাসনিক">প্রশাসনিক</option>
                  <option value="ত্রাণ বিতরণ">ত্রাণ বিতরণ</option>
                  <option value="অবকাঠামো">অবকাঠামো</option>
                  <option value="অন্যান্য">অন্যান্য</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">উপ-বিভাগ</label>
                <input
                  type="text"
                  value={expenseForm.subcategory}
                  onChange={(e) => setExpenseForm({ ...expenseForm, subcategory: e.target.value })}
                  className="form-input"
                  placeholder="উপ-বিভাগ লিখুন"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">পরিমাণ (টাকা) *</label>
                <input
                  type="number"
                  value={expenseForm.amount}
                  onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                  required
                  min="1"
                  className="form-input"
                  placeholder="পরিমাণ লিখুন"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">বিবরণ *</label>
                <textarea
                  value={expenseForm.description}
                  onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })}
                  required
                  rows={3}
                  className="form-input"
                  placeholder="ব্যয়ের বিস্তারিত বিবরণ লিখুন"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">পেমেন্ট মেথড *</label>
                <select
                  value={expenseForm.paymentMethod}
                  onChange={(e) => setExpenseForm({ ...expenseForm, paymentMethod: e.target.value })}
                  required
                  className="form-input"
                >
                  <option value="">পেমেন্ট মেথড নির্বাচন করুন</option>
                  <option value="নগদ">নগদ</option>
                  <option value="বিকাশ">বিকাশ</option>
                  <option value="নগদ (Nagad)">নগদ (Nagad)</option>
                  <option value="ব্যাংক ট্রান্সফার">ব্যাংক ট্রান্সফার</option>
                  <option value="চেক">চেক</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">রসিদ নম্বর</label>
                <input
                  type="text"
                  value={expenseForm.receiptNumber}
                  onChange={(e) => setExpenseForm({ ...expenseForm, receiptNumber: e.target.value })}
                  className="form-input"
                  placeholder="রসিদ নম্বর লিখুন"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">বিক্রেতা/সরবরাহকারী</label>
                <input
                  type="text"
                  value={expenseForm.vendor}
                  onChange={(e) => setExpenseForm({ ...expenseForm, vendor: e.target.value })}
                  className="form-input"
                  placeholder="বিক্রেতার নাম লিখুন"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button type="submit" className="btn-primary flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  সংরক্ষণ করুন
                </button>
                <button type="button" onClick={() => setShowExpenseForm(false)} className="btn-secondary flex-1">
                  বাতিল
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Budget Form Modal */}
      {showBudgetForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-navy-800">নতুন বাজেট তৈরি করুন</h3>
              <button onClick={() => setShowBudgetForm(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleBudgetSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">বিভাগ *</label>
                <select
                  value={budgetForm.category}
                  onChange={(e) => setBudgetForm({ ...budgetForm, category: e.target.value })}
                  required
                  className="form-input"
                >
                  <option value="">বিভাগ নির্বাচন করুন</option>
                  <option value="শিক্ষা কার্যক্রম">শিক্ষা কার্যক্রম</option>
                  <option value="স্বাস্থ্য সেবা">স্বাস্থ্য সেবা</option>
                  <option value="প্রশাসনিক খরচ">প্রশাসনিক খরচ</option>
                  <option value="ত্রাণ ও পুনর্বাসন">ত্রাণ ও পুনর্বাসন</option>
                  <option value="অবকাঠামো উন্নয়ন">অবকাঠামো উন্নয়ন</option>
                  <option value="জরুরি তহবিল">জরুরি তহবিল</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">বরাদ্দ পরিমাণ (টাকা) *</label>
                <input
                  type="number"
                  value={budgetForm.allocatedAmount}
                  onChange={(e) => setBudgetForm({ ...budgetForm, allocatedAmount: e.target.value })}
                  required
                  min="1"
                  className="form-input"
                  placeholder="বরাদ্দ পরিমাণ লিখুন"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">অর্থবছর *</label>
                <select
                  value={budgetForm.fiscalYear}
                  onChange={(e) => setBudgetForm({ ...budgetForm, fiscalYear: e.target.value })}
                  required
                  className="form-input"
                >
                  <option value="2024">২০২৪</option>
                  <option value="2025">২০২৫</option>
                  <option value="2026">২০২৬</option>
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="submit" className="btn-primary flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  তৈরি করুন
                </button>
                <button type="button" onClick={() => setShowBudgetForm(false)} className="btn-secondary flex-1">
                  বাতিল
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
