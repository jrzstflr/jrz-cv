"use client"

import { useState } from "react"
import project1 from "../assets/project1.png"
import project2 from "../assets/project2.png"
import project3 from "../assets/project3.png"
import project4 from "../assets/project4.png"
import project5 from "../assets/project5.png"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Companies from "./Companies"
import Modal from "./Modal"

const Work = () => {
  const [filter, setFilter] = useState("all")
  const [hoveredProject, setHoveredProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  const { ref: headingRef, inView: headingInView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const { ref: subTextRef, inView: subTextInView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const { ref: gridRef, inView: gridInView } = useInView({ triggerOnce: true, threshold: 0.2 })
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
      techStack: ["React", "Node,JS", "JavaScript"],
      status: "Live",
      year: "2025",
    },
  ]

  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter)

  const categories = ["all", "web", "app"]

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
          animate={gridInView ? { opacity: 1, y: 0 } : {}}
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

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={`${project.title} - ${project.description.slice(0, 50)}...`}
                  className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
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

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <span className="text-sm text-gray-500">{project.year}</span>
                </div>

                <p className="text-gray-400 mb-4 leading-relaxed text-sm">{project.description}</p>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-purple-500/10 text-purple-300 text-xs rounded-md border border-purple-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 group/btn relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-xl font-medium text-center transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
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

              {hoveredProject === project.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 pointer-events-none"
                />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={gridInView ? { opacity: 1, y: 0 } : {}}
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
