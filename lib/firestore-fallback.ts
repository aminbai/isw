// Fallback functions for when Firestore is not properly configured
// This will simulate the database operations locally

export interface AdmissionData {
  fullName: string
  guardianName: string
  phone: string
  address: string
  dateOfBirth: string
  education: string
  profession: string
  submittedAt: any
  status: "pending" | "approved" | "rejected"
}

export interface CampaignJoinData {
  campaignId: string
  campaignName: string
  name: string
  phone: string
  experience: string
  submittedAt: any
  status: "pending" | "approved" | "rejected"
}

export interface DonationData {
  donorName: string
  phone: string
  address: string
  amount: number
  paymentMethod: string
  transactionId: string
  donationId: string
  submittedAt: any
  verified: boolean
}

// Simulate database operations with localStorage
const getStorageKey = (collection: string) => `islamic-welfare-${collection}`

const saveToStorage = (collection: string, data: any) => {
  try {
    // Check if we're in browser environment
    if (typeof window === "undefined") {
      console.log("Server-side rendering, cannot use localStorage")
      return { success: true, id: `server-${Date.now()}` }
    }

    const existing = JSON.parse(localStorage.getItem(getStorageKey(collection)) || "[]")
    const newData = {
      ...data,
      id: `${collection}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      submittedAt: new Date().toISOString(),
    }
    existing.push(newData)
    localStorage.setItem(getStorageKey(collection), JSON.stringify(existing))
    console.log(`Saved to localStorage: ${collection}`, newData)
    return { success: true, id: newData.id }
  } catch (error) {
    console.error("Storage error:", error)
    return { success: false, error: "ডেটা সংরক্ষণে সমস্যা হয়েছে" }
  }
}

const getFromStorage = (collection: string) => {
  try {
    // Check if we're in browser environment
    if (typeof window === "undefined") {
      console.log("Server-side rendering, returning empty array")
      return { success: true, data: [] }
    }

    const data = JSON.parse(localStorage.getItem(getStorageKey(collection)) || "[]")
    console.log(`Retrieved from localStorage: ${collection}`, data)
    return { success: true, data }
  } catch (error) {
    console.error("Storage retrieval error:", error)
    return { success: false, error: "ডেটা পড়তে সমস্যা হয়েছে" }
  }
}

// Fallback functions
export const submitAdmissionFormFallback = async (data: Omit<AdmissionData, "submittedAt" | "status">) => {
  console.log("Using fallback storage for admission form")
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay
  return saveToStorage("admissions", { ...data, status: "pending" })
}

export const submitCampaignJoinFormFallback = async (data: Omit<CampaignJoinData, "submittedAt" | "status">) => {
  console.log("Using fallback storage for campaign join form")
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return saveToStorage("campaignJoins", { ...data, status: "pending" })
}

export const submitDonationFormFallback = async (data: Omit<DonationData, "submittedAt" | "verified">) => {
  console.log("Using fallback storage for donation form")
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return saveToStorage("donations", { ...data, verified: false })
}

export const getAdmissionsFallback = async () => {
  console.log("Using fallback storage to get admissions")
  await new Promise((resolve) => setTimeout(resolve, 500))
  return getFromStorage("admissions")
}

export const getCampaignJoinsFallback = async () => {
  console.log("Using fallback storage to get campaign joins")
  await new Promise((resolve) => setTimeout(resolve, 500))
  return getFromStorage("campaignJoins")
}

export const getDonationsFallback = async () => {
  console.log("Using fallback storage to get donations")
  await new Promise((resolve) => setTimeout(resolve, 500))
  return getFromStorage("donations")
}

export const generateDonationId = () => {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 1000)
  return `DON-${timestamp}-${random}`
}
