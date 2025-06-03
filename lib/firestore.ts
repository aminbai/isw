import { collection, addDoc, getDocs, query, orderBy, where, Timestamp, updateDoc, doc } from "firebase/firestore"
import { db } from "./firebase"
import { isFirebaseConfigured } from "./firebase"
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
  submittedAt: Timestamp | string
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
  createdAt: Timestamp | string
  updatedAt: Timestamp | string
}

export interface FinancialReportData {
  id?: string
  reportType: "monthly" | "quarterly" | "yearly"
  period: string
  totalIncome: number
  totalExpense: number
  netBalance: number
  generatedAt: Timestamp | string
  generatedBy: string
}

// Admission form functions
export const submitAdmissionForm = async (data: Omit<AdmissionData, "submittedAt" | "status">) => {
  console.log("📝 Submitting admission form...")
  console.log("🔥 Firebase configured:", isFirebaseConfigured())

  if (!isFirebaseConfigured()) {
    console.log("📦 Using fallback storage for admission")
    return submitAdmissionFormFallback(data)
  }

  try {
    console.log("🔥 Saving to Firestore...")
    const docRef = await addDoc(collection(db, "admissions"), {
      ...data,
      submittedAt: Timestamp.now(),
      status: "pending",
    })

    console.log("✅ Admission saved with ID:", docRef.id)
    return { success: true, id: docRef.id }
  } catch (error: any) {
    console.error("❌ Firestore error, using fallback:", error)
    return submitAdmissionFormFallback(data)
  }
}

export const getAdmissions = async () => {
  if (!isFirebaseConfigured()) {
    console.log("📦 Using fallback for admissions")
    return getAdmissionsFallback()
  }

  try {
    console.log("🔥 Fetching admissions from Firestore...")
    const q = query(collection(db, "admissions"), orderBy("submittedAt", "desc"))
    const querySnapshot = await getDocs(q)
    const admissions: (AdmissionData & { id: string })[] = []

    querySnapshot.forEach((doc) => {
      admissions.push({ id: doc.id, ...doc.data() } as AdmissionData & { id: string })
    })

    console.log("✅ Fetched", admissions.length, "admissions from Firestore")
    return { success: true, data: admissions }
  } catch (error: any) {
    console.error("❌ Firestore error, using fallback:", error)
    return getAdmissionsFallback()
  }
}

// Campaign join functions
export const submitCampaignJoinForm = async (data: Omit<CampaignJoinData, "submittedAt" | "status">) => {
  console.log("📝 Submitting campaign join form...")
  console.log("🔥 Firebase configured:", isFirebaseConfigured())

  if (!isFirebaseConfigured()) {
    console.log("📦 Using fallback storage for campaign join")
    return submitCampaignJoinFormFallback(data)
  }

  try {
    console.log("🔥 Saving campaign join to Firestore...")
    const docRef = await addDoc(collection(db, "campaignJoins"), {
      ...data,
      submittedAt: Timestamp.now(),
      status: "pending",
    })

    console.log("✅ Campaign join saved with ID:", docRef.id)
    return { success: true, id: docRef.id }
  } catch (error: any) {
    console.error("❌ Firestore error, using fallback:", error)
    return submitCampaignJoinFormFallback(data)
  }
}

export const getCampaignJoins = async () => {
  if (!isFirebaseConfigured()) {
    console.log("📦 Using fallback for campaign joins")
    return getCampaignJoinsFallback()
  }

  try {
    console.log("🔥 Fetching campaign joins from Firestore...")
    const q = query(collection(db, "campaignJoins"), orderBy("submittedAt", "desc"))
    const querySnapshot = await getDocs(q)
    const campaignJoins: (CampaignJoinData & { id: string })[] = []

    querySnapshot.forEach((doc) => {
      campaignJoins.push({ id: doc.id, ...doc.data() } as CampaignJoinData & { id: string })
    })

    console.log("✅ Fetched", campaignJoins.length, "campaign joins from Firestore")
    return { success: true, data: campaignJoins }
  } catch (error: any) {
    console.error("❌ Firestore error, using fallback:", error)
    return getCampaignJoinsFallback()
  }
}

