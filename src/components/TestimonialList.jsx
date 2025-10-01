"use client"

import { useEffect, useState } from "react"
import { auth, onAuthStateChanged, db, collection, query, limit, onSnapshot, deleteDoc, doc } from "../lib/firebase"

export default function TestimonialList({ max = 12, showPending = false }) {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [isOwner, setIsOwner] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAllModal, setShowAllModal] = useState(false)
  const itemsPerPage = 3

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)

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
          return bTime - aTime
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

  const nextSlide = () => {
    if (currentIndex + itemsPerPage < testimonials.length) {
      setCurrentIndex(currentIndex + itemsPerPage)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - itemsPerPage)
    }
  }

  const totalPages = Math.ceil(testimonials.length / itemsPerPage)
  const currentPage = Math.floor(currentIndex / itemsPerPage)

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
      <div className="relative px-12">
        {currentIndex > 0 && (
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-2 rounded-full transition-all border border-white/20"
            aria-label="Previous testimonials"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out gap-6"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {Array.from({ length: totalPages }).map((_, pageIndex) => {
              const pageTestimonials = testimonials.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
              const testimonialsCount = pageTestimonials.length

              return (
                <div
                  key={pageIndex}
                  className={`min-w-full grid gap-6 ${
                    testimonialsCount === 1
                      ? "grid-cols-1 place-items-center"
                      : testimonialsCount === 2
                        ? "grid-cols-2 place-items-center max-w-4xl mx-auto"
                        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  }`}
                >
                  {pageTestimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:border-purple-400/50 hover:bg-white/10 transition-all duration-300 relative shadow-lg hover:shadow-purple-500/20 w-full max-w-sm h-[280px] flex flex-col"
                    >
                      {isOwner && (
                        <button
                          onClick={() => handleDelete(testimonial.id)}
                          className="absolute top-3 right-3 text-red-400 hover:text-red-300 transition-colors p-1 rounded-full hover:bg-red-500/10 backdrop-blur-sm"
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

                      <div className="flex items-center gap-3 mb-4">
                        <img
                          src={testimonial.photoURL || "/placeholder.svg"}
                          alt={testimonial.displayName}
                          className="w-10 h-10 rounded-full border-2 border-purple-400/50 shadow-lg"
                        />
                        <div className="flex-1">
                          <div className="font-semibold text-white text-sm drop-shadow-sm">
                            {testimonial.displayName}
                          </div>
                          <div className="flex items-center gap-1">{renderStars(testimonial.rating)}</div>
                        </div>
                      </div>

                      <p className="text-gray-100 text-sm leading-relaxed mb-4 drop-shadow-sm flex-1 overflow-y-auto">
                        "{testimonial.comment}"
                      </p>

                      <div className="text-xs text-gray-300 drop-shadow-sm">
                        {testimonial.createdAt?.toDate?.()?.toLocaleDateString() || "Recently"}
                      </div>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>

        {currentIndex + itemsPerPage < testimonials.length && (
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-2 rounded-full transition-all border border-white/20"
            aria-label="Next testimonials"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      <div className="flex justify-center items-center gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index * itemsPerPage)}
            className={`h-2 rounded-full transition-all ${
              currentPage === index ? "w-8 bg-purple-500" : "w-2 bg-gray-600 hover:bg-gray-500"
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>

      {testimonials.length > 5 && (
        <div className="text-center">
          <button
            onClick={() => setShowAllModal(true)}
            className="px-6 py-3 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-medium rounded-lg transition-all border border-white/20 shadow-lg hover:shadow-purple-500/20"
          >
            See All {testimonials.length} Testimonials
          </button>
        </div>
      )}

      {showAllModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/5 backdrop-blur-2xl rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
              <h2 className="text-2xl font-bold text-white drop-shadow-md">All Testimonials ({testimonials.length})</h2>
              <button
                onClick={() => setShowAllModal(false)}
                className="text-gray-300 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg backdrop-blur-sm"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto p-6 max-h-[calc(90vh-100px)]">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:border-purple-400/50 hover:bg-white/10 transition-all duration-300 relative shadow-lg hover:shadow-purple-500/20 h-[280px] flex flex-col"
                  >
                    {isOwner && (
                      <button
                        onClick={() => handleDelete(testimonial.id)}
                        className="absolute top-3 right-3 text-red-400 hover:text-red-300 transition-colors p-1 rounded-full hover:bg-red-500/10 backdrop-blur-sm"
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

                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={testimonial.photoURL || "/placeholder.svg"}
                        alt={testimonial.displayName}
                        className="w-10 h-10 rounded-full border-2 border-purple-400/50 shadow-lg"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-white text-sm drop-shadow-sm">{testimonial.displayName}</div>
                        <div className="flex items-center gap-1">{renderStars(testimonial.rating)}</div>
                      </div>
                    </div>

                    <p className="text-gray-100 text-sm leading-relaxed mb-4 drop-shadow-sm flex-1 overflow-y-auto">
                      "{testimonial.comment}"
                    </p>

                    <div className="text-xs text-gray-300 drop-shadow-sm">
                      {testimonial.createdAt?.toDate?.()?.toLocaleDateString() || "Recently"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
