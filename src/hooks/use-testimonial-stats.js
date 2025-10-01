"use client"

import { useEffect, useState } from "react"
import { db, collection, onSnapshot } from "../lib/firebase"

export function useTestimonialStats() {
  const [stats, setStats] = useState({
    averageRating: 0,
    totalCount: 0,
    loading: true,
  })

  useEffect(() => {
    const testimonialsRef = collection(db, "testimonials")

    const unsubscribe = onSnapshot(
      testimonialsRef,
      (snapshot) => {
        const testimonials = snapshot.docs.map((doc) => doc.data())

        // Calculate statistics
        const totalCount = testimonials.length
        const averageRating =
          totalCount > 0 ? testimonials.reduce((sum, t) => sum + (t.rating || 0), 0) / totalCount : 0

        setStats({
          averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
          totalCount,
          loading: false,
        })
      },
      (error) => {
        console.error("Error fetching testimonial stats:", error)
        setStats({
          averageRating: 0,
          totalCount: 0,
          loading: false,
        })
      },
    )

    return () => unsubscribe()
  }, [])

  return stats
}
