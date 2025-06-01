import { collection, addDoc, getDocs, query, orderBy, where, Timestamp } from "firebase/firestore"
import { db } from "./firebase"
import {
  submitAdmissionFormFallback,
  submitCampaignJoinFormFallback,
  submitDonationFormFallback,
  getAdmissionsFallback,
  getCampaignJoinsFallback,
  getDonationsFallback,
} from "./firestore-fallback"

// Types for our data
export interface AdmissionData {
  fullName: string
  guardianName: string
  phone: string
  address: string
  dateOfBirth: string
  education: string
  profession: string
  submittedAt: Timestamp
  status: "pending" | "approved" | "rejected"
}

export interface CampaignJoinData {
  campaignId: string
  campaignName: string
  name: string
  phone: string
  experience: string
  submittedAt: Timestamp
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
  submittedAt: Timestamp
  verified: boolean
}

// Check if Firebase is properly configured
const isFirebaseConfigured = () => {
  try {
    return !!(process.env.NEXT_PUBLIC_FIREBASE_API_KEY && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID && db)
  } catch {
    return false
  }
}

// Admission form functions
export const submitAdmissionForm = async (data: Omit<AdmissionData, "submittedAt" | "status">) => {
  // Try Firebase first, fallback to localStorage if it fails
  if (!isFirebaseConfigured()) {
    console.log("Firebase not configured, using fallback storage")
    return submitAdmissionFormFallback(data)
  }

  try {
    // Add the document to Firestore
    const docRef = await addDoc(collection(db, "admissions"), {
      ...data,
      submittedAt: Timestamp.now(),
      status: "pending",
    })

    console.log("Document written with ID: ", docRef.id)
    return { success: true, id: docRef.id }
  } catch (error: any) {
    console.error("Firebase error, using fallback:", error)
    return submitAdmissionFormFallback(data)
  }
}

export const getAdmissions = async () => {
  if (!isFirebaseConfigured()) {
    return getAdmissionsFallback()
  }

  try {
    const q = query(collection(db, "admissions"), orderBy("submittedAt", "desc"))
    const querySnapshot = await getDocs(q)
    const admissions: (AdmissionData & { id: string })[] = []

    querySnapshot.forEach((doc) => {
      admissions.push({ id: doc.id, ...doc.data() } as AdmissionData & { id: string })
    })

    return { success: true, data: admissions }
  } catch (error) {
    console.error("Firebase error, using fallback:", error)
    return getAdmissionsFallback()
  }
}

// Campaign join functions
export const submitCampaignJoinForm = async (data: Omit<CampaignJoinData, "submittedAt" | "status">) => {
  if (!isFirebaseConfigured()) {
    return submitCampaignJoinFormFallback(data)
  }

  try {
    const docRef = await addDoc(collection(db, "campaignJoins"), {
      ...data,
      submittedAt: Timestamp.now(),
      status: "pending",
    })

    console.log("Campaign join document written with ID: ", docRef.id)
    return { success: true, id: docRef.id }
  } catch (error: any) {
    console.error("Firebase error, using fallback:", error)
    return submitCampaignJoinFormFallback(data)
  }
}

export const getCampaignJoins = async () => {
  if (!isFirebaseConfigured()) {
    return getCampaignJoinsFallback()
  }

  try {
    const q = query(collection(db, "campaignJoins"), orderBy("submittedAt", "desc"))
    const querySnapshot = await getDocs(q)
    const campaignJoins: (CampaignJoinData & { id: string })[] = []

    querySnapshot.forEach((doc) => {
      campaignJoins.push({ id: doc.id, ...doc.data() } as CampaignJoinData & { id: string })
    })

    return { success: true, data: campaignJoins }
  } catch (error) {
    console.error("Firebase error, using fallback:", error)
    return getCampaignJoinsFallback()
  }
}

// Donation functions
export const submitDonationForm = async (data: Omit<DonationData, "submittedAt" | "verified">) => {
  if (!isFirebaseConfigured()) {
    return submitDonationFormFallback(data)
  }

  try {
    const docRef = await addDoc(collection(db, "donations"), {
      ...data,
      amount: Number(data.amount),
      submittedAt: Timestamp.now(),
      verified: false,
    })

    console.log("Donation document written with ID: ", docRef.id)
    return { success: true, id: docRef.id }
  } catch (error: any) {
    console.error("Firebase error, using fallback:", error)
    return submitDonationFormFallback(data)
  }
}

export const getDonations = async () => {
  if (!isFirebaseConfigured()) {
    return getDonationsFallback()
  }

  try {
    const q = query(collection(db, "donations"), orderBy("submittedAt", "desc"))
    const querySnapshot = await getDocs(q)
    const donations: (DonationData & { id: string })[] = []

    querySnapshot.forEach((doc) => {
      donations.push({ id: doc.id, ...doc.data() } as DonationData & { id: string })
    })

    return { success: true, data: donations }
  } catch (error) {
    console.error("Firebase error, using fallback:", error)
    return getDonationsFallback()
  }
}

// Get donations by date range for reports
export const getDonationsByDateRange = async (startDate: Date, endDate: Date) => {
  try {
    const q = query(
      collection(db, "donations"),
      where("submittedAt", ">=", Timestamp.fromDate(startDate)),
      where("submittedAt", "<=", Timestamp.fromDate(endDate)),
      orderBy("submittedAt", "desc"),
    )
    const querySnapshot = await getDocs(q)
    const donations: (DonationData & { id: string })[] = []

    querySnapshot.forEach((doc) => {
      donations.push({ id: doc.id, ...doc.data() } as DonationData & { id: string })
    })

    return { success: true, data: donations }
  } catch (error) {
    console.error("Error fetching donations by date range:", error)
    return { success: false, error: "Failed to fetch donations" }
  }
}

// Generate unique donation ID
export const generateDonationId = () => {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 1000)
  return `DON-${timestamp}-${random}`
}
