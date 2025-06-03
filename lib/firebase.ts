import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

// Check if all required environment variables are present
const requiredEnvVars = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
]

const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar])

if (missingEnvVars.length > 0) {
  console.warn("Missing Firebase environment variables:", missingEnvVars)
  console.warn("Firebase features will use fallback storage")
}

// ⚠️ এখানে পরিবর্তন করো - ডেমো কনফিগারেশন সরিয়ে আপনার প্রকৃত Firebase কনফিগারেশন দিন
const firebaseConfig = {
  // এখানে পরিবর্তন করো - "demo-api-key" এর পরিবর্তে আপনার API Key দিন
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBJXNDClmWC96JttLBAqZ_cgzwUU9lGkkU",

  // এখানে পরিবর্তন করো - "demo-project.firebaseapp.com" এর পরিবর্তে আপনার Auth Domain দিন
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "islamishomaj-ce77c.firebaseapp.com",

  // এখানে পরিবর্তন করো - "demo-project" এর পরিবর্তে আপনার Project ID দিন
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "islamishomaj-ce77c",

  // এখানে পরিবর্তন করো - "demo-project.appspot.com" এর পরিবর্তে আপনার Storage Bucket দিন
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "islamishomaj-ce77c.firebasestorage.app",

  // এখানে পরিবর্তন করো - "123456789" এর পরিবর্তে আপনার Messaging Sender ID দিন
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "222987932917",

  // এখানে পরিবর্তন করো - "1:123456789:web:abcdef123456" এর পরিবর্তে আপনার App ID দিন
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:222987932917:web:62fcd59b0f633cedc0a1bc",
}

// Initialize Firebase
let app: any = null
let db: any = null
let auth: any = null

try {
  app = initializeApp(firebaseConfig)
  db = getFirestore(app)
  auth = getAuth(app)
  console.log("Firebase initialized successfully")
  console.log("Using project:", firebaseConfig.projectId)
} catch (error) {
  console.warn("Firebase initialization failed:", error)
  console.warn("Using fallback storage instead")
}

// Firebase কনফিগারেশন সঠিক কিনা চেক করার ফাংশন
export const isFirebaseConfigured = () => {
  try {
    // ⚠️ এখানে পরিবর্তন করো - ডেমো ভ্যালু চেক করার পরিবর্তে আপনার প্রকৃত ভ্যালু চেক করুন
    const hasRealConfig =
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
      // এখানে পরিবর্তন করো - "demo-api-key" এর পরিবর্তে আপনার API Key দিন
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== "AIzaSyBJXNDClmWC96JttLBAqZ_cgzwUU9lGkkU" &&
      // এখানে পরিবর্তন করো - "demo-project" এর পরিবর্তে আপনার Project ID দিন
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID !== "islamishomaj-ce77c"

    return !!(hasRealConfig && db)
  } catch {
    return false
  }
}

export { db, auth }
export default app
