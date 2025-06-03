import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  type User,
} from "firebase/auth"
import { auth } from "./firebase"
import { isFirebaseConfigured } from "./firebase"

// Google Auth Provider
const googleProvider = new GoogleAuthProvider()

export const signIn = async (email: string, password: string) => {
  console.log("🔐 Attempting email/password login...")
  console.log("🔥 Firebase configured:", isFirebaseConfigured())

  if (!isFirebaseConfigured()) {
    console.log("⚠️ Firebase not configured, using demo login")
    // Demo login - শুধুমাত্র development এর জন্য
    if (email === "admin@islamicwelfare.org" && password === "Admin123!") {
      console.log("✅ Demo login successful")
      return { success: true, user: { email } }
    }
    console.log("❌ Demo login failed")
    return { success: false, error: "ভুল ইমেইল বা পাসওয়ার্ড" }
  }

  try {
    console.log("🔥 Using Firebase authentication...")
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    console.log("✅ Firebase login successful")
    return { success: true, user: userCredential.user }
  } catch (error: any) {
    console.error("❌ Firebase login error:", error)
    let errorMessage = "লগইন করতে সমস্যা হয়েছে"

    // Firebase error messages in Bengali
    if (error.code === "auth/user-not-found") {
      errorMessage = "এই ইমেইল দিয়ে কোন অ্যাকাউন্ট নেই। প্রথমে Firebase Console থেকে user তৈরি করুন।"
    } else if (error.code === "auth/wrong-password") {
      errorMessage = "ভুল পাসওয়ার্ড"
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "অবৈধ ইমেইল ঠিকানা"
    } else if (error.code === "auth/too-many-requests") {
      errorMessage = "অনেকবার ভুল প্রচেষ্টা করা হয়েছে, কিছুক্ষণ পর আবার চেষ্টা করুন"
    } else if (error.code === "auth/invalid-credential") {
      errorMessage = "ভুল ইমেইল বা পাসওয়ার্ড। Firebase Console এ user আছে কিনা check করুন।"
    }

    return { success: false, error: errorMessage }
  }
}

// 🆕 Google Sign In Function
export const signInWithGoogle = async () => {
  console.log("🔐 Attempting Google login...")
  console.log("🔥 Firebase configured:", isFirebaseConfigured())

  if (!isFirebaseConfigured()) {
    console.log("⚠️ Firebase not configured")
    return { success: false, error: "Firebase সেটআপ সম্পূর্ণ করুন" }
  }

  try {
    console.log("🔥 Using Google authentication...")
    const result = await signInWithPopup(auth, googleProvider)
    const user = result.user

    console.log("✅ Google login successful:", user.email)
    return { success: true, user: user }
  } catch (error: any) {
    console.error("❌ Google login error:", error)
    let errorMessage = "Google দিয়ে লগইন করতে সমস্যা হয়েছে"

    if (error.code === "auth/popup-closed-by-user") {
      errorMessage = "লগইন বাতিল করা হয়েছে"
    } else if (error.code === "auth/popup-blocked") {
      errorMessage = "পপআপ ব্লক করা হয়েছে। ব্রাউজার সেটিংস চেক করুন।"
    } else if (error.code === "auth/cancelled-popup-request") {
      errorMessage = "লগইন প্রক্রিয়া বাতিল করা হয়েছে"
    }

    return { success: false, error: errorMessage }
  }
}

export const signOutUser = async () => {
  if (!isFirebaseConfigured()) {
    console.log("📦 Demo logout")
    return { success: true }
  }

  try {
    await signOut(auth)
    console.log("✅ Firebase logout successful")
    return { success: true }
  } catch (error: any) {
    console.error("❌ Firebase logout error:", error)
    return { success: false, error: error.message }
  }
}

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  if (!isFirebaseConfigured()) {
    console.log("📦 No Firebase auth state changes")
    callback(null)
    return () => {} // Return empty unsubscribe function
  }

  try {
    console.log("🔥 Setting up Firebase auth state listener")
    return onAuthStateChanged(auth, (user) => {
      console.log("🔐 Auth state changed:", user ? `Logged in as ${user.email}` : "Logged out")
      callback(user)
    })
  } catch (error) {
    console.error("❌ Auth state change error:", error)
    callback(null)
    return () => {}
  }
}
