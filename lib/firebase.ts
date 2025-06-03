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

// ফলব্যাক ভ্যালু হিসেবে ডেমো কনফিগারেশন ব্যবহার করা হচ্ছে
// প্রোডাকশনে এই ডেমো কনফিগারেশন কাজ করবে না
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:abcdef123456",
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

export { db, auth }
export default app
