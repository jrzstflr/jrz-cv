"use client"

import React from "react"
import { motion, AnimatePresence } from "motion/react"

const Modal = ({ isOpen, onClose, image, title, link, description }) => {
  const handleViewCertificate = () => {
    if (link && link !== "#") {
      window.open(link, "_blank", "noopener,noreferrer")
    } else {
      alert("Certificate link not available")
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose()
    }
  }

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 overflow-y-auto p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-gradient-to-br from-[#1d1a2b] to-[#2a1f3d] rounded-2xl p-6 w-full max-w-2xl mx-auto shadow-2xl border border-purple-500/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {title}
              </h2>
              <button
                className="text-white/70 hover:text-white text-3xl cursor-pointer hover:bg-white/10 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200 hover:rotate-90"
                onClick={onClose}
                aria-label="Close Modal"
              >
                ×
              </button>
            </div>

            <div className="text-center">
              <div className="relative mb-6 rounded-xl overflow-hidden bg-white/5 p-4">
                <img
                  src={image || "/placeholder.svg"}
                  alt={title}
                  className="w-full h-auto rounded-lg max-h-[60vh] object-contain mx-auto shadow-lg"
                  onError={(e) => {
                    e.target.src = "/formal-certificate.png"
                  }}
                />
              </div>

              {description && <p className="text-white/80 text-sm mb-6 leading-relaxed">{description}</p>}

              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleViewCertificate}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  View Certificate
                </button>

                <button
                  onClick={onClose}
                  className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 border border-white/20 hover:border-white/30"
                >
                  Close
                </button>
              </div>

              {link && link !== "#" && (
                <p className="text-white/60 text-sm mt-4">Click "View Certificate" to open in a new tab</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal
