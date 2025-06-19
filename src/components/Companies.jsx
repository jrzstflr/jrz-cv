import React from 'react';
import { motion } from "motion/react";

const Companies = () => {
    const companies = [
        "Genpact", "Concentrix", "iQor", "Telus", "118118 Money",
        "Ally Financial", "T-Mobile", "AT&T", "Barclays", "8x8",
    ];

    const companiesList = [...companies, ...companies];

    const scrollVariants1 = {
        animate: {
            x: [0, -2000],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20,
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
                    duration: 20,
                    ease: "linear",
                },
            },
        },
    };

    return (
        <div className='text-white py-16 bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e]'>
            <div className='container mx-auto text-center'>
                <h2 className='text-3xl md:text-4xl font-bold mb-8 border-b-2 border-purple-500 inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>Companies I've Worked with</h2>

                {/* First Scroller */}
                <div className='overflow-hidden relative w-full'>
                    <motion.div
                        variants={scrollVariants1}
                        animate="animate"
                        className='whitespace-nowrap flex space-x-10 px-4'>
                        {companiesList.map((company, index) => (
                            <div
                                key={index}
                                className='text-base sm:text-lg md:text-xl text-white bg-white/10 backdrop-blur-lg border border-purple-500/20 hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.6)] transition duration-300 ease-in-out px-6 py-3 rounded-full cursor-pointer'>
                                {company}
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Second Scroller */}
                <div className='overflow-hidden relative w-full mt-6'>
                    <motion.div
                        variants={scrollVariants2}
                        animate="animate"
                        className='whitespace-nowrap flex space-x-10 px-4'>
                        {companiesList.map((company, index) => (
                            <div
                                key={index}
                                className='text-base sm:text-lg md:text-xl text-white bg-white/10 backdrop-blur-lg border border-purple-500/20 hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.6)] transition duration-300 ease-in-out px-6 py-3 rounded-full cursor-pointer'>
                                {company}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Companies;
