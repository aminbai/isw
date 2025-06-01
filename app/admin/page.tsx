"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Users, Heart, UserPlus, Download, LogOut } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { signOutUser } from "@/lib/auth"
import { getDonations, getAdmissions, getCampaignJoins } from "@/lib/firestore"

export default function AdminPage() {
  const { user, loading, isAuthenticated } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("donations")
  const [data, setData] = useState({
    donations: [],
    admissions: [],
    campaignJoins: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }
  }, [loading, isAuthenticated, router])

  useEffect(() => {
    if (isAuthenticated) {
      fetchData()
    }
  }, [isAuthenticated])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      console.log("Fetching admin data...")
      const [donationsResult, admissionsResult, campaignJoinsResult] = await Promise.all([
        getDonations(),
        getAdmissions(),
        getCampaignJoins(),
      ])

      console.log("Donations result:", donationsResult)
      console.log("Admissions result:", admissionsResult)
      console.log("Campaign joins result:", campaignJoinsResult)

      setData({
        donations: donationsResult.success ? donationsResult.data : [],
        admissions: admissionsResult.success ? admissionsResult.data : [],
        campaignJoins: campaignJoinsResult.success ? campaignJoinsResult.data : [],
      })
    } catch (error) {
      console.error("Error fetching data:", error)
      setError("ডেটা লোড করতে সমস্যা হয়েছে")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    await signOutUser()
    router.push("/login")
  }

  const downloadReport = async (type: string) => {
    let reportData = []
    let filename = ""

    if (type === "donations") {
      reportData = data.donations
      filename = "donations-report"
    } else if (type === "admissions") {
      reportData = data.admissions
      filename = "admissions-report"
    } else {
      reportData = data.campaignJoins
      filename = "campaign-joins-report"
    }

    if (reportData.length === 0) {
      alert("কোন ডেটা পাওয়া যায়নি")
      return
    }

    // Convert Firebase Timestamp to readable date
    const processedData = reportData.map((item) => ({
      ...item,
      submittedAt:
        item.submittedAt?.toDate?.()?.toLocaleDateString("bn-BD") ||
        (typeof item.submittedAt === "string"
          ? new Date(item.submittedAt).toLocaleDateString("bn-BD")
          : item.submittedAt),
    }))

    const csvContent =
      "data:text/csv;charset=utf-8," +
      Object.keys(processedData[0]).join(",") +
      "\n" +
      processedData.map((row) => Object.values(row).join(",")).join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `${filename}-${new Date().toISOString().split("T")[0]}.csv`)
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

  const totalDonations = data.donations.reduce((sum, donation) => sum + (donation.amount || 0), 0)

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4 font-amiri">অ্যাডমিন ড্যাশবোর্ড</h1>
            <p className="text-lg text-gray-600">সংস্থার সকল তথ্য ও রিপোর্ট দেখুন</p>
          </div>
          <button onClick={handleSignOut} className="btn-secondary flex items-center">
            <LogOut className="h-4 w-4 mr-2" />
            লগআউট
          </button>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card text-center">
            <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-navy-800">৳{totalDonations.toLocaleString()}</h3>
            <p className="text-gray-600">মোট দান</p>
          </div>

          <div className="card text-center">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-navy-800">{data.admissions.length}</h3>
            <p className="text-gray-600">নতুন সদস্য</p>
          </div>

          <div className="card text-center">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-navy-800">{data.campaignJoins.length}</h3>
            <p className="text-gray-600">ক্যাম্পেইন অংশগ্রহণকারী</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="card">
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("donations")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "donations"
                    ? "border-emerald-500 text-emerald-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                দান তালিকা ({data.donations.length})
              </button>
              <button
                onClick={() => setActiveTab("admissions")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "admissions"
                    ? "border-emerald-500 text-emerald-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                ভর্তির আবেদন ({data.admissions.length})
              </button>
              <button
                onClick={() => setActiveTab("campaigns")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "campaigns"
                    ? "border-emerald-500 text-emerald-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                ক্যাম্পেইন যোগদান ({data.campaignJoins.length})
              </button>
            </nav>
          </div>

          {/* Donations Tab */}
          {activeTab === "donations" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-navy-800">দান তালিকা</h3>
                <button onClick={() => downloadReport("donations")} className="btn-primary flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  রিপোর্ট ডাউনলোড
                </button>
              </div>

              {data.donations.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">কোন দান পাওয়া যায়নি</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          দানকারী
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          পরিমাণ
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          পেমেন্ট মেথড
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ট্রানজেকশন আইডি
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          তারিখ
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ফোন
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {data.donations.map((donation) => (
                        <tr key={donation.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {donation.donorName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ৳{donation.amount?.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {donation.paymentMethod}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {donation.transactionId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {donation.submittedAt?.toDate?.()?.toLocaleDateString("bn-BD") ||
                              (typeof donation.submittedAt === "string"
                                ? new Date(donation.submittedAt).toLocaleDateString("bn-BD")
                                : "N/A")}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donation.phone}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Admissions Tab */}
          {activeTab === "admissions" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-navy-800">ভর্তির আবেদন তালিকা</h3>
                <button onClick={() => downloadReport("admissions")} className="btn-primary flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  রিপোর্ট ডাউনলোড
                </button>
              </div>

              {data.admissions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">কোন আবেদন পাওয়া যায়নি</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          নাম
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          অভিভাবক
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          শিক্ষা
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          পেশা
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ফোন
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          তারিখ
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {data.admissions.map((admission) => (
                        <tr key={admission.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {admission.fullName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {admission.guardianName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{admission.education}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{admission.profession}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{admission.phone}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {admission.submittedAt?.toDate?.()?.toLocaleDateString("bn-BD") ||
                              (typeof admission.submittedAt === "string"
                                ? new Date(admission.submittedAt).toLocaleDateString("bn-BD")
                                : "N/A")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Campaign Joins Tab */}
          {activeTab === "campaigns" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-navy-800">ক্যাম্পেইন অংশগ্রহণকারী তালিকা</h3>
                <button onClick={() => downloadReport("campaigns")} className="btn-primary flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  রিপোর্ট ডাউনলোড
                </button>
              </div>

              {data.campaignJoins.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">কোন ক্যাম্পেইন যোগদান পাওয়া যায়নি</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          নাম
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ক্যাম্পেইন
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ফোন
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          অভিজ্ঞতা
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          তারিখ
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {data.campaignJoins.map((join) => (
                        <tr key={join.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{join.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{join.campaignName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{join.phone}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{join.experience}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {join.submittedAt?.toDate?.()?.toLocaleDateString("bn-BD") ||
                              (typeof join.submittedAt === "string"
                                ? new Date(join.submittedAt).toLocaleDateString("bn-BD")
                                : "N/A")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
