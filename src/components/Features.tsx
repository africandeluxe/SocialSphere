'use client'
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const features = [
  {
    title: 'Performance Analytics',
    description: 'Track your social media performance with intuitive analytics.',
    image: '/analytucs-removebg-preview.png',
  },
  {
    title: 'Enhanced Security',
    description: 'Keep your data safe with advanced security protocols.',
    image: '/enhanced-security-removebg-preview.png',
  },
  {
    title: 'Private Communities',
    description:
      'Create private, secure communities to interact with your audience.',
    image: '/private-communities-removebg-preview.png',
  },
  {
    title: 'Content Calendar',
    description: 'Plan and schedule your posts effortlessly.',
    image: '/content-calendar-removebg-preview.png',
  },
];

export default function Features() {
  const [isScrolling, setIsScrolling] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    hover: {
      scale: 1.1,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), 1000);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      id="features"
      className="min-h-screen bg-brand-cream py-16 flex flex-col items-center overflow-x-hidden">
      <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-5xl font-bold text-center text-brand-dark mb-16">
        Features
      </motion.h2>
      <motion.div className="flex gap-8 px-4 w-full max-w-[5000px]" animate={{ x: isScrolling ? ['0%', '-20%', '-40%', '-60%'] : '0%',}}
        transition={{
          duration: 4,
          ease: 'easeInOut',
          repeat: Infinity,
        }}>
        {features.map((feature, index) => (
          <motion.div key={index} className="flex-none w-[350px] sm:w-[450px] p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transform transition duration-300 flex flex-col items-center" 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            whileHover="hover">

            <motion.img src={feature.image} alt={feature.title} className="w-48 h-48 mb-6" animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}/>
            <h3 className="text-2xl font-bold text-brand-dark mb-4">{feature.title}</h3>
            <p className="text-center text-brand-gray text-lg">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}