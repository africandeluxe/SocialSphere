'use client'

import { motion } from 'framer-motion';

export default function WhatWeAre() {
  const textVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <div className="relative min-h-screen bg-brand-cream flex items-center justify-center px-6 lg:px-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl">
        <motion.div initial="hidden" whileInView="visible"
          viewport={{ 
            once: true, 
            amount: 0.5 
          }}
          variants={textVariants}
          className="flex flex-col justify-center">
          <h2 className="text-5xl lg:text-6xl font-bold text-brand-dark leading-tight">
            Founded on <span className="text-brand-bronze">Quality </span> 
            and <span className="text-brand-bronze">Innovation</span>
          </h2>
          <p className="mt-6 text-lg text-brand-gray">
            SocialSphere is dedicated to empowering social connections with cutting-edge tools and solutions. 
            We strive for excellence and innovation to bring your digital presence to life.
          </p>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible"
          viewport={{ 
            once: true, 
            amount: 0.5 
          }}
          variants={imageVariants}
          className="flex justify-center lg:justify-end relative">
    <div className="absolute -z-10 bg-gradient-to-br from-brand-bronze via-brand-cream to-transparent rounded-full w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] blur-3xl"></div>
      <img src="/mockup-female.png" alt="What We Are" className="max-w-full h-auto"
        style={{
          maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
        }}/>
      </motion.div>
      </div>
    </div>
  );
}