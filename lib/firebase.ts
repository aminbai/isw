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

// Firebase configuration - এখন আপনার প্রকৃত values ব্যবহার করছে
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBJXNDClmWC96JttLBAqZ_cgzwUU9lGkkU",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "islamishomaj-ce77c.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "islamishomaj-ce77c",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "islamishomaj-ce77c.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "222987932917",
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
  console.log("✅ Firebase initialized successfully")
  console.log("🔥 Using project:", firebaseConfig.projectId)
} catch (error) {
  console.warn("❌ Firebase initialization failed:", error)
  console.warn("📦 Using fallback storage instead")
}

// ✅ সঠিক Firebase configuration check
export const isFirebaseConfigured = () => {
  try {
    // সব environment variables আছে কিনা check করুন
    const hasAllEnvVars = requiredEnvVars.every((envVar) => process.env[envVar])

    // Firebase app এবং db initialized হয়েছে কিনা
    const isInitialized = !!(app && db && auth)

    console.log("🔍 Firebase Config Check:")
    console.log("- Environment variables:", hasAllEnvVars ? "✅" : "❌")
    console.log("- Firebase initialized:", isInitialized ? "✅" : "❌")
    console.log("- Project ID:", firebaseConfig.projectId)

    return hasAllEnvVars && isInitialized
  } catch (error) {
    console.error("❌ Firebase config check failed:", error)
    return false
  }
}

export { db, auth }
export default app
