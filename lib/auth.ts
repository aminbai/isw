import { signInWithEmailAndPassword, signOut, onAuthStateChanged, type User } from "firebase/auth"
import { auth } from "./firebase"

const isFirebaseConfigured = () => {
  try {
    return !!(
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== "AIzaSyBJXNDClmWC96JttLBAqZ_cgzwUU9lGkkU" &&
      auth
    )
  } catch {
    return false
  }
}

export const signIn = async (email: string, password: string) => {
  if (!isFirebaseConfigured()) {
    console.log("Firebase not configured, using demo login")
    // Demo login for testing
    if (email === "admin@islamicwelfare.org" && password === "password123") {
      return { success: true, user: { email } }
    }
    return { success: false, error: "ভুল ইমেইল বা পাসওয়ার্ড" }
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { success: true, user: userCredential.user }
  } catch (error: any) {
    console.error("Error signing in:", error)
    return { success: false, error: error.message }
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
