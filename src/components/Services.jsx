"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import certificate1 from "../assets/certificate1.png"
import certificate2 from "../assets/certificate2.png"
import aws1 from "../assets/aws1.png"
import comptia1 from "../assets/comptia1.jpeg"
import frontend from "../assets/frontend.jpeg"
import jrzLogo from "../assets/jrzlogo.png"
import Modal from "./Modal"

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalImage, setModalImage] = useState(null)
  const [modalTitle, setModalTitle] = useState("")
  const [modalDescription, setModalDescription] = useState("")
  const [modalLink, setModalLink] = useState("")
  const [filter, setFilter] = useState("all")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [hoveredCertificate, setHoveredCertificate] = useState(null)

  const servicesData = [
    {
      title: "Networking Basics",
      category: "networking",
      description:
        "This certificate validates the foundational knowledge of networking concepts and principles. It covers essential topics such as network fundamentals, protocols, and services, as well as understanding how devices communicate within a network.",
      skills: ["Network Fundamentals", "Protocols", "Troubleshooting", "Device Communication"],
      image: certificate1,
      link: "https://www.credly.com/earner/earned/badge/0e31bd06-ee89-41fe-bf59-f41e45d8ea39",
      issuer: "Cisco",
      date: "2024",
      status: "verified",
    },
    {
      title: "Networking Devices and Initial Configuration",
      category: "networking",
      description:
        "This certificate validates foundational knowledge and skills in setting up, configuring, and managing Cisco networking devices. It covers key topics such as basic network architecture, device configuration, and implementation.",
      skills: ["Device Configuration", "Network Architecture", "Cisco Equipment", "Infrastructure Management"],
      image: certificate2,
      link: "https://www.credly.com/earner/earned/badge/1f943c4f-a52e-4ee1-a489-1a10094cec0b",
      issuer: "Cisco",
      date: "2024",
      status: "verified",
    },
    {
      title: "Web Development Fundamentals",
      category: "development",
      description:
        "Comprehensive certification covering modern web development practices, including responsive design, JavaScript frameworks, and full-stack development principles.",
      skills: ["React", "JavaScript", "CSS", "Node.js", "Database Design"],
      image: frontend,
      link: "https://www.linkedin.com/learning/paths/explore-a-career-in-front-end-web-development?u=142281146",
      issuer: "LinkedIn Learning",
      date: "2025",
      status: "in-progress",
    },
    {
      title: "Cloud Infrastructure",
      category: "cloud",
      description:
        "Advanced certification in cloud computing platforms, covering deployment, scaling, and management of cloud-based applications and infrastructure.",
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Infrastructure as Code"],
      image: aws1,
      issuer: "AWS",
      date: "N/A",
      status: "planned",
    },
    {
      title: "CompTia A+",
      category: "development",
      description:
        "CompTIA A+ is a globally recognized entry-level certification for individuals starting their career in information technology. It validates the foundational skills needed by IT professionals to support and troubleshoot hardware, software, networks, and security across various devices and operating systems.",
      skills: [
        "Hardware and software troubleshooting",
        "Operating systems support",
        "Networking fundamentals",
        "Security basics",
        "Customer support",
        "Problem-solving",
        "Documentation",
        "IT best practices",
      ],
      image: comptia1,
      link: "https://www.linkedin.com/learning/paths/8x8-technical-certification-foundation-learning-path?u=142281146",
      issuer: "8x8",
      date: "2025",
      status: "in-progress",
    },
    {
      title: "Project Management Professional",
      category: "management",
      description:
        "Professional certification in project management methodologies, team leadership, and strategic planning for technology projects.",
      skills: ["Agile", "Scrum", "Team Leadership", "Strategic Planning", "Risk Assessment"],
      image: jrzLogo,
      issuer: "N/A",
      date: "N/A",
      status: "planned",
    },
  ]

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  const filteredServices =
    filter === "all" ? servicesData : servicesData.filter((service) => service.category === filter)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredServices.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + filteredServices.length) % filteredServices.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  useEffect(() => {
    if (isAutoPlaying && filteredServices.length > 1) {
      const interval = setInterval(nextSlide, 5000)
      return () => clearInterval(interval)
    }
  }, [isAutoPlaying, filteredServices.length])

  useEffect(() => {
    setCurrentSlide(0)
  }, [filter])

  const handleImageClick = (service) => {
    setModalImage(service.image)
    setModalTitle(service.title)
    setModalDescription(service.description)
    setModalLink(service.link || "")
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const categories = [
    { id: "all", label: "All Certificates", count: servicesData.length },
    { id: "networking", label: "Networking", count: servicesData.filter((s) => s.category === "networking").length },
    { id: "development", label: "Development", count: servicesData.filter((s) => s.category === "development").length },
    { id: "cloud", label: "Cloud", count: servicesData.filter((s) => s.category === "cloud").length },
    { id: "security", label: "Security", count: servicesData.filter((s) => s.category === "security").length },
    { id: "management", label: "Management", count: servicesData.filter((s) => s.category === "management").length },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "verified":
        return "bg-green-500"
      case "in-progress":
        return "bg-yellow-500"
      case "planned":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "verified":
        return "Verified"
      case "in-progress":
        return "In Progress"
      case "planned":
        return "Planned"
      default:
        return "Unknown"
    }
  }

  return (
    <div id="services" className="py-16 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 100 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
            Professional Certificates
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8 rounded-full"></div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 100 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-12 text-gray-300 text-center text-lg md:text-xl max-w-4xl mx-auto leading-relaxed"
        >
          Showcasing my commitment to continuous learning and professional growth across
          <span className="text-purple-400 font-semibold"> networking</span>,
          <span className="text-blue-400 font-semibold"> development</span>, and
          <span className="text-pink-400 font-semibold"> emerging technologies</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex justify-center mb-12"
        >
          <div className="flex gap-4 p-2 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === category.id
                    ? "bg-purple-500 text-white shadow-lg shadow-purple-500/25"
                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
              >
                {category.label}
                <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">{category.count}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Carousel Container */}
          <div className="overflow-hidden rounded-2xl">
            <motion.div
              className="flex"
              animate={{ x: `-${currentSlide * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {filteredServices.map((service, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    onMouseEnter={() => setHoveredCertificate(service.title)}
                    onMouseLeave={() => setHoveredCertificate(null)}
                    className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2 max-w-4xl mx-auto"
                  >
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Image Section */}
                      <div className="relative overflow-hidden">
                        <img
                          src={service.image || "/placeholder.svg"}
                          alt={`${service.title} Certificate`}
                          className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="absolute top-4 right-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(service.status)}`}
                          >
                            {getStatusText(service.status)}
                          </span>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-8 flex flex-col justify-center">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                            {service.title}
                          </h3>
                          <span className="text-sm text-gray-500">{service.date}</span>
                        </div>

                        <div className="flex items-center mb-4 text-sm text-gray-400">
                          <span className="font-medium">{service.issuer}</span>
                        </div>

                        <p className="text-gray-400 mb-6 leading-relaxed text-base">{service.description}</p>

                        <div className="mb-8">
                          <div className="flex flex-wrap gap-2">
                            {service.skills?.slice(0, 4).map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="px-3 py-1 bg-purple-500/10 text-purple-300 text-sm rounded-md border border-purple-500/20"
                              >
                                {skill}
                              </span>
                            ))}
                            {service.skills?.length > 4 && (
                              <span className="px-3 py-1 bg-gray-500/20 text-gray-400 text-sm rounded-md">
                                +{service.skills.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-4">
                          {service.link && (
                            <a
                              href={service.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 group/btn relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium text-center transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                              <span className="relative z-10">View Certificate</span>
                              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                            </a>
                          )}

                          <button
                            onClick={() => handleImageClick(service)}
                            className="px-4 py-3 border-2 border-purple-500/50 text-purple-400 rounded-xl hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                            aria-label={`View details for ${service.title}`}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    {hoveredCertificate === service.title && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 pointer-events-none"
                      />
                    )}
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          {filteredServices.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-white p-3 rounded-full hover:bg-purple-500/20 hover:border-purple-500/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Previous certificate"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-white p-3 rounded-full hover:bg-purple-500/20 hover:border-purple-500/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Next certificate"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Pagination Dots */}
          {filteredServices.length > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {filteredServices.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-purple-500 shadow-lg shadow-purple-500/25"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Auto-play indicator */}
          <div className="absolute top-4 left-4 z-10">
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                isAutoPlaying
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
              }`}
            >
              {isAutoPlaying ? "Auto-play ON" : "Auto-play OFF"}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">Want to learn more about my certifications?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Get In Touch
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          image={modalImage}
          title={modalTitle}
          description={modalDescription}
          link={modalLink}
          buttonText="View Certificate"
        />
      )}
    </div>
  )
}

export default Services
