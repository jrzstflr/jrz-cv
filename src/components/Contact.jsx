"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa"
import emailjs from "emailjs-com"

const Contact = () => {
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: false, // Allow re-triggering for better UX
    threshold: 0.1, // Lower threshold for better triggering
    rootMargin: "-50px 0px", // Trigger slightly before element is fully visible
  })

  const { ref: contactInfoRef, inView: contactInfoInView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: "-30px 0px",
  })

  const { ref: formRef, inView: formInView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: "-30px 0px",
  })

  const { ref: footerRef, inView: footerInView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: "-30px 0px",
  })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    message: "",
  })

  const [status, setStatus] = useState("")
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setStatus("Please enter your name.")
      return false
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setStatus("Please enter a valid email address.")
      return false
    }
    if (!formData.message.trim()) {
      setStatus("Please enter a message.")
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setStatus("")

    const emailParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      budget: formData.budget,
      message: formData.message,
    }

    try {
      await emailjs.send("service_1abotmp", "template_sjzo94d", emailParams, "Agyd0ozhEXpMoVF22")
      setStatus("Message sent successfully!")
      setFormData({ name: "", email: "", phone: "", budget: "", message: "" })
    } catch (error) {
      setStatus("Oops! Something went wrong. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus("")
      }, 3000) // Clear after 3 seconds

      return () => clearTimeout(timer) // Cleanup timer on unmount or status change
    }
  }, [status])

  return (
    <div id="contact" className="bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: -50 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-4xl font-bold text-white">
            Let's discuss your <span className="text-purple-500">Project</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-4xl mx-auto leading-relaxed">
            Hello, your satisfaction and convenience are my top priorities. Whether you have questions about my
            services, need assistance, or simply want to share your feedback, I am always happy to hear from you. <br />
            Feel free to reach out to me using the contact form or via any of the provided channels. I am dedicated and
            ready to provide prompt and professional assistance, ensuring your experience with me is seamless and
            enjoyable. <br />
            Let's Connect! <br />I look forward to assisting you.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          ref={contactInfoRef}
          initial={{ opacity: 0, x: -50 }}
          animate={contactInfoInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contactInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center space-x-4 p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors duration-300"
          >
            <div className="bg-purple-500 p-4 rounded-full shadow-lg">
              <FaPhone className="text-white w-6 h-6" />
            </div>
            <div>
              <p className="text-lg font-medium text-purple-500">Call Me</p>
              <p className="text-white">+63 (969) 313-4738</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contactInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center space-x-4 p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors duration-300"
          >
            <div className="bg-purple-500 p-4 rounded-full shadow-lg">
              <FaEnvelope className="text-white w-6 h-6" />
            </div>
            <div>
              <p className="text-lg font-medium text-purple-500">Email</p>
              <p className="text-white">jeruz.abiera@outlook.com</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contactInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center space-x-4 p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors duration-300"
          >
            <div className="bg-purple-500 p-4 rounded-full shadow-lg">
              <FaMapMarkerAlt className="text-white w-6 h-6" />
            </div>
            <div>
              <p className="text-lg font-medium text-purple-500">Location</p>
              <p className="text-white">Mabalacat City, Pampanga, 2010, Philippines</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.form
          ref={formRef}
          initial={{ opacity: 0, x: 50 }}
          animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6 text-white bg-gray-800/30 p-8 rounded-xl border border-gray-700"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.input
              initial={{ opacity: 0, y: 20 }}
              animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Full Name"
              required
              className="border border-purple-500/50 bg-gray-800 p-4 rounded-md w-full focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
            />
            <motion.input
              initial={{ opacity: 0, y: 20 }}
              animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your Email"
              required
              className="border border-purple-500/50 bg-gray-800 p-4 rounded-md w-full focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.input
              initial={{ opacity: 0, y: 20 }}
              animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Your Phone Number"
              className="border border-purple-500/50 bg-gray-800 p-4 rounded-md w-full focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
            />
            <motion.input
              initial={{ opacity: 0, y: 20 }}
              animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              placeholder="Your Budget"
              className="border border-purple-500/50 bg-gray-800 p-4 rounded-md w-full focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
            />
          </div>
          <motion.textarea
            initial={{ opacity: 0, y: 20 }}
            animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Message"
            required
            rows={5}
            className="border border-purple-500/50 bg-gray-800 p-4 rounded-md w-full focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 resize-none"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={formInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-sm text-slate-400 leading-relaxed"
          >
            By providing my phone number to Jeruz Abiera, I agree and acknowledge that Jeruz Abiera may send text
            messages to my wireless phone number for any purpose. Message and data rates may apply. Message frequency
            will vary, and you will be able to Opt-out by replying "STOP". For more information on how your data will be
            handled, please click{" "}
            <button
              type="button"
              onClick={() => setIsPrivacyOpen(true)}
              className="text-purple-400 underline hover:text-purple-300 transition-colors duration-200"
            >
              Privacy Policy
            </button>
            .
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="bg-purple-500 text-white px-8 py-4 rounded-md hover:bg-purple-600 disabled:bg-purple-400 disabled:cursor-not-allowed transition-all duration-200 w-full sm:w-auto font-medium shadow-lg"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </motion.button>

          {status && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`mt-4 text-center text-lg p-4 rounded-lg ${
                status.includes("success")
                  ? "text-green-400 bg-green-500/10 border border-green-500/20"
                  : "text-red-400 bg-red-500/10 border border-red-500/20"
              }`}
            >
              {status}
            </motion.div>
          )}
        </motion.form>
      </div>

      <motion.div
        ref={footerRef}
        initial={{ opacity: 0, y: 50 }}
        animate={footerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mt-24 flex flex-col sm:flex-row justify-between items-center p-8 text-white border-t-2 border-purple-500/50 bg-gray-800/30"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={footerInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-slate-300"
        >
          © 2025. All Rights Reserved
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={footerInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-purple-400 font-medium"
        >
          Jeruz Abiera
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={footerInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex justify-center space-x-6 text-white mt-4 sm:mt-0"
        >
          <a
            href="https://www.facebook.com/JrzStflrFB"
            className="hover:text-purple-400 transition-colors duration-200"
            aria-label="Facebook"
          >
            <FaFacebook className="w-6 h-6" />
          </a>
          <a
            href="https://www.github.com/jrzstflr"
            className="hover:text-purple-400 transition-colors duration-200"
            aria-label="GitHub"
          >
            <FaGithub className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/jeruza"
            className="hover:text-purple-400 transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="w-6 h-6" />
          </a>
          <a
            href="https://www.instagram.com/jrzstflr"
            className="hover:text-purple-400 transition-colors duration-200"
            aria-label="Instagram"
          >
            <FaInstagram className="w-6 h-6" />
          </a>
        </motion.div>
      </motion.div>

      {isPrivacyOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsPrivacyOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-gray-900 text-white rounded-xl p-8 max-w-lg w-full relative shadow-2xl border border-purple-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-semibold mb-6 text-purple-400">Privacy Policy</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All
              the above categories exclude text messaging originator opt-in data and consent; this information will not
              be shared with any third parties.
            </p>
            <button
              onClick={() => setIsPrivacyOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800 transition-all duration-200"
              aria-label="Close Privacy Policy"
            >
              ✕
            </button>
            <button
              onClick={() => setIsPrivacyOpen(false)}
              className="mt-6 bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
            >
              Got it
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default Contact
