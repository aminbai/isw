"use client"

import { useState, useEffect } from "react"
import type { User } from "firebase/auth"
import { onAuthStateChange, getCurrentUser } from "@/lib/auth"

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log("useAuth: Setting up authentication...")

    // Check for existing session immediately
    const currentUser = getCurrentUser()
    console.log("useAuth: Current user:", currentUser)

    if (currentUser) {
      setUser(currentUser)
      setLoading(false)
    }

    // Set up auth state listener
    const unsubscribe = onAuthStateChange((user) => {
      console.log("useAuth: Auth state changed:", user ? "logged in" : "logged out")
      setUser(user)
      setLoading(false)
    })

    // If no current user, stop loading after a short delay
    if (!currentUser) {
      const timer = setTimeout(() => {
        setLoading(false)
      }, 1000)

      return () => {
        clearTimeout(timer)
        if (typeof unsubscribe === "function") {
          unsubscribe()
        }
      }
    }

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe()
      }
    }
  }, [])

  return { user, loading, isAuthenticated: !!user }
}
