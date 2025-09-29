"use client"

import { useEffect, useState } from "react"
import { auth, onAuthStateChanged, db, collection, query, limit, onSnapshot, deleteDoc, doc } from "../lib/firebase"

export default function TestimonialList({ max = 12, showPending = false }) {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [isOwner, setIsOwner] = useState(false)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)

      // Check if user is signed in with GitHub and has the correct username
      const isGitHubUser = u?.providerData?.some((provider) => provider.providerId === "github.com")
      const gitHubUsername =
        u?.reloadUserInfo?.screenName || u?.providerData?.find((p) => p.providerId === "github.com")?.displayName

      setIsOwner(isGitHubUser && gitHubUsername === "jrzstflr")
    })
    return () => unsub()
  }, [])

  useEffect(() => {
    const testimonialsRef = collection(db, "testimonials")
    const q = query(testimonialsRef, limit(max))

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const testimonialData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        testimonialData.sort((a, b) => {
          const aTime = a.createdAt?.toDate?.() || new Date(0)
          const bTime = b.createdAt?.toDate?.() || new Date(0)
          return bTime - aTime // Descending order (newest first)
        })
        setTestimonials(testimonialData)
        setLoading(false)
      },
      (error) => {
        console.error("Error fetching testimonials:", error)
        setLoading(false)
      },
    )

    return () => unsubscribe()
  }, [max, showPending])

  const handleDelete = async (testimonialId) => {
    if (!isOwner) {
      return
    }

    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      try {
        await deleteDoc(doc(db, "testimonials", testimonialId))
      } catch (error) {
        console.error("Error deleting testimonial:", error)
        alert("Failed to delete testimonial. Please try again.")
      }
    }
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-600"}`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.179L12 18.896 4.664 23.177l1.402-8.179L.132 9.21l8.2-1.192z" />
      </svg>
    ))
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-300 mb-2">No testimonials yet</h3>
        <p className="text-gray-400">Be the first to share your experience!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 relative"
          >
            {isOwner && (
              <button
                onClick={() => handleDelete(testimonial.id)}
                className="absolute top-3 right-3 text-red-400 hover:text-red-300 transition-colors duration-200 p-1 rounded-full hover:bg-red-500/10"
                title="Delete testimonial"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            )}

            {/* User info */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src={testimonial.photoURL || "/placeholder.svg"}
                alt={testimonial.displayName}
                className="w-10 h-10 rounded-full border-2 border-purple-500/50"
              />
              <div className="flex-1">
                <div className="font-semibold text-white text-sm">{testimonial.displayName}</div>
                <div className="flex items-center gap-1">{renderStars(testimonial.rating)}</div>
              </div>
            </div>

            {/* Testimonial content */}
            <p className="text-gray-300 text-sm leading-relaxed mb-4">"{testimonial.comment}"</p>

            {/* Timestamp and approval status */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{testimonial.createdAt?.toDate?.()?.toLocaleDateString() || "Recently"}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Show more indicator if there might be more testimonials */}
      {testimonials.length === max && (
        <div className="text-center pt-6">
          <p className="text-gray-400 text-sm">Showing {max} most recent testimonials</p>
        </div>
      )}
    </div>
  )
}
