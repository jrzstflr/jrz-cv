import React from 'react';
import aboutImg from "../assets/aboutImg.png";
import { motion } from 'framer-motion';
import { InView } from 'react-intersection-observer';

const About = () => {
  return (
    <div id="about" className="text-white py-16 scroll-smooth">
      <div className="container mx-auto px-4 text-center">
        <InView triggerOnce threshold={0.2}>
          {({ ref, inView }) => (
            <>
              <motion.h2
                ref={ref}
                initial={{ opacity: 0, y: 100 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold mb-8 border-b-2 border-purple-500 inline-block"
              >
                About Me
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 100 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mb-12 text-gray-400 text-opacity-80"
              >
                Hello, I'm Jeruz Abiera, a passionate Frontend Developer skilled in HTML, CSS, JavaScript, React and TailwindCSS. I love building creative and responsive web applications.
              </motion.p>

              <div className="flex flex-col md:flex-row justify-center items-center">
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="mb-8 md:mb-0 md:mr-8 flex justify-center"
                >
                  <img src={aboutImg} className="w-2/3 sm:w-1/2 md:w-10/12" />
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, x: 100 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="md:w-1/2 text-gray-400 px-4 md:px-0 text-base sm:text-lg md:text-xl"
                >
                  I am currently working with 8x8, where I began as a Technical Support Engineer. In this role, I provided essential support to clients by troubleshooting and resolving complex technical issues related to VOIP systems, softphones, and network configurations. My expertise includes configuring desk phones from leading providers such as Cisco, Polycom, and Yealink, ensuring seamless integration and adherence to technical standards. Recently, I was promoted to SME (Subject Matter Expert), where I now mentor and guide fellow engineers by sharing the knowledge and expertise I have developed over the years. My focus is on upholding service level agreements (SLAs) while fostering a customer-first mindset to deliver exceptional service and support.
                </motion.p>
              </div>

              <div className="flex flex-col sm:flex-row justify-around items-center mt-12 space-y-6 sm:space-y-0">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.5, duration: 0.3 }}
                  className="text-center"
                >
                  <h3 className="text-3xl md:text-8xl font-bold md:my-6 text-purple-500">2+</h3>
                  <motion.p
                    initial={{ opacity: 0, y: 100 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.7, duration: 0.5 }}
                    className="text-sm sm:text-base text-gray-300"
                  >
                    Years of Experience in VOIP with 8x8
                  </motion.p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.6, duration: 0.3 }}
                  className="text-center"
                >
                  <h3 className="text-3xl md:text-8xl font-bold md:my-6 text-purple-500">8+</h3>
                  <motion.p
                    initial={{ opacity: 0, y: 100 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.8, duration: 0.5 }}
                    className="text-sm sm:text-base text-gray-300"
                  >
                    Overall Customer Service and Technical Support Experience
                  </motion.p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.6, duration: 0.3 }}
                  className="text-center"
                >
                  <h3 className="text-3xl md:text-8xl font-bold md:my-6 text-purple-500">10+</h3>
                  <motion.p
                    initial={{ opacity: 0, y: 100 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.9, duration: 0.5 }}
                    className="text-sm sm:text-base text-gray-300"
                  >
                    Projects I have made
                  </motion.p>
                </motion.div>
              </div>
            </>
          )}
        </InView>
      </div>
    </div>
  );
};

export default About;