// Donation functions
export const submitDonationForm = async (data: Omit<DonationData, "submittedAt" | "verified">) => {
  console.log("💰 Submitting donation form...")
  console.log("🔥 Firebase configured:", isFirebaseConfigured())

  if (!isFirebaseConfigured()) {
    console.log("📦 Using fallback storage for donation")
    return submitDonationFormFallback(data)
  }

  try {
    console.log("🔥 Saving donation to Firestore...")
    const docRef = await addDoc(collection(db, "donations"), {
      ...data,
      amount: Number(data.amount),
      submittedAt: Timestamp.now(),
      verified: false,
    })

    console.log("✅ Donation saved with ID:", docRef.id)
    return { success: true, id: docRef.id }
  } catch (error: any) {
    console.error("❌ Firestore error, using fallback:", error)
    return submitDonationFormFallback(data)
  }
}

export const getDonations = async () => {
  if (!isFirebaseConfigured()) {
    console.log("📦 Using fallback for donations")
    return getDonationsFallback()
  }

  try {
    console.log("🔥 Fetching donations from Firestore...")
    const q = query(collection(db, "donations"), orderBy("submittedAt", "desc"))
    const querySnapshot = await getDocs(q)
    const donations: (DonationData & { id: string })[] = []

    querySnapshot.forEach((doc) => {
      donations.push({ id: doc.id, ...doc.data() } as DonationData & { id: string })
    })

    console.log("✅ Fetched", donations.length, "donations from Firestore")
    return { success: true, data: donations }
  } catch (error: any) {
    console.error("❌ Firestore error, using fallback:", error)
    return getDonationsFallback()
  }
}

// FINANCIAL MANAGEMENT FUNCTIONS

