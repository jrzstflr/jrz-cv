"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

const Companies = () => {
  const [isPaused, setIsPaused] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const companies = [
    { name: "Genpact", category: "Enterprise", tier: "fortune500" },
    { name: "Concentrix", category: "Enterprise", tier: "fortune500" },
    { name: "iQor", category: "Technology", tier: "enterprise" },
    { name: "Telus", category: "Telecommunications", tier: "fortune500" },
    { name: "118118 Money", category: "FinTech", tier: "startup" },
    { name: "Ally Financial", category: "Financial Services", tier: "fortune500" },
    { name: "T-Mobile", category: "Telecommunications", tier: "fortune500" },
    { name: "AT&T", category: "Telecommunications", tier: "fortune500" },
    { name: "Barclays", category: "Banking", tier: "fortune500" },
    { name: "8x8", category: "Technology", tier: "enterprise" },
  ]

  const companiesList = [...companies, ...companies]

  const scrollVariants1 = {
    animate: {
      x: prefersReducedMotion ? 0 : [0, -2000],
      transition: {
        x: {
          repeat: isPaused || prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY,
          repeatType: "loop",
          duration: prefersReducedMotion ? 0 : 25,
          ease: "linear",
        },
      },
    },
  }

  const scrollVariants2 = {
    animate: {
      x: prefersReducedMotion ? 0 : [-2000, 0],
      transition: {
        x: {
          repeat: isPaused || prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY,
          repeatType: "loop",
          duration: prefersReducedMotion ? 0 : 25,
          ease: "linear",
        },
      },
    },
  }

  const handleKeyDown = (event, company) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      handleCompanyClick(company)
    }
  }

  const handleCompanyClick = (company) => {
    console.log(`Clicked on ${company.name} - ${company.category}`)
    // You can add navigation or modal logic here
  }

  const getTierStyling = (tier) => {
    switch (tier) {
      case "fortune500":
        return "border-yellow-400/30 hover:border-yellow-300 hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] bg-gradient-to-r from-yellow-500/10 to-orange-500/10"
      case "enterprise":
        return "border-blue-400/30 hover:border-blue-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] bg-gradient-to-r from-blue-500/10 to-cyan-500/10"
      case "startup":
        return "border-green-400/30 hover:border-green-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] bg-gradient-to-r from-green-500/10 to-emerald-500/10"
      default:
        return "border-purple-500/20 hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.6)] bg-white/10"
    }
  }

  return (
    <div className="text-white py-16 bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/20 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-pink-400/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-blue-400/20 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto text-center relative z-10">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600">
            Companies I've worked with
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-4 rounded-full"></div>
          <p className="text-purple-200/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Worked with Fortune 500 companies and innovative startups across multiple industries
          </p>
        </div>

        {/* First Scroller - Enhanced with better interactions */}
        <div
          className="overflow-hidden relative w-full mb-8"
          onMouseEnter={() => !prefersReducedMotion && setIsPaused(true)}
          onMouseLeave={() => !prefersReducedMotion && setIsPaused(false)}
        >
          <motion.div variants={scrollVariants1} animate="animate" className="whitespace-nowrap flex space-x-6 px-4">
            {companiesList.map((company, index) => (
              <motion.div
                key={`${company.name}-${index}`}
                className={`text-base sm:text-lg md:text-xl text-white backdrop-blur-lg transition-all duration-300 ease-in-out px-6 py-4 rounded-full cursor-pointer transform hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 ${getTierStyling(company.tier)}`}
                onClick={() => handleCompanyClick(company)}
                onKeyDown={(e) => handleKeyDown(e, company)}
                tabIndex={0}
                role="button"
                aria-label={`${company.name} - ${company.category} company`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex flex-col items-center space-y-1">
                  <span className="font-semibold">{company.name}</span>
                  <span className="text-xs opacity-70 capitalize">{company.category}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Second Scroller - Enhanced with staggered animation */}
        <div
          className="overflow-hidden relative w-full"
          onMouseEnter={() => !prefersReducedMotion && setIsPaused(true)}
          onMouseLeave={() => !prefersReducedMotion && setIsPaused(false)}
        >
          <motion.div variants={scrollVariants2} animate="animate" className="whitespace-nowrap flex space-x-6 px-4">
            {companiesList.map((company, index) => (
              <motion.div
                key={`${company.name}-reverse-${index}`}
                className={`text-base sm:text-lg md:text-xl text-white backdrop-blur-lg transition-all duration-300 ease-in-out px-6 py-4 rounded-full cursor-pointer transform hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 ${getTierStyling(company.tier)}`}
                onClick={() => handleCompanyClick(company)}
                onKeyDown={(e) => handleKeyDown(e, company)}
                tabIndex={0}
                role="button"
                aria-label={`${company.name} - ${company.category} company`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex flex-col items-center space-y-1">
                  <span className="font-semibold">{company.name}</span>
                  <span className="text-xs opacity-70 capitalize">{company.category}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="mt-12 text-center">
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="px-4 py-2 bg-yellow-500/10 border border-yellow-400/30 rounded-full">
              <span className="text-yellow-300 text-sm font-medium">Fortune 500</span>
            </div>
            <div className="px-4 py-2 bg-blue-500/10 border border-blue-400/30 rounded-full">
              <span className="text-blue-300 text-sm font-medium">Enterprise</span>
            </div>
            <div className="px-4 py-2 bg-green-500/10 border border-green-400/30 rounded-full">
              <span className="text-green-300 text-sm font-medium">Innovative Startups</span>
            </div>
          </div>
          <p className="text-purple-200/60 text-sm">
            {companies.length}+ companies across telecommunications, finance, and technology sectors
          </p>
        </div>
      </div>
    </div>
  )
}

export default Companies
