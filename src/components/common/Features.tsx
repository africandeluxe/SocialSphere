'use client'
import { motion } from 'framer-motion';

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
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  };

  return (
    <div
      id="features"
      className="h-auto bg-brand-cream py-4 sm:py-8 flex flex-col items-center px-4 sm:px-8 lg:px-20 pb-12 sm:pb-16">
      <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-brand-dark mb-6">
        Features
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <motion.div key={index} className="bg-white rounded-2xl shadow-md hover:shadow-lg transform transition duration-300 flex flex-col items-center p-4" initial="hidden"
          whileInView="visible" viewport={{ once: true }} variants={cardVariants} whileHover="hover">
            <img src={feature.image} alt={feature.title} className="w-28 h-28 mb-4"/>
            <h3 className="text-lg font-bold text-brand-dark mb-2 text-center">
              {feature.title}
            </h3>
            <p className="text-sm text-brand-gray text-center">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}