"use client"

import { useState, useEffect } from "react"
import { AiOutlineMenu } from "react-icons/ai"
import { IoCloseSharp } from "react-icons/io5"
import { motion, AnimatePresence } from "framer-motion"
import CV from "../assets/CV.pdf"
import { Link } from "react-scroll"

const Navbar = () => {
  const [menu, setMenu] = useState(false)
  const [activeSection, setActiveSection] = useState("about")
  const [isDownloading, setIsDownloading] = useState(false)

  const variants = {
    open: {
      clipPath: "circle(1200px at calc(100% - 43px) 43px)",
      transition: { type: "spring", stiffness: 20, restDelta: 2 },
    },
    closed: {
      clipPath: "circle(25px at calc(100% - 43px) 43px)",
      transition: { type: "spring", stiffness: 400, damping: 40 },
    },
  }

  const items = [
    { id: 1, text: "About", to: "about" },
    { id: 2, text: "Certificates", to: "services" },
    { id: 3, text: "Work", to: "work" },
    { id: 4, text: "Contact", to: "contact" },
  ]

  useEffect(() => {
    if (menu) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [menu])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && menu) {
        setMenu(false)
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [menu])

  const handleCVDownload = async (e) => {
    setIsDownloading(true)
    setTimeout(() => setIsDownloading(false), 1000)
  }

  const handleLinkClick = () => {
    setMenu(false)
  }

  return (
    <div>
      {/* Desktop Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto hidden md:flex justify-between items-center py-4 px-4 lg:px-6"
      >
        <div className="text-xl md:text-2xl lg:text-3xl font-bold flex items-center gap-1 md:gap-2">
          <span className="text-white">JERUZ </span>
          <span className="text-purple-500">ABIERA</span>
        </div>

        <div>
          <ul className="hidden md:flex items-center space-x-6 list-none lg:text-lg md:text-base text-white">
            {items.map(({ id, text, to }) => (
              <li key={id} className="relative group">
                <Link
                  to={to}
                  smooth={true}
                  duration={500}
                  offset={-70}
                  spy={true}
                  onSetActive={() => setActiveSection(to)}
                  className={`${
                    activeSection === to ? "text-purple-500" : "text-white"
                  } hover:text-purple-500 hover:scale-105 transition-all duration-300 cursor-pointer relative`}
                >
                  {text}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="ml-auto sm:ml-0">
          <a
            href={CV}
            download="CV.pdf"
            onClick={handleCVDownload}
            className={`md:text-base lg:text-lg bg-purple-500 hover:bg-purple-400 text-white px-4 py-2 rounded-full transition-all duration-300 ${
              isDownloading ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {isDownloading ? "Downloading..." : "Download CV"}
          </a>
        </div>
      </motion.div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden justify-between items-center px-4 py-6 relative">
        <motion.div
          initial={{ opacity: 0, x: -100, y: -100 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold flex items-center gap-2"
        >
          <span className="text-white">JERUZ </span>
          <span className="text-purple-500">ABIERA</span>
        </motion.div>

        <button
          onClick={() => setMenu((prev) => !prev)}
          className="z-20 relative p-2 rounded-md bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
          aria-label="Toggle menu"
        >
          {menu ? (
            <IoCloseSharp size={24} className="text-white hover:text-purple-500 transition-colors duration-300" />
          ) : (
            <AiOutlineMenu size={24} className="text-white hover:text-purple-500 transition-colors duration-300" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-5 md:hidden"
            onClick={() => setMenu(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ clipPath: "circle(25px at calc(100% - 43px) 43px)" }}
            animate={{ clipPath: "circle(1200px at calc(100% - 43px) 43px)" }}
            exit={{ clipPath: "circle(25px at calc(100% - 43px) 43px)" }}
            transition={{ type: "spring", stiffness: 20, restDelta: 2 }}
            className="bg-white w-80 h-screen text-black fixed right-0 top-0 z-10 md:hidden"
            role="navigation"
            aria-label="Mobile navigation menu"
          >
            <div className="flex flex-col justify-center items-center h-full">
              <ul className="space-y-8 text-black text-lg text-center">
                {items.map(({ id, text, to }) => (
                  <li key={id} className="relative group">
                    <Link
                      to={to}
                      smooth={true}
                      duration={500}
                      offset={-70}
                      onClick={handleLinkClick}
                      spy={true}
                      onSetActive={() => setActiveSection(to)}
                      className={`${
                        activeSection === to ? "text-purple-500" : "text-black"
                      } hover:text-purple-500 transition-colors duration-300 cursor-pointer text-xl`}
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>

              <a
                href={CV}
                download="CV.pdf"
                onClick={handleCVDownload}
                className={`text-lg bg-purple-500 hover:bg-purple-400 text-white px-6 py-3 mt-8 rounded-full transition-all duration-300 ${
                  isDownloading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isDownloading ? "Downloading..." : "Download CV"}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Navbar
