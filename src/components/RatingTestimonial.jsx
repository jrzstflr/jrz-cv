"use client"

import { useEffect, useState } from "react"
import {
  auth,
  githubProvider,
  googleProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
  onAuthStateChanged,
  db,
  collection,
  addDoc,
  serverTimestamp,
} from "../lib/firebase"

export default function RatingTestimonial({ onSubmitted, autoApprove = true }) {
  const [user, setUser] = useState(null)
  const [rating, setRating] = useState(5)
  const [hover, setHover] = useState(0)
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  
  // New state for email/password authentication
  const [authMode, setAuthMode] = useState("signin") // "signin" | "signup" | "reset"
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [authError, setAuthError] = useState("")
  const [authSuccess, setAuthSuccess] = useState("")

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(
        u
          ? {
              uid: u.uid,
              displayName: u.displayName || u.email,
              photoURL: u.photoURL,
              emailVerified: u.emailVerified,
            }
          : null,
      )
    })
    return () => unsub()
  }, [])

  // OAuth sign-in (Google/GitHub)
  async function handleOAuthSignIn(provider) {
    try {
      setAuthError("")
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.error("OAuth sign in error:", error)
      setAuthError(getErrorMessage(error.code))
    }
  }

  // Email/Password sign up
  async function handleSignUp(e) {
    e.preventDefault()
    if (!email || !password || !displayName) {
      setAuthError("Please fill in all fields")
      return
    }
    if (password.length < 6) {
      setAuthError("Password must be at least 6 characters")
      return
    }

    setLoading(true)
    setAuthError("")
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      
      // Update profile with display name
      await updateProfile(userCredential.user, {
        displayName: displayName,
      })

      // Send verification email
      await sendEmailVerification(userCredential.user)
      
      setAuthSuccess("Account created! Please check your email to verify your account.")
      setEmail("")
      setPassword("")
      setDisplayName("")
    } catch (error) {
      console.error("Sign up error:", error)
      setAuthError(getErrorMessage(error.code))
    }
    setLoading(false)
  }

  // Email/Password sign in
  async function handleSignIn(e) {
    e.preventDefault()
    if (!email || !password) {
      setAuthError("Please enter email and password")
      return
    }

    setLoading(true)
    setAuthError("")
    try {
      await signInWithEmailAndPassword(auth, email, password)
      setEmail("")
      setPassword("")
    } catch (error) {
      console.error("Sign in error:", error)
      setAuthError(getErrorMessage(error.code))
    }
    setLoading(false)
  }

  // Password reset
  async function handlePasswordReset(e) {
    e.preventDefault()
    if (!email) {
      setAuthError("Please enter your email address")
      return
    }

    setLoading(true)
    setAuthError("")
    try {
      await sendPasswordResetEmail(auth, email)
      setAuthSuccess("Password reset email sent! Check your inbox.")
      setEmail("")
    } catch (error) {
      console.error("Password reset error:", error)
      setAuthError(getErrorMessage(error.code))
    }
    setLoading(false)
  }

  // Resend verification email
  async function handleResendVerification() {
    if (!auth.currentUser) return
    
    try {
      await sendEmailVerification(auth.currentUser)
      setAuthSuccess("Verification email sent! Check your inbox.")
    } catch (error) {
      console.error("Resend verification error:", error)
      setAuthError(getErrorMessage(error.code))
    }
  }

  // Helper function to get user-friendly error messages
  function getErrorMessage(errorCode) {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "This email is already registered. Please sign in instead."
      case "auth/invalid-email":
        return "Invalid email address."
      case "auth/weak-password":
        return "Password is too weak. Use at least 6 characters."
      case "auth/user-not-found":
        return "No account found with this email."
      case "auth/wrong-password":
        return "Incorrect password."
      case "auth/too-many-requests":
        return "Too many failed attempts. Please try again later."
      case "auth/network-request-failed":
        return "Network error. Please check your connection."
      default:
        return "An error occurred. Please try again."
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!user) return alert("Please sign in first.")
    
    // Check email verification for email/password users
    if (!user.emailVerified && auth.currentUser?.providerData[0]?.providerId === "password") {
      setAuthError("Please verify your email before submitting a testimonial.")
      return
    }
    
    if (!comment.trim()) return alert("Please write a testimonial.")

    setLoading(true)
    try {
      await addDoc(collection(db, "testimonials"), {
        rating,
        comment: comment.slice(0, 2000),
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        approved: false,
        createdAt: serverTimestamp(),
      })

      setComment("")
      setRating(5)
      setSubmitted(true)
      onSubmitted?.()

      setTimeout(() => setSubmitted(false), 3000)
    } catch (error) {
      console.error("Submit error:", error)
      alert("Failed to submit testimonial. Please try again.")
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 p-6 rounded-xl text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <h3 className="text-lg font-semibold text-green-400">Thank You!</h3>
        </div>
        <p className="text-gray-300">Your testimonial has been submitted successfully!</p>
        <p className="text-sm text-gray-400 mt-2">It will appear in the testimonials section shortly.</p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
      {!user ? (
        <div>
          <div className="text-center mb-6">
            <svg className="w-16 h-16 text-gray-600 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="text-xl font-semibold text-white mb-2">Share Your Experience</h3>
            <p className="text-gray-400 mb-6">
              Sign in to leave a testimonial and help others learn about my work.
            </p>
          </div>

          {/* Error/Success Messages */}
          {authError && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {authError}
            </div>
          )}
          {authSuccess && (
            <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm">
              {authSuccess}
            </div>
          )}

          {/* OAuth Providers */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleOAuthSignIn(googleProvider)}
              className="w-full inline-flex items-center justify-center gap-3 px-6 py-3 bg-white hover:bg-gray-50 text-gray-800 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-white/25"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </button>

            <button
              onClick={() => handleOAuthSignIn(githubProvider)}
              className="w-full inline-flex items-center justify-center gap-3 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-gray-800/25"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
              Sign in with GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800/50 text-gray-400">Or continue with email</span>
            </div>
          </div>

          {/* Email/Password Forms */}
          {authMode === "signin" && (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
              <div className="flex justify-between text-sm">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("signup")
                    setAuthError("")
                    setAuthSuccess("")
                  }}
                  className="text-purple-400 hover:text-purple-300"
                >
                  Create account
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("reset")
                    setAuthError("")
                    setAuthSuccess("")
                  }}
                  className="text-purple-400 hover:text-purple-300"
                >
                  Forgot password?
                </button>
              </div>
            </form>
          )}

          {authMode === "signup" && (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-400 mt-1">Minimum 6 characters</p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("signin")
                    setAuthError("")
                    setAuthSuccess("")
                  }}
                  className="text-sm text-purple-400 hover:text-purple-300"
                >
                  Already have an account? Sign in
                </button>
              </div>
            </form>
          )}

          {authMode === "reset" && (
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-400 mt-1">
                  We'll send you a link to reset your password
                </p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("signin")
                    setAuthError("")
                    setAuthSuccess("")
                  }}
                  className="text-sm text-purple-400 hover:text-purple-300"
                >
                  Back to sign in
                </button>
              </div>
            </form>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-4 p-4 bg-gray-700/30 rounded-lg">
            <img
              src={user.photoURL || "/placeholder.svg"}
              alt="avatar"
              className="w-12 h-12 rounded-full border-2 border-purple-500/50"
            />
            <div className="flex-1">
              <div className="font-semibold text-white">{user.displayName}</div>
              <div className="text-sm text-gray-400">
                {user.emailVerified ? (
                  <span className="text-green-400">Verified</span>
                ) : (
                  <span className="text-yellow-400">Email not verified</span>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => signOut(auth)}
              className="text-sm text-red-400 hover:text-red-300 transition-colors duration-200"
            >
              Sign out
            </button>
          </div>

          {/* Email verification warning */}
          {!user.emailVerified && auth.currentUser?.providerData[0]?.providerId === "password" && (
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <p className="text-sm text-yellow-400 mb-2">
                Please verify your email to submit testimonials.
              </p>
              <button
                type="button"
                onClick={handleResendVerification}
                className="text-sm text-yellow-300 hover:text-yellow-200 underline"
              >
                Resend verification email
              </button>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Rate your experience</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i)}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(0)}
                  className="transition-transform duration-200 hover:scale-110"
                >
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                    fill={(hover || rating) >= i ? "#fbbf24" : "none"}
                    stroke={(hover || rating) >= i ? "#fbbf24" : "currentColor"}
                    strokeWidth="1.5"
                  >
                    <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.179L12 18.896 4.664 23.177l1.402-8.179L.132 9.21l8.2-1.192z" />
                  </svg>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {rating === 5
                ? "Excellent!"
                : rating === 4
                  ? "Very Good"
                  : rating === 3
                    ? "Good"
                    : rating === 2
                      ? "Fair"
                      : "Poor"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Your testimonial</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience working with me. What did you like most? How did I help you achieve your goals?"
              rows={4}
              className="w-full p-4 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              maxLength={2000}
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-gray-500">{comment.length}/2000 characters</p>
              {comment.length > 1900 && (
                <p className="text-xs text-yellow-400">{2000 - comment.length} characters remaining</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !comment.trim() || (!user.emailVerified && auth.currentUser?.providerData[0]?.providerId === "password")}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit Testimonial"
            )}
          </button>
        </form>
      )}
    </div>
  )
}