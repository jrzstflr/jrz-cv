import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import Slider from "react-slick";
import certificate1 from '../assets/certificate1.png';
import certificate2 from '../assets/certificate2.png';
import jrzlogo from "../assets/jrzlogo.png";
import Modal from './Modal';

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [modalLink, setModalLink] = useState('');

  const servicesData = [
    {
      title: "Networking Basics",
      description:
        "This certificate validates the foundational knowledge of networking concepts and principles. It covers essential topics such as network fundamentals, protocols, and services, as well as understanding how devices communicate within a network. The training equips individuals with the skills necessary to troubleshoot and configure simple network setups, laying the groundwork for advanced networking studies.",
      image: certificate1,
      link: "https://www.credly.com/earner/earned/badge/0e31bd06-ee89-41fe-bf59-f41e45d8ea39",
    },
    {
      title: "Networking Devices and Initial Configuration",
      description:
        "This certificate validates foundational knowledge and skills in setting up, configuring, and managing Cisco networking devices. It covers key topics such as basic network architecture, device configuration, and the implementation of initial network setups, including configuring switches, routers, and other essential devices. This certification demonstrates a solid understanding of networking fundamentals, preparing individuals to effectively configure and manage network infrastructure in various environments.",
      image: certificate2,
      link: "https://www.credly.com/earner/earned/badge/1f943c4f-a52e-4ee1-a489-1a10094cec0b",
    },
    {
      title: "N/A",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur corrupti possimus quisquam sequi quibusdam deserunt praesentium architecto facilis, enim voluptatem, laborum cumque repudiandae quia? Optio eos nihil reiciendis laborum, nulla asperiores at.",
      image: jrzlogo,
    },
    {
      title: "N/A",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur corrupti possimus quisquam sequi quibusdam deserunt praesentium architecto facilis, enim voluptatem, laborum cumque repudiandae quia? Optio eos nihil reiciendis laborum, nulla asperiores at.",
      image: jrzlogo,
    },
    {
      title: "N/A",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur corrupti possimus quisquam sequi quibusdam deserunt praesentium architecto facilis, enim voluptatem, laborum cumque repudiandae quia? Optio eos nihil reiciendis laborum, nulla asperiores at.",
      image: jrzlogo,
    },
    {
      title: "N/A",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur corrupti possimus quisquam sequi quibusdam deserunt praesentium architecto facilis, enim voluptatem, laborum cumque repudiandae quia? Optio eos nihil reiciendis laborum, nulla asperiores at.",
      image: jrzlogo,
    },
  ];

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleImageClick = (image, title, link) => {
    setModalImage(image);
    setModalTitle(title);
    setModalLink(link || '');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div id="services" className="text-white py-16 scroll-smooth">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-8 border-b-2 border-purple-500 inline-block">
          Certificates
        </h2>
        <p className="mb-12 text-gray-400">
          This section highlights the various professional certifications I have earned,
          demonstrating my commitment to continuous learning and growth in Network Troubleshooting,
          Contact Center, Integrations, and Web Development. Each certification reflects my dedication
          to mastering essential skills, staying current with industry trends, and enhancing my
          capabilities to provide value in my professional endeavors.
        </p>

        {/* Carousel */}
        <Slider {...settings}>
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-[#1d1a2b] rounded-lg p-6 text-center hover:shadow-lg hover:shadow-purple-500 transition-shadow duration-300 mx-2"
            >
              <img
                src={service.image}
                alt={`${service.title} Certificate`}
                className="text-purple-500 text-4xl sm:text-5xl lg:text-6xl mb-4 mx-auto cursor-pointer max-h-[300px] object-contain"
                onClick={() => handleImageClick(service.image, service.title, service.link)}
              />
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2">{service.title}</h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-400">{service.description}</p>
            </motion.div>
          ))}
        </Slider>
      </motion.div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        imageSrc={modalImage}
        title={modalTitle}
        link={modalLink}
      />
    </div>
  );
};

export default Services;
