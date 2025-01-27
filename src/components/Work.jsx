import React from 'react'
import project1 from "../assets/project1.png";
import project2 from "../assets/project2.png";
import project3 from "../assets/project3.png";
import project4 from "../assets/project4.png";
import {motion} from "motion/react";
import { InView, useInView } from 'react-intersection-observer';
import Companies from './Companies';


const Work = () => {

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
            title: "Dog-Rescure Website",
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
    ]

    const {ref, inView} = useInView({
                triggerOnce: true,
                threshold: 0.2,
            });
  return (
    <div id ="work" className='py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.h2 
        ref={ref}
        initial={{opacity:0, y:100}}
        animate={inView ? {opacity:1, y:0} : {}}
        transition={{delay:0.3, duration:0.5}}
        className='text-4xl text-white underline font-bold text-center mb-12'>My Projects</motion.h2>
        <motion.p 
        ref={ref}
        initial={{opacity:0, y:100}}
        animate={inView ? {opacity:1, y:0} : {}}
        transition={{delay:0.5, duration:0.5}}
        className='mb-12 text-gray-400 text-center'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas eligendi similique dicta eum, ipsa neque eaque autem, minima fugit repudiandae, tenetur corporis laborum nostrum ab eos alias libero quo odio?</motion.p>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
            {
                projects.map((project) => (
                    <motion.div
                    ref={ref}
                    initial={{opacity:0, y:50}}
                    animate={inView ? {opacity:1, y:0} : {}}
                    transition={{delay:project.id * 0.2, duration:0.5}}
                    key={project.id}
                    className='bg-gray-900 shadow-lg rounded-lg overflow-hidden'>
                    <img src={project.image} className='w-full h-48 object-cover'/>
                    <div className='p-6'>
                        <h3 className='text-xl text-white font-semibold mb-2'>
                            {project.title}
                        </h3>
                        <p className='text-slate-400 mb-4'>
                            {project.description}
                        </p>
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <button className='border-2 border-purple-500 text-purple-500 px-4 py-2 rounded-full hover:bg-purple-500 hover:text-white transition'>Details</button>
                        </a>
                    </div>
                    </motion.div>
                ))
            }
        </div>
      </div>
      <motion.div
      ref={ref}
      initial={{opacity:0, y:100}}
      animate={inView ? {opacity:1, y:0} : {}}
      transition={{delay:0.7, duration:0/5}}
      >
        <Companies />
      </motion.div>
    </div>
  )
}

export default Work
