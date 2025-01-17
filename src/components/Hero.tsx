'use client'

import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';

export default function Hero() {
  const mockupRef = useRef(null);
  const isInView = useInView(mockupRef, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const mockupVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
    visible: {
      opacity: 1,
      scale: 1.3,
      rotateY: 0,
      transition: {
        duration: 1.2,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.35,
      rotateY: 5,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-brand-light via-brand-sand to-brand-cream overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, x: -100 }} animate={{ opacity: 0.20, x: 0 }}transition={{ duration: 1.2 }}
        className="absolute left-10 top-1/4 text-[9vw] font-extrabold text-brand-bronze opacity-10 z-0">Simplify Social Media
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0, x: 100 }} animate={{ opacity: 0.20, x: 0 }} transition={{ duration: 1.2, delay: 0.2 }}
        className="absolute right-10 bottom-1/4 text-[15vw] font-extrabold text-brand-bronze opacity-10 z-0">Plan Smarter
      </motion.h1>
      <motion.div 
        ref={mockupRef} variants={mockupVariants} initial="hidden" animate={controls} whileHover="hover" className="relative z-10">
        <img src="/mockup.png" alt="SocialSphere Mockup" className="w-[80vw] max-w-[900px] drop-shadow-2xl"/>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-10 text-center">
        <a href="#get-started" className="bg-brand-bronze text-brand-light py-3 px-6 rounded-full shadow-lg hover:bg-brand-moss transition duration-300">
          Get Early Access Now
        </a>
        <p className="mt-4 text-sm text-brand-gray">
          Don’t be late to the party – Get Early Access Today!
        </p>
      </motion.div>
    </div>
  );
}