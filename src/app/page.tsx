import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhatWeAre from '@/components/WhatWeAre';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <WhatWeAre />
      <Features />
      <Footer />
    </>
  );
}