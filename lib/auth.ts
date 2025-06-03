import { signInWithEmailAndPassword, signOut, onAuthStateChanged, type User } from "firebase/auth"
import { auth } from "./firebase"
import { isFirebaseConfigured } from "./firebase"

export const signIn = async (email: string, password: string) => {
  if (!isFirebaseConfigured()) {
    console.log("Firebase not configured, using demo login")
    // ⚠️ এখানে পরিবর্তন করো - ডেমো লগইন সরিয়ে দিন যখন Firebase সেটআপ হবে
    if (email === "admin@islamicwelfare.org" && password === "Admin123!") {
      return { success: true, user: { email } }
    }
    return { success: false, error: "ভুল ইমেইল বা পাসওয়ার্ড" }
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { success: true, user: userCredential.user }
  } catch (error: any) {
    console.error("Error signing in:", error)
    let errorMessage = "লগইন করতে সমস্যা হয়েছে"

    // Firebase এরর মেসেজ বাংলায় অনুবাদ
    if (error.code === "auth/user-not-found") {
      errorMessage = "এই ইমেইল দিয়ে কোন অ্যাকাউন্ট নেই"
    } else if (error.code === "auth/wrong-password") {
      errorMessage = "ভুল পাসওয়ার্ড"
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "অবৈধ ইমেইল ঠিকানা"
    } else if (error.code === "auth/too-many-requests") {
      errorMessage = "অনেকবার ভুল প্রচেষ্টা করা হয়েছে, কিছুক্ষণ পর আবার চেষ্টা করুন"
    }

    return { success: false, error: errorMessage }
  }
}

export const signOutUser = async () => {
  if (!isFirebaseConfigured()) {
    console.log("Firebase not configured, demo logout")
    return { success: true }
  }

  try {
    await signOut(auth)
    return { success: true }
  } catch (error: any) {
    console.error("Error signing out:", error)
    return { success: false, error: error.message }
  }
}

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  if (!isFirebaseConfigured()) {
    console.log("Firebase not configured, no auth state changes")
    callback(null)
    return () => {} // Return empty unsubscribe function
  }

  try {
    return onAuthStateChanged(auth, callback)
  } catch (error) {
    console.error("Auth state change error:", error)
    callback(null)
    return () => {}
  }
}
