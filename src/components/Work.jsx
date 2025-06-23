import React from 'react';
import project1 from "../assets/project1.png";
import project2 from "../assets/project2.png";
import project3 from "../assets/project3.png";
import project4 from "../assets/project4.png";
import { motion } from "motion/react";
import { useInView } from 'react-intersection-observer';
import Companies from './Companies';

const Work = () => {
  const { ref: headingRef, inView: headingInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: subTextRef, inView: subTextInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: gridRef, inView: gridInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: companiesRef, inView: companiesInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const projects = [
    {
      id: 1,
      title: "E-Commerce",
      description: "Discover a wide range of stylish apparel and top-quality electronics for men, women, and kids. Shop the latest trends and find your perfect fit, all in one place!",
      image: project1,
      link: "https://shopme-seven.vercel.app/"
    },
    {
      id: 2,
      title: "Dog-Rescue Website",
      description: "Join us in giving homeless dogs a second chance. Explore our rescue stories, adopt a furry friend, or support our mission to make a difference!",
      image: project2,
      link: "https://doggo-website-sooty.vercel.app/"
    },
    {
      id: 3,
      title: "Budget Tracker",
      description: "Stay on top of your finances with ease. Track daily expenses, monitor your budget, and plan for the future—all in one simple tool!",
      image: project3,
      link: "https://budget-tracker-2-vert.vercel.app/"
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "Create a stunning online portfolio with ease. Our customizable template is designed to showcase your work, skills, and professional journey with modern features, responsive layouts, and a sleek design perfect for any creative or professional!",
      image: project4,
      link: "https://camille-apilado.vercel.app/"
    },
  ];

  return (
    <div id="work" className='py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.h2
          ref={headingRef}
          initial={{ opacity: 0, y: 100 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className='text-4xl text-white underline font-bold text-center mb-12'
        >
          My Projects
        </motion.h2>

        <motion.p
          ref={subTextRef}
          initial={{ opacity: 0, y: 100 }}
          animate={subTextInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className='mb-12 text-gray-400 text-center'
        >
          A curated selection of my featured projects — from e-commerce platforms and dynamic web applications to sleek portfolio designs, each built with performance and user experience in mind.
        </motion.p>

        <div ref={gridRef} className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: project.id * 0.2, duration: 0.5 }}
              className='bg-gray-900 shadow-lg rounded-lg overflow-hidden'
            >
              <img
                src={project.image}
                alt={project.title}
                className='w-full h-48 object-cover'
              />
              <div className='p-6'>
                <h3 className='text-xl text-white font-semibold mb-2'>{project.title}</h3>
                <p className='text-slate-400 mb-4'>{project.description}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className='inline-block border-2 border-purple-500 text-purple-500 px-4 py-2 rounded-full hover:bg-purple-500 hover:text-white transition'
                >
                  Details
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        ref={companiesRef}
        initial={{ opacity: 0, y: 100 }}
        animate={companiesInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <Companies />
      </motion.div>
    </div>
  );
};

export default Work;
