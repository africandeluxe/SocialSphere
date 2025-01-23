import Navbar from '../components/common/Navbar';
import Hero from '../components/common/Hero';
import WhatWeAre from '../components/common/WhatWeAre';
import Features from '../components/common/Features';
import Footer from '../components/common/Footer';

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