// Expense Management
export const submitExpenseForm = async (data: Omit<ExpenseData, "submittedAt" | "status" | "id">) => {
  console.log("💸 Submitting expense form...", data)

  if (!isFirebaseConfigured()) {
    console.log("📦 Using fallback storage for expense")
    const expense = {
      ...data,
      id: `exp-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: "approved" as const,
    }

    try {
      const existing = JSON.parse(localStorage.getItem("islamic-welfare-expenses") || "[]")
      existing.push(expense)
      localStorage.setItem("islamic-welfare-expenses", JSON.stringify(existing))
      console.log("✅ Expense saved to localStorage")
      return { success: true, id: expense.id }
    } catch (error) {
      console.error("❌ LocalStorage error:", error)
      return { success: false, error: "ব্যয় সংরক্ষণে সমস্যা হয়েছে" }
    }
  }

  try {
    console.log("🔥 Saving expense to Firestore...")
    const expenseData = {
      ...data,
      amount: Number(data.amount),
      submittedAt: Timestamp.now(),
      status: "approved" as const,
    }

    const docRef = await addDoc(collection(db, "expenses"), expenseData)
    console.log("✅ Expense saved with ID:", docRef.id)
    return { success: true, id: docRef.id }
  } catch (error: any) {
    console.error("❌ Firestore error:", error)
    return { success: false, error: "ব্যয় সংরক্ষণে সমস্যা হয়েছে" }
  }
}

export const getExpenses = async () => {
  if (!isFirebaseConfigured()) {
    console.log("📦 Using fallback for expenses")
    try {
      const expenses = JSON.parse(localStorage.getItem("islamic-welfare-expenses") || "[]")
      console.log("✅ Fetched", expenses.length, "expenses from localStorage")
      return { success: true, data: expenses }
    } catch (error) {
      console.error("❌ LocalStorage error:", error)
      return { success: true, data: [] }
    }
  }

  try {
    console.log("🔥 Fetching expenses from Firestore...")
    const q = query(collection(db, "expenses"), orderBy("submittedAt", "desc"))
    const querySnapshot = await getDocs(q)
    const expenses: (ExpenseData & { id: string })[] = []

    querySnapshot.forEach((doc) => {
      expenses.push({ id: doc.id, ...doc.data() } as ExpenseData & { id: string })
    })

    console.log("✅ Fetched", expenses.length, "expenses from Firestore")
    return { success: true, data: expenses }
  } catch (error: any) {
    console.error("❌ Firestore error:", error)
    return { success: true, data: [] }
  }
}

// Budget Management
export const createBudget = async (data: Omit<BudgetData, "createdAt" | "updatedAt" | "id">) => {
  console.log("📊 Creating budget...", data)

  if (!isFirebaseConfigured()) {
    console.log("📦 Using fallback storage for budget")
    const budget = {
      ...data,
      id: `budget-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    try {
      const existing = JSON.parse(localStorage.getItem("islamic-welfare-budgets") || "[]")
      existing.push(budget)
      localStorage.setItem("islamic-welfare-budgets", JSON.stringify(existing))
      console.log("✅ Budget saved to localStorage")
      return { success: true, id: budget.id }
    } catch (error) {
      console.error("❌ LocalStorage error:", error)
      return { success: false, error: "বাজেট তৈরিতে সমস্যা হয়েছে" }
    }
  }

  try {
    console.log("🔥 Saving budget to Firestore...")
    const budgetData = {
      ...data,
      allocatedAmount: Number(data.allocatedAmount),
      spentAmount: Number(data.spentAmount),
      remainingAmount: Number(data.remainingAmount),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    }

    const docRef = await addDoc(collection(db, "budgets"), budgetData)
    console.log("✅ Budget saved with ID:", docRef.id)
    return { success: true, id: docRef.id }
  } catch (error: any) {
    console.error("❌ Firestore error:", error)
    return { success: false, error: "বাজেট তৈরিতে সমস্যা হয়েছে" }
  }
}

export const getBudgets = async () => {
  if (!isFirebaseConfigured()) {
    console.log("📦 Using fallback for budgets")
    try {
      const budgets = JSON.parse(localStorage.getItem("islamic-welfare-budgets") || "[]")
      console.log("✅ Fetched", budgets.length, "budgets from localStorage")
      return { success: true, data: budgets }
    } catch (error) {
      console.error("❌ LocalStorage error:", error)
      return { success: true, data: [] }
    }
  }

  try {
    console.log("🔥 Fetching budgets from Firestore...")
    const q = query(collection(db, "budgets"), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)
    const budgets: (BudgetData & { id: string })[] = []

    querySnapshot.forEach((doc) => {
      budgets.push({ id: doc.id, ...doc.data() } as BudgetData & { id: string })
    })

    console.log("✅ Fetched", budgets.length, "budgets from Firestore")
    return { success: true, data: budgets }
  } catch (error: any) {
    console.error("❌ Firestore error:", error)
    return { success: true, data: [] }
  }
}

// Financial Reports
export const generateFinancialReport = async (data: Omit<FinancialReportData, "generatedAt" | "id">) => {
  console.log("📈 Generating financial report...")

  if (!isFirebaseConfigured()) {
    console.log("📦 Using fallback storage for report")
    const report = {
      ...data,
      id: `report-${Date.now()}`,
      generatedAt: new Date().toISOString(),
    }

    try {
      const existing = JSON.parse(localStorage.getItem("islamic-welfare-reports") || "[]")
      existing.push(report)
      localStorage.setItem("islamic-welfare-reports", JSON.stringify(existing))
      console.log("✅ Report saved to localStorage")
      return { success: true, id: report.id }
    } catch (error) {
      console.error("❌ LocalStorage error:", error)
      return { success: false, error: "রিপোর্ট তৈরিতে সমস্যা হয়েছে" }
    }
  }

  try {
    console.log("🔥 Saving report to Firestore...")
    const reportData = {
      ...data,
      totalIncome: Number(data.totalIncome),
      totalExpense: Number(data.totalExpense),
      netBalance: Number(data.netBalance),
      generatedAt: Timestamp.now(),
    }

    const docRef = await addDoc(collection(db, "financialReports"), reportData)
    console.log("✅ Report saved with ID:", docRef.id)
    return { success: true, id: docRef.id }
  } catch (error: any) {
    console.error("❌ Firestore error:", error)
    return { success: false, error: "রিপোর্ট তৈরিতে সমস্যা হয়েছে" }
  }
}

export const getFinancialReports = async () => {
  if (!isFirebaseConfigured()) {
    console.log("📦 Using fallback for reports")
    try {
      const reports = JSON.parse(localStorage.getItem("islamic-welfare-reports") || "[]")
      console.log("✅ Fetched", reports.length, "reports from localStorage")
      return { success: true, data: reports }
    } catch (error) {
      console.error("❌ LocalStorage error:", error)
      return { success: true, data: [] }
    }
  }

  try {
    console.log("🔥 Fetching reports from Firestore...")
    const q = query(collection(db, "financialReports"), orderBy("generatedAt", "desc"))
    const querySnapshot = await getDocs(q)
    const reports: (FinancialReportData & { id: string })[] = []

    querySnapshot.forEach((doc) => {
      reports.push({ id: doc.id, ...doc.data() } as FinancialReportData & { id: string })
    })

    console.log("✅ Fetched", reports.length, "reports from Firestore")
    return { success: true, data: reports }
  } catch (error: any) {
    console.error("❌ Firestore error:", error)
    return { success: true, data: [] }
  }
}

// Get donations by date range for reports
export const getDonationsByDateRange = async (startDate: Date, endDate: Date) => {
  if (!isFirebaseConfigured()) {
    console.log("📦 Using fallback for date range donations")
    const result = await getDonationsFallback()
    return result
  }

  try {
    console.log("🔥 Fetching donations by date range from Firestore...")
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

    console.log("✅ Fetched", donations.length, "donations by date range from Firestore")
    return { success: true, data: donations }
  } catch (error: any) {
    console.error("❌ Firestore error, using fallback:", error)
    return getDonationsFallback()
  }
}

// Get expenses by date range
export const getExpensesByDateRange = async (startDate: Date, endDate: Date) => {
  if (!isFirebaseConfigured()) {
    console.log("📦 Using fallback for date range expenses")
    try {
      const expenses = JSON.parse(localStorage.getItem("islamic-welfare-expenses") || "[]")
      return { success: true, data: expenses }
    } catch (error) {
      console.error("❌ LocalStorage error:", error)
      return { success: true, data: [] }
    }
  }

  try {
    console.log("🔥 Fetching expenses by date range from Firestore...")
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

    console.log("✅ Fetched", expenses.length, "expenses by date range from Firestore")
    return { success: true, data: expenses }
  } catch (error: any) {
    console.error("❌ Firestore error:", error)
    return { success: true, data: [] }
  }
}

// Update budget spent amount
export const updateBudgetSpent = async (budgetId: string, newSpentAmount: number) => {
  if (!isFirebaseConfigured()) {
    console.log("📦 Using fallback for budget update")
    try {
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
      console.log("✅ Budget updated in localStorage")
      return { success: true }
    } catch (error) {
      console.error("❌ LocalStorage error:", error)
      return { success: false, error: "বাজেট আপডেটে সমস্যা হয়েছে" }
    }
  }

  try {
    console.log("🔥 Updating budget in Firestore...")
    const budgetRef = doc(db, "budgets", budgetId)
    await updateDoc(budgetRef, {
      spentAmount: Number(newSpentAmount),
      updatedAt: Timestamp.now(),
    })

    console.log("✅ Budget updated in Firestore")
    return { success: true }
  } catch (error: any) {
    console.error("❌ Firestore error:", error)
    return { success: false, error: "বাজেট আপডেটে সমস্যা হয়েছে" }
  }
}

// Generate unique donation ID
export const generateDonationId = () => {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 1000)
  return `DON-${timestamp}-${random}`
}
