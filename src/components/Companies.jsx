import React from 'react';
import {animate, motion} from "motion/react";

const Companies = () => {

    const companies =[
        "Genpact",
        "Concentrix",
        "iQor",
        "Telus",
        "118118 Money",
        "Ally Financial",
        "T-Mobile",
        "AT&T",
        "Barclays",
        "8x8",
    ];

    const companiesList = [...companies, ...companies];

    const scrollVariants1 = {
        animate: {
            x: [0, -2000],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 15,
                    ease: "linear",
                },
            },
        },
    };

    const scrollVariants2 = {
        animate: {
            x: [-2000, 0],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 15,
                    ease: "linear",
                },
            },
        },
    };
  return (
    <div className='text-white py-16'>
      <div className='container mx-auto text-center'>
        <h2 className='text-3xl md:text-4xl font-bold mb-8 border-b-2 border-purple-500 inline-block'>Companies I've Worked with</h2>
        <div className='overflow-hidden relative w-full'>
            <motion.div 
            variants={scrollVariants1}
            animate="animate"
            className='whitespace-nowrap flex space-x-10'>
                {companiesList.map((company, index) => (
                    <div
                    key={index}
                    className='text-lg bg-gray-800 px-6 py-3 rounded-full inline-block'>
                        {company}
                    </div>
                ))}
            </motion.div>
        </div>
        <div className='overflow-hidden relative w-full mt-5'>
            <motion.div 
            variants={scrollVariants2}
            animate="animate"
            className='whitespace-nowrap flex space-x-10'>
            {companiesList.map((company, index) => (
                    <div
                    key={index}
                    className='text-lg bg-gray-800 px-6 py-3 rounded-full inline-block'>
                        {company}
                    </div>
                ))}
            </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Companies
