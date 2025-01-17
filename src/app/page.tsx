import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhatWeAre from '@/components/WhatWeAre';
import OurValues from '@/components/OurValues';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <WhatWeAre />
      <OurValues />
      <Features />
      <Footer />
    </>
  );
}