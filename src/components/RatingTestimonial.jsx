"use client"

import { useEffect, useState } from "react"
import {
  auth,
  githubProvider,
  signInWithPopup,
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

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(
        u
          ? {
              uid: u.uid,
              displayName: u.displayName || u.email,
              photoURL: u.photoURL,
            }
          : null,
      )
    })
    return () => unsub()
  }, [])

  async function handleSignIn() {
    try {
      await signInWithPopup(auth, githubProvider)
    } catch (error) {
      console.error("Sign in error:", error)
      alert("Failed to sign in. Please try again.")
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!user) return alert("Please sign in first.")
    if (!comment.trim()) return alert("Please write a testimonial.")

    setLoading(true)
    try {
      await addDoc(collection(db, "testimonials"), {
        rating,
        comment: comment.slice(0, 2000),
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        approved: false, // Must be false per security rules
        createdAt: serverTimestamp(),
      })

      setComment("")
      setRating(5)
      setSubmitted(true)
      onSubmitted?.()

      // Reset submitted state after 3 seconds
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
        <div className="text-center">
          <div className="mb-4">
            <svg className="w-16 h-16 text-gray-600 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="text-xl font-semibold text-white mb-2">Share Your Experience</h3>
            <p className="text-gray-400 mb-4">
              Sign in with GitHub to leave a testimonial and help others learn about my work.
            </p>
          </div>
          <button
            onClick={handleSignIn}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-gray-800/25 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
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
              <div className="text-sm text-gray-400">Signed in with GitHub</div>
            </div>
            <button
              type="button"
              onClick={() => signOut(auth)}
              className="text-sm text-red-400 hover:text-red-300 transition-colors duration-200"
            >
              Sign out
            </button>
          </div>

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
            disabled={loading || !comment.trim()}
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
