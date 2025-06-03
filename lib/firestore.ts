import { collection, addDoc, getDocs, query, orderBy, where, Timestamp, updateDoc, doc } from "firebase/firestore"
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

// New Financial Data Types
export interface ExpenseData {
  id?: string
  category: string
  subcategory: string
  amount: number
  description: string
  approvedBy: string
  receiptNumber?: string
  submittedAt: Timestamp
  status: "pending" | "approved" | "rejected"
  paymentMethod: string
  vendor?: string
}

export interface BudgetData {
  id?: string
  category: string
  allocatedAmount: number
  spentAmount: number
  remainingAmount: number
  fiscalYear: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface FinancialReportData {
  id?: string
  reportType: "monthly" | "quarterly" | "yearly"
  period: string
  totalIncome: number
  totalExpense: number
  netBalance: number
  generatedAt: Timestamp
  generatedBy: string
}

// Check if Firebase is properly configured
const isFirebaseConfigured = () => {
  try {
    // Check if we have actual environment variables (not demo values)
    const hasRealConfig =
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== "demo-api-key" &&
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID !== "demo-project"

    return !!(hasRealConfig && db)
  } catch {
    return false
  }
}

// Admission form functions
export const submitAdmissionForm = async (data: Omit<AdmissionData, "submittedAt" | "status">) => {
  console.log("Submitting admission form...")
  console.log("Firebase configured:", isFirebaseConfigured())

  // Try Firebase first, fallback to localStorage if it fails
  if (!isFirebaseConfigured()) {
    console.log("Firebase not properly configured, using fallback storage")
    return submitAdmissionFormFallback(data)
  }

  try {
    console.log("Attempting to save to Firestore...")
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
    console.error("Error details:", error.message)
    return submitAdmissionFormFallback(data)
  }
}

export const getAdmissions = async () => {
  if (!isFirebaseConfigured()) {
    console.log("Using fallback for admissions")
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
  } catch (error: any) {
    console.error("Firebase error, using fallback:", error)
    // Always fallback gracefully instead of throwing
    return getAdmissionsFallback()
  }
}

// Campaign join functions
export const submitCampaignJoinForm = async (data: Omit<CampaignJoinData, "submittedAt" | "status">) => {
  console.log("Submitting campaign join form...")
  console.log("Firebase configured:", isFirebaseConfigured())

  if (!isFirebaseConfigured()) {
    console.log("Firebase not properly configured, using fallback storage")
    return submitCampaignJoinFormFallback(data)
  }

  try {
    console.log("Attempting to save campaign join to Firestore...")
    const docRef = await addDoc(collection(db, "campaignJoins"), {
      ...data,
      submittedAt: Timestamp.now(),
      status: "pending",
    })

    console.log("Campaign join document written with ID: ", docRef.id)
    return { success: true, id: docRef.id }
  } catch (error: any) {
    console.error("Firebase error, using fallback:", error)
    console.error("Error details:", error.message)
    return submitCampaignJoinFormFallback(data)
  }
}

export const getCampaignJoins = async () => {
  if (!isFirebaseConfigured()) {
    console.log("Using fallback for campaign joins")
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
  } catch (error: any) {
    console.error("Firebase error, using fallback:", error)
    // Always fallback gracefully
    return getCampaignJoinsFallback()
  }
}

// Donation functions
export const submitDonationForm = async (data: Omit<DonationData, "submittedAt" | "verified">) => {
  console.log("Submitting donation form...")
  console.log("Firebase configured:", isFirebaseConfigured())

  if (!isFirebaseConfigured()) {
    console.log("Firebase not properly configured, using fallback storage")
    return submitDonationFormFallback(data)
  }

  try {
    console.log("Attempting to save donation to Firestore...")
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
    console.error("Error details:", error.message)
    return submitDonationFormFallback(data)
  }
}

export const getDonations = async () => {
  if (!isFirebaseConfigured()) {
    console.log("Using fallback for donations")
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
  } catch (error: any) {
    console.error("Firebase error, using fallback:", error)
    // Always fallback gracefully
    return getDonationsFallback()
  }
}

// NEW FINANCIAL MANAGEMENT FUNCTIONS

// Expense Management
export const submitExpenseForm = async (data: Omit<ExpenseData, "submittedAt" | "status" | "id">) => {
  console.log("Submitting expense form...")

  if (!isFirebaseConfigured()) {
    console.log("Firebase not configured, using fallback")
    // Store in localStorage as fallback
    const expense = {
      ...data,
      id: `exp-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: "approved" as const,
    }

    const existing = JSON.parse(localStorage.getItem("islamic-welfare-expenses") || "[]")
    existing.push(expense)
    localStorage.setItem("islamic-welfare-expenses", JSON.stringify(existing))

    return { success: true, id: expense.id }
  }

  try {
    const docRef = await addDoc(collection(db, "expenses"), {
      ...data,
      amount: Number(data.amount),
      submittedAt: Timestamp.now(),
      status: "approved",
    })

    console.log("Expense document written with ID: ", docRef.id)
    return { success: true, id: docRef.id }
  } catch (error: any) {
    console.error("Firebase error:", error)
    return { success: false, error: "ব্যয় সংরক্ষণে সমস্যা হয়েছে" }
  }
}

export const getExpenses = async () => {
  if (!isFirebaseConfigured()) {
    console.log("Using fallback for expenses")
    const expenses = JSON.parse(localStorage.getItem("islamic-welfare-expenses") || "[]")
    return { success: true, data: expenses }
  }

  try {
    const q = query(collection(db, "expenses"), orderBy("submittedAt", "desc"))
    const querySnapshot = await getDocs(q)
    const expenses: (ExpenseData & { id: string })[] = []

    querySnapshot.forEach((doc) => {
      expenses.push({ id: doc.id, ...doc.data() } as ExpenseData & { id: string })
    })

    return { success: true, data: expenses }
  } catch (error: any) {
    console.error("Firebase error:", error)
    return { success: true, data: [] }
  }
}

// Budget Management
export const createBudget = async (data: Omit<BudgetData, "createdAt" | "updatedAt" | "id">) => {
  if (!isFirebaseConfigured()) {
    const budget = {
      ...data,
      id: `budget-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const existing = JSON.parse(localStorage.getItem("islamic-welfare-budgets") || "[]")
    existing.push(budget)
    localStorage.setItem("islamic-welfare-budgets", JSON.stringify(existing))

    return { success: true, id: budget.id }
  }

  try {
    const docRef = await addDoc(collection(db, "budgets"), {
      ...data,
      allocatedAmount: Number(data.allocatedAmount),
      spentAmount: Number(data.spentAmount),
      remainingAmount: Number(data.remainingAmount),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })

    return { success: true, id: docRef.id }
  } catch (error: any) {
    console.error("Firebase error:", error)
    return { success: false, error: "বাজেট তৈরিতে সমস্যা হয়েছে" }
  }
}

export const getBudgets = async () => {
  if (!isFirebaseConfigured()) {
    const budgets = JSON.parse(localStorage.getItem("islamic-welfare-budgets") || "[]")
    return { success: true, data: budgets }
  }

  try {
    const q = query(collection(db, "budgets"), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)
    const budgets: (BudgetData & { id: string })[] = []

    querySnapshot.forEach((doc) => {
      budgets.push({ id: doc.id, ...doc.data() } as BudgetData & { id: string })
    })

    return { success: true, data: budgets }
  } catch (error: any) {
    console.error("Firebase error:", error)
    return { success: true, data: [] }
  }
}

// Financial Reports
export const generateFinancialReport = async (data: Omit<FinancialReportData, "generatedAt" | "id">) => {
  if (!isFirebaseConfigured()) {
    const report = {
      ...data,
      id: `report-${Date.now()}`,
      generatedAt: new Date().toISOString(),
    }

    const existing = JSON.parse(localStorage.getItem("islamic-welfare-reports") || "[]")
    existing.push(report)
    localStorage.setItem("islamic-welfare-reports", JSON.stringify(existing))

    return { success: true, id: report.id }
  }

  try {
    const docRef = await addDoc(collection(db, "financialReports"), {
      ...data,
      totalIncome: Number(data.totalIncome),
      totalExpense: Number(data.totalExpense),
      netBalance: Number(data.netBalance),
      generatedAt: Timestamp.now(),
    })

    return { success: true, id: docRef.id }
  } catch (error: any) {
    console.error("Firebase error:", error)
    return { success: false, error: "রিপোর্ট তৈরিতে সমস্যা হয়েছে" }
  }
}

export const getFinancialReports = async () => {
  if (!isFirebaseConfigured()) {
    const reports = JSON.parse(localStorage.getItem("islamic-welfare-reports") || "[]")
    return { success: true, data: reports }
  }

  try {
    const q = query(collection(db, "financialReports"), orderBy("generatedAt", "desc"))
    const querySnapshot = await getDocs(q)
    const reports: (FinancialReportData & { id: string })[] = []

    querySnapshot.forEach((doc) => {
      reports.push({ id: doc.id, ...doc.data() } as FinancialReportData & { id: string })
    })

    return { success: true, data: reports }
  } catch (error: any) {
    console.error("Firebase error:", error)
    return { success: true, data: [] }
  }
}

// Get donations by date range for reports
export const getDonationsByDateRange = async (startDate: Date, endDate: Date) => {
  if (!isFirebaseConfigured()) {
    // For fallback, just return all donations (simplified)
    const result = await getDonationsFallback()
    return result
  }

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
  } catch (error: any) {
    console.error("Error fetching donations by date range:", error)
    // Fallback to getting all donations
    return getDonationsFallback()
  }
}

// Get expenses by date range
export const getExpensesByDateRange = async (startDate: Date, endDate: Date) => {
  if (!isFirebaseConfigured()) {
    const expenses = JSON.parse(localStorage.getItem("islamic-welfare-expenses") || "[]")
    return { success: true, data: expenses }
  }

  try {
    const q = query(
      collection(db, "expenses"),
      where("submittedAt", ">=", Timestamp.fromDate(startDate)),
      where("submittedAt", "<=", Timestamp.fromDate(endDate)),
      orderBy("submittedAt", "desc"),
    )
    const querySnapshot = await getDocs(q)
    const expenses: (ExpenseData & { id: string })[] = []

    querySnapshot.forEach((doc) => {
      expenses.push({ id: doc.id, ...doc.data() } as ExpenseData & { id: string })
    })

    return { success: true, data: expenses }
  } catch (error: any) {
    console.error("Error fetching expenses by date range:", error)
    return { success: true, data: [] }
  }
}

// Update budget spent amount
export const updateBudgetSpent = async (budgetId: string, newSpentAmount: number) => {
  if (!isFirebaseConfigured()) {
    const budgets = JSON.parse(localStorage.getItem("islamic-welfare-budgets") || "[]")
    const updatedBudgets = budgets.map((budget: any) => {
      if (budget.id === budgetId) {
        return {
          ...budget,
          spentAmount: newSpentAmount,
          remainingAmount: budget.allocatedAmount - newSpentAmount,
          updatedAt: new Date().toISOString(),
        }
      }
      return budget
    })
    localStorage.setItem("islamic-welfare-budgets", JSON.stringify(updatedBudgets))
    return { success: true }
  }

  try {
    const budgetRef = doc(db, "budgets", budgetId)
    await updateDoc(budgetRef, {
      spentAmount: Number(newSpentAmount),
      updatedAt: Timestamp.now(),
    })

    return { success: true }
  } catch (error: any) {
    console.error("Error updating budget:", error)
    return { success: false, error: "বাজেট আপডেটে সমস্যা হয়েছে" }
  }
}

// Generate unique donation ID
export const generateDonationId = () => {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 1000)
  return `DON-${timestamp}-${random}`
}
