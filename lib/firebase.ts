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

const firebaseConfig = {
  apiKey: "AIzaSyBJXNDClmWC96JttLBAqZ_cgzwUU9lGkkU",
  authDomain: "islamic-welfare-org-bd.firebaseapp.com",
  projectId: "islamic-welfare-org-bd",
  storageBucket: "islamic-welfare-org-bd.appspot.com",
  messagingSenderId: "222987932917",
  appId: "1:222987932917:web:62fcd59b0f633cedc0a1bc"
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
} catch (error) {
  console.warn("Firebase initialization failed:", error)
  console.warn("Using fallback storage instead")
}

export { db, auth }
export default app
