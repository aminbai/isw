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
    const existing = JSON.parse(localStorage.getItem(getStorageKey(collection)) || "[]")
    const newData = {
      ...data,
      id: `${collection}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      submittedAt: new Date().toISOString(),
    }
    existing.push(newData)
    localStorage.setItem(getStorageKey(collection), JSON.stringify(existing))
    return { success: true, id: newData.id }
  } catch (error) {
    console.error("Storage error:", error)
    return { success: false, error: "ডেটা সংরক্ষণে সমস্যা হয়েছে" }
  }
}

const getFromStorage = (collection: string) => {
  try {
    const data = JSON.parse(localStorage.getItem(getStorageKey(collection)) || "[]")
    return { success: true, data }
  } catch (error) {
    console.error("Storage retrieval error:", error)
    return { success: false, error: "ডেটা পড়তে সমস্যা হয়েছে" }
  }
}

// Fallback functions
export const submitAdmissionFormFallback = async (data: Omit<AdmissionData, "submittedAt" | "status">) => {
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay
  return saveToStorage("admissions", { ...data, status: "pending" })
}

export const submitCampaignJoinFormFallback = async (data: Omit<CampaignJoinData, "submittedAt" | "status">) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return saveToStorage("campaignJoins", { ...data, status: "pending" })
}

export const submitDonationFormFallback = async (data: Omit<DonationData, "submittedAt" | "verified">) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return saveToStorage("donations", { ...data, verified: false })
}

export const getAdmissionsFallback = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return getFromStorage("admissions")
}

export const getCampaignJoinsFallback = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return getFromStorage("campaignJoins")
}

export const getDonationsFallback = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return getFromStorage("donations")
}

export const generateDonationId = () => {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 1000)
  return `DON-${timestamp}-${random}`
}
