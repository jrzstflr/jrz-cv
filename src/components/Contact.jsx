import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from 'react-icons/fa';
import emailjs from 'emailjs-com';

const Contact = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    message: '',
  });

  const [status, setStatus] = useState(''); 

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      budget: formData.budget,
      message: formData.message,
    };

    emailjs
      .send(
        'service_1abotmp', 
        'template_sjzo94d', 
        emailParams, 
        'Agyd0ozhEXpMoVF22' 
      )
      .then(
        () => {
          setStatus('Message sent successfully!');
          setFormData({ name: '', email: '', phone: '', budget: '', message: '' });
        },
        () => {
          setStatus('Oops! Something went wrong. Please try again later.');
        }
      );
  };

  return (
    <div id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: -100 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-4xl font-bold text-white"
        >
          Let's discuss your <span className="text-purple-500">Project</span>
        </motion.h2>
        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: -100 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-slate-400 mt-4"
        >
          Hello, your satisfaction and convenience are my top priorities. Whether you have questions about my services, need assistance, or simply want to share your feedback, I am always happy to hear from you. <br />
          Feel free to reach out to me using the contact form or via any of the provided channels. I am dedicated and ready to provide prompt and professional assistance, ensuring your experience with me is seamless and enjoyable. <br />
          Let’s Connect! <br />
          I look forward to assisting you.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center space-x-4"
          >
            <div className="bg-purple-500 p-4 rounded-full">
              <FaPhone className="text-white w-6 h-6" />
            </div>
            <div>
              <p className="text-lg font-medium text-purple-500">Call Me</p>
              <p className="text-white">+1 (209) 781-8558</p>
            </div>
          </motion.div>

          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex items-center space-x-4"
          >
            <div className="bg-purple-500 p-4 rounded-full">
              <FaEnvelope className="text-white w-6 h-6" />
            </div>
            <div>
              <p className="text-lg font-medium text-purple-500">Email</p>
              <p className="text-white">jeruz.abiera@outlook.com</p>
            </div>
          </motion.div>

          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex items-center space-x-4"
          >
            <div className="bg-purple-500 p-4 rounded-full">
              <FaMapMarkerAlt className="text-white w-6 h-6" />
            </div>
            <div>
              <p className="text-lg font-medium text-purple-500">Location</p>
              <p className="text-white">Mabalacat City, Pampanga 2010</p>
            </div>
          </motion.div>
        </div>

        <motion.form
          ref={ref}
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="space-y-4 text-white"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Full Name"
              className="border border-purple-500 bg-gray-800 p-4 rounded-md w-full"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your Email"
              className="border border-purple-500 bg-gray-800 p-4 rounded-md w-full"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Your Phone Number"
              className="border border-purple-500 bg-gray-800 p-4 rounded-md w-full"
            />
            <input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              placeholder="Your Budget"
              className="border border-purple-500 bg-gray-800 p-4 rounded-md w-full"
            />
          </div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Message"
            className="border border-purple-500 bg-gray-800 p-4 rounded-md w-full"
          ></textarea>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-purple-500 text-white px-6 py-3 rounded-md hover:bg-purple-600 transition duration-200"
          >
            Send Message
          </motion.button>
          {status && (
            <div className={`mt-4 text-center text-lg ${status.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
              {status}
            </div>
          )}
        </motion.form>
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-48 flex justify-between items-center p-5 text-white border-t-2 border-purple-500"
      >
        <p>© 2025. All Rights Reserved</p>
        <p>Jeruz Abiera</p>
        <div className="flex justify-center space-x-4 text-white mt-4">
          <a href="https://www.facebook.com/JrzStflrFB" className="hover:text-purple-500">
            <FaFacebook className="w-6 h-6" />
          </a>
          <a href='https://www.github.com/jrzstflr' className="hover:text-purple-500">
            <FaGithub className="w-6 h-6" />
          </a>
          <a href='https://www.linkedin.com/in/jeruzabiera' className="hover:text-purple-500">
            <FaLinkedin className="w-6 h-6" />
          </a>
          <a href='https://www.instagram.com/jrzstflr' className="hover:text-purple-500">
            <FaInstagram className="w-6 h-6" />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
