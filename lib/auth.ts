import { signInWithEmailAndPassword, signOut, onAuthStateChanged, type User } from "firebase/auth"
import { auth } from "./firebase"

// Demo credentials for testing
const DEMO_CREDENTIALS = {
  email: "admin@islamicwelfare.org",
  password: "password123",
}

// Check if Firebase is properly configured
const isFirebaseConfigured = () => {
  try {
    return !!(
      auth &&
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== "demo-api-key" &&
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID !== "demo-project"
    )
  } catch {
    return false
  }
}

export const signIn = async (email: string, password: string) => {
  console.log("Starting sign in process...")
  console.log("Email:", email)
  console.log("Firebase configured:", isFirebaseConfigured())

  // First, always check demo credentials
  if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
    console.log("Demo credentials matched, using demo authentication")

    // Store demo session in localStorage
    if (typeof window !== "undefined") {
      const demoUser = {
        email: email,
        uid: "demo-user-123",
        displayName: "Demo Admin",
        loginTime: Date.now(),
      }

      localStorage.setItem("demo-auth", JSON.stringify(demoUser))
      console.log("Demo session stored in localStorage")
    }

    return {
      success: true,
      user: {
        email: email,
        uid: "demo-user-123",
        displayName: "Demo Admin",
      },
    }
  }

  // Only try Firebase if it's properly configured AND not using demo credentials
  if (isFirebaseConfigured()) {
    try {
      console.log("Attempting Firebase authentication...")
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log("Firebase authentication successful")
      return { success: true, user: userCredential.user }
    } catch (error: any) {
      console.error("Firebase authentication failed:", error)

      // Handle specific Firebase errors
      let errorMessage = "লগইন করতে সমস্যা হয়েছে"

      switch (error.code) {
        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
          errorMessage = "ইমেইল বা পাসওয়ার্ড ভুল। ডেমো অ্যাকাউন্ট ব্যবহার করুন।"
          break
        case "auth/invalid-email":
          errorMessage = "ইমেইল ঠিকানা সঠিক নয়"
          break
        case "auth/network-request-failed":
          errorMessage = "ইন্টারনেট সংযোগ চেক করুন"
          break
        case "auth/too-many-requests":
          errorMessage = "অনেকবার চেষ্টা করেছেন। কিছুক্ষণ পর আবার চেষ্টা করুন।"
          break
      }

      return { success: false, error: errorMessage }
    }
  }

  // If Firebase is not configured or credentials don't match demo
  console.log("Firebase not configured or invalid credentials")
  return {
    success: false,
    error: "ইমেইল বা পাসওয়ার্ড ভুল। ডেমো অ্যাকাউন্ট ব্যবহার করুন: admin@islamicwelfare.org / password123",
  }
}

export const signOutUser = async () => {
  try {
    console.log("Signing out user...")

    // Clear demo session
    if (typeof window !== "undefined") {
      localStorage.removeItem("demo-auth")
      console.log("Demo session cleared")
    }

    // Sign out from Firebase if available and configured
    if (isFirebaseConfigured() && auth) {
      await signOut(auth)
      console.log("Firebase sign out successful")
    }

    return { success: true }
  } catch (error: any) {
    console.error("Error signing out:", error)
    return { success: false, error: error.message }
  }
}

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  console.log("Setting up auth state listener...")

  // Check for demo session first
  if (typeof window !== "undefined") {
    const checkDemoSession = () => {
      const demoAuth = localStorage.getItem("demo-auth")
      if (demoAuth) {
        try {
          const demoUser = JSON.parse(demoAuth)
          // Check if demo session is still valid (24 hours)
          if (Date.now() - demoUser.loginTime < 24 * 60 * 60 * 1000) {
            console.log("Valid demo session found")
            callback(demoUser as User)
            return true
          } else {
            console.log("Demo session expired, removing...")
            localStorage.removeItem("demo-auth")
          }
        } catch (error) {
          console.error("Error parsing demo session:", error)
          localStorage.removeItem("demo-auth")
        }
      }
      return false
    }

    // Check demo session immediately
    if (checkDemoSession()) {
      return () => {} // Return empty unsubscribe function
    }

    // Set up storage listener for demo session changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "demo-auth") {
        checkDemoSession()
      }
    }

    window.addEventListener("storage", handleStorageChange)

    // Clean up function
    const cleanup = () => {
      window.removeEventListener("storage", handleStorageChange)
    }

    // Use Firebase auth state change if available and configured
    if (isFirebaseConfigured() && auth) {
      console.log("Setting up Firebase auth state listener")
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log("Firebase auth state changed:", user ? "logged in" : "logged out")
        callback(user)
      })

      return () => {
        cleanup()
        unsubscribe()
      }
    }

    // If no Firebase, call callback with null
    callback(null)
    return cleanup
  }

  // Server-side or no window object
  callback(null)
  return () => {}
}

// Helper function to check if user is authenticated
export const getCurrentUser = () => {
  // Check demo session first
  if (typeof window !== "undefined") {
    const demoAuth = localStorage.getItem("demo-auth")
    if (demoAuth) {
      try {
        const demoUser = JSON.parse(demoAuth)
        if (Date.now() - demoUser.loginTime < 24 * 60 * 60 * 1000) {
          return demoUser
        } else {
          localStorage.removeItem("demo-auth")
        }
      } catch (error) {
        localStorage.removeItem("demo-auth")
      }
    }
  }

  // Return Firebase current user if available and configured
  if (isFirebaseConfigured() && auth) {
    return auth.currentUser
  }

  return null
}

// Helper function to check authentication status
export const isAuthenticated = () => {
  return !!getCurrentUser()
}
