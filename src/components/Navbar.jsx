import React, { useState } from 'react';
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { motion } from "motion/react";
import { Link } from "react-scroll";
import CV from "../assets/CV.pdf";

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  const variants = {
    open: {
      clipPath: "circle(1200px at 43px 43px)",
      transition: { type: "spring", stiffness: 20 }
    },
    closed: {
      clipPath: "circle(25px at 43px 37px)",
      transition: { type: "spring", stiffness: 400, damping: 40 }
    }
  };

  const items = [
    { id: 1, text: "About", to: "about" },
    { id: 2, text: "Certificates", to: "services" },
    { id: 3, text: "Work", to: "work" },
    { id: 4, text: "Contact", to: "contact" },
  ];

  return (
    <div>
      {/* Desktop Navbar */}
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='container mx-auto hidden md:flex justify-between items-center py-6 px-4'
      >
        <div className='text-2xl font-bold flex items-center gap-1'>
          <span className='text-white'>JERUZ</span>
          <span className='text-purple-500'>ABIERA</span>
        </div>

        <ul className='flex items-center space-x-6 list-none lg:text-lg md:text-base text-white'>
          {items.map(({ id, text, to }) => (
            <li
              key={id}
              className='hover:text-purple-500 hover:scale-105 transition-transform duration-300 cursor-pointer'
            >
              <Link to={to} smooth={true} duration={500} offset={-70}>
                {text}
              </Link>
            </li>
          ))}
        </ul>

        <a
          href={CV}
          download="Jeruz-CV.pdf"
          className='md:text-base lg:text-lg bg-purple-500 hover:bg-purple-400 text-white px-4 py-2 rounded-full'
        >
          Download CV
        </a>
      </motion.div>

      {/* Mobile Navbar */}
      <div className='md:hidden flex justify-between items-center px-4 py-4'>
        <motion.div
          initial={false}
          animate={menu ? "open" : "closed"}
          variants={variants}
          className='fixed top-0 left-0 w-2/3 h-full z-10 bg-white text-black'
        >
          <div className='px-6 py-6 flex justify-between items-center'>
            <div className='text-xl font-bold text-black'>
              JERUZ <span className='text-purple-500'>ABIERA</span>
            </div>
            <button
              onClick={() => setMenu(false)}
              aria-label="Close menu"
              className='text-black hover:text-purple-500 transition-colors duration-300'
            >
              <IoCloseSharp size={30} />
            </button>
          </div>

          <div className='flex flex-col justify-center items-center mt-10'>
            <ul className='space-y-6 text-black text-lg'>
              {items.map(({ id, text, to }) => (
                <li
                  key={id}
                  className='hover:text-purple-500 duration-200 cursor-pointer'
                  onClick={() => setMenu(false)}
                >
                  <Link to={to} smooth={true} duration={500} offset={-70}>
                    {text}
                  </Link>
                </li>
              ))}
            </ul>

            <a
              href={CV}
              download="Jeruz-CV.pdf"
              className='text-lg bg-purple-500 hover:bg-purple-400 text-white px-4 py-2 mt-6 rounded-full'
            >
              Download CV
            </a>
          </div>
        </motion.div>

        <button
          onClick={() => setMenu(true)}
          aria-label="Open menu"
          className='z-20 text-white'
        >
          <AiOutlineMenu size={30} className='hover:text-purple-500 transition duration-300' />
        </button>

        <motion.div
          initial={{ opacity: 0, x: 100, y: -100 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-xl font-bold flex items-center gap-2'
        >
          <span className='text-white'>JERUZ</span>
          <span className='text-purple-500'>ABIERA</span>
        </motion.div>
      </div>
    </div>
  );
};

export default Navbar;
