"use client"

import { useState, useEffect } from "react"
import type { User } from "firebase/auth"
import { onAuthStateChange } from "@/lib/auth"

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if Firebase is properly configured
    const isFirebaseReady =
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== "AIzaSyBJXNDClmWC96JttLBAqZ_cgzwUU9lGkkU"

    if (!isFirebaseReady) {
      console.log("Firebase not configured, skipping auth")
      setLoading(false)
      return
    }

    try {
      const unsubscribe = onAuthStateChange((user) => {
        setUser(user)
        setLoading(false)
      })

      return () => unsubscribe()
    } catch (error) {
      console.error("Auth state change error:", error)
      setLoading(false)
    }
  }, [])

  return { user, loading, isAuthenticated: !!user }
}
