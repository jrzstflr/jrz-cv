"use client"

import { useState, useEffect } from "react"
import project1 from "../assets/project1.png"
import project2 from "../assets/project2.png"
import project3 from "../assets/project3.png"
import project4 from "../assets/project4.png"
import project5 from "../assets/project5.png"
import project6 from "../assets/project6.png"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Companies from "./Companies"
import Modal from "./Modal"

const Work = () => {
  const [filter, setFilter] = useState("all")
  const [hoveredProject, setHoveredProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const { ref: headingRef, inView: headingInView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const { ref: subTextRef, inView: subTextInView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const { ref: carouselRef, inView: carouselInView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const { ref: companiesRef, inView: companiesInView } = useInView({ triggerOnce: true, threshold: 0.2 })

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "Discover a wide range of stylish apparel and top-quality electronics for men, women, and kids. Shop the latest trends and find your perfect fit, all in one place!",
      image: project1,
      link: "https://shopme-seven.vercel.app/",
      category: "web",
      techStack: ["React", "Node.js", "MongoDB", "Stripe"],
      status: "Live",
      year: "2024",
    },
    {
      id: 2,
      title: "Dog Rescue Website",
      description:
        "Join us in giving homeless dogs a second chance. Explore our rescue stories, adopt a furry friend, or support our mission to make a difference!",
      image: project2,
      link: "https://doggo-website-sooty.vercel.app/",
      category: "web",
      techStack: ["React", "CSS3", "JavaScript"],
      status: "Live",
      year: "2024",
    },
    {
      id: 3,
      title: "Budget Tracker App",
      description:
        "Stay on top of your finances with ease. Track daily expenses, monitor your budget, and plan for the future—all in one simple tool!",
      image: project3,
      link: "https://budget-tracker-2-vert.vercel.app/",
      category: "app",
      techStack: ["React", "Chart.js", "LocalStorage"],
      status: "Live",
      year: "2024",
    },
    {
      id: 4,
      title: "Portfolio Website",
      description:
        "Create a stunning online portfolio with ease. Our customizable template is designed to showcase your work, skills, and professional journey with modern features, responsive layouts, and a sleek design perfect for any creative or professional!",
      image: project4,
      link: "https://camille-apilado.vercel.app/",
      category: "web",
      techStack: ["React", "Tailwind CSS", "Framer Motion"],
      status: "Live",
      year: "2024",
    },
    {
      id: 5,
      title: "8x8 Audit Management",
      description:
        "8x8 AuditTrail Conversations. A web app designed for 8x8 customers to easily upload and review JSON audit trail files. Quickly access, analyze, and track conversation history for better visibility and troubleshooting.",
      image: project5,
      link: "https://jrzfiltertool.vercel.app/",
      category: "app",
      techStack: ["React", "Node.JS", "JavaScript"],
      status: "Live",
      year: "2025",
    },
    {
      id: 6,
      title: "Message Dashboard",
      description:
        "The MessageFilter Pro Enterprise Dashboard lets users upload and analyze message data in JSON format. It provides tools for viewing messages, running analytics, checking audit logs, and managing filters and rules. Users can upload data.json files, generate reports, and ensure communication compliance with ease.",
      image: project6,
      link: "https://message-dashboard.vercel.app/",
      category: "app",
      techStack: ["React", "Node.JS", "TypeScript"],
      status: "Live",
      year: "2025",
    },
  ]

  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter)

  const categories = ["all", "web", "app"]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredProjects.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  useEffect(() => {
    if (isAutoPlaying && filteredProjects.length > 1) {
      const interval = setInterval(nextSlide, 5000)
      return () => clearInterval(interval)
    }
  }, [isAutoPlaying, filteredProjects.length])

  useEffect(() => {
    setCurrentSlide(0)
  }, [filter])

  const openModal = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  return (
    <div id="work" className="py-16 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 100 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8 rounded-full"></div>
        </motion.div>

        <motion.p
          ref={subTextRef}
          initial={{ opacity: 0, y: 100 }}
          animate={subTextInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-12 text-gray-300 text-center text-lg md:text-xl max-w-4xl mx-auto leading-relaxed"
        >
          A curated selection of my featured projects — from e-commerce platforms and dynamic web applications to sleek
          portfolio designs, each built with performance and user experience in mind.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={carouselInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex justify-center mb-12"
        >
          <div className="flex gap-4 p-2 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === category
                    ? "bg-purple-500 text-white shadow-lg shadow-purple-500/25"
                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
              >
                {category === "all" ? "All Projects" : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        <div
          ref={carouselRef}
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
              {filteredProjects.map((project, index) => (
                <div key={project.id} className="w-full flex-shrink-0 px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={carouselInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2 max-w-4xl mx-auto"
                  >
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Image Section */}
                      <div className="relative overflow-hidden">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={`${project.title} - ${project.description.slice(0, 50)}...`}
                          className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="absolute top-4 right-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              project.status === "Live"
                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                            }`}
                          >
                            {project.status}
                          </span>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-8 flex flex-col justify-center">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                            {project.title}
                          </h3>
                          <span className="text-sm text-gray-500">{project.year}</span>
                        </div>

                        <p className="text-gray-400 mb-6 leading-relaxed text-base">{project.description}</p>

                        <div className="mb-8">
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-3 py-1 bg-purple-500/10 text-purple-300 text-sm rounded-md border border-purple-500/20"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 group/btn relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium text-center transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            <span className="relative z-10">View Project</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                          </a>

                          <button
                            onClick={() => openModal(project)}
                            className="px-4 py-3 border-2 border-purple-500/50 text-purple-400 rounded-xl hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                            aria-label={`View details for ${project.title}`}
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

                    {hoveredProject === project.id && (
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
          {filteredProjects.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-white p-3 rounded-full hover:bg-purple-500/20 hover:border-purple-500/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Previous project"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-white p-3 rounded-full hover:bg-purple-500/20 hover:border-purple-500/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Next project"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Pagination Dots */}
          {filteredProjects.length > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {filteredProjects.map((_, index) => (
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
          animate={carouselInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">Interested in working together?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Let's Create Something Amazing
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>

      <motion.div
        ref={companiesRef}
        initial={{ opacity: 0, y: 100 }}
        animate={companiesInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-20"
      >
        <Companies />
      </motion.div>

      {isModalOpen && selectedProject && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={selectedProject.title}
          image={selectedProject.image}
          link={selectedProject.link}
          description={selectedProject.description}
          techStack={selectedProject.techStack}
          status={selectedProject.status}
          year={selectedProject.year}
          buttonText="View Project"
        />
      )}
    </div>
  )
}

export default Work
