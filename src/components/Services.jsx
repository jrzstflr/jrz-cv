"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { useInView } from "react-intersection-observer"
import Slider from "react-slick"
import certificate1 from "../assets/certificate1.png"
import certificate2 from "../assets/certificate2.png"
import comptia1 from "../assets/comptia1.jpeg"
import aws1 from "../assets/aws1.png"
import frontend from "../assets/frontend.jpeg"
import jrzlogo from "../assets/jrzlogo.png"
import Modal from "./Modal"

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalImage, setModalImage] = useState(null)
  const [modalTitle, setModalTitle] = useState("")
  const [modalDescription, setModalDescription] = useState("")
  const [modalLink, setModalLink] = useState("")
  const [filter, setFilter] = useState("all")

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
      category: "Technical Support",
      description:
        "CompTIA A+ is a globally recognized entry-level certification for individuals starting their career in information technology. It validates the foundational skills needed by IT professionals to support and troubleshoot hardware, software, networks, and security across various devices and operating systems.",
      skills: ["Hardware and software troubleshooting", "Operating systems support", "Networking fundamentals", "Security basics", "Customer support", "Problem-solving", "Documentation", "IT best practices"],
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
      image: jrzlogo,
      issuer: "N/A",
      date: "N/A",
      status: "planned",
    },
  ]

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 3,
    slidesToScroll: 1,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    customPaging: (i) => (
      <div className="w-3 h-3 bg-purple-300 rounded-full opacity-50 hover:opacity-100 transition-opacity duration-200" />
    ),
    dotsClass: "slick-dots !bottom-[-50px]",
  }

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

  const filteredServices =
    filter === "all" ? servicesData : servicesData.filter((service) => service.category === filter)

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
    <div id="services" className="relative min-h-screen py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative container mx-auto px-4 text-center"
      >
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent"
          >
            Professional Certificates
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8 rounded-full"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            Showcasing my commitment to continuous learning and professional growth across
            <span className="text-purple-400 font-semibold"> networking</span>,
            <span className="text-blue-400 font-semibold"> development</span>, and
            <span className="text-pink-400 font-semibold"> emerging technologies</span>.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === category.id
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                  : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
              } backdrop-blur-sm border border-white/10`}
            >
              {category.label}
              <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">{category.count}</span>
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mb-16"
        >
          <Slider {...settings}>
            {filteredServices.map((service, index) => (
              <div key={index} className="px-3">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2"
                >
                  <div className="absolute top-4 right-4 z-10">
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(service.status)}`}
                    >
                      {getStatusText(service.status)}
                    </div>
                  </div>

                  <div className="relative mb-6 overflow-hidden rounded-xl">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={`${service.title} Certificate`}
                      className="w-full h-48 object-cover cursor-pointer transition-transform duration-500 group-hover:scale-110"
                      onClick={() => handleImageClick(service)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="text-left">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                      {service.title}
                    </h3>

                    <div className="flex items-center justify-between mb-3 text-sm text-gray-400">
                      <span className="font-medium">{service.issuer}</span>
                      <span>{service.date}</span>
                    </div>

                    <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">{service.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {service.skills?.slice(0, 3).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30"
                        >
                          {skill}
                        </span>
                      ))}
                      {service.skills?.length > 3 && (
                        <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-full">
                          +{service.skills.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleImageClick(service)}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:-translate-y-0.5"
                      >
                        View Details
                      </button>
                      {service.link && (
                        <a
                          href={service.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-white/10 text-white rounded-lg text-sm font-medium hover:bg-white/20 transition-all duration-300 border border-white/20"
                        >
                          Verify
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>
        </motion.div>
      </motion.div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          image={modalImage}
          title={modalTitle}
          description={modalDescription}
          link={modalLink}
        />
      )}
    </div>
  )
}

export default Services
