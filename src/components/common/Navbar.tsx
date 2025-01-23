'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if user has scrolled
      setIsScrolled(currentScrollY > 0);

      if (currentScrollY > lastScrollY) {
        setIsNavbarVisible(false); // Hide navbar on scroll down
      } else {
        setIsNavbarVisible(true); // Show navbar on scroll up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        isNavbarVisible ? 'translate-y-0' : '-translate-y-full'
      } ${isScrolled ? 'bg-brand-dark shadow-md' : 'bg-transparent'}`}
    >
      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-center px-10 py-4">
        <div className="flex items-center gap-6">
          <a href="#features" className="text-white hover:underline">
            What We Are
          </a>
          <a href="#values" className="text-white hover:underline">
            Our Values
          </a>
        </div>
        <div className="mx-8">
          <img src="/logo.png" alt="SocialSphere Logo" className="h-24 w-auto" />
        </div>
        <div className="flex items-center gap-6">
          <a href="#how-it-works" className="text-white hover:underline">
            How It Works
          </a>
          <Link href="/login" className="text-white hover:underline">
            Sign Up / Log In
          </Link>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="flex md:hidden items-center justify-between px-4 py-4">
        <button
          className="text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
        <div>
          <img src="/logo.png" alt="SocialSphere Logo" className="h-16 w-auto" />
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col items-center gap-2 py-4">
            <li>
              <a
                href="#features"
                className="text-brand-dark hover:underline"
                onClick={() => setIsMenuOpen(false)}
              >
                What We Are
              </a>
            </li>
            <li>
              <a
                href="#values"
                className="text-brand-dark hover:underline"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Values
              </a>
            </li>
            <li>
              <a
                href="#how-it-works"
                className="text-brand-dark hover:underline"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </a>
            </li>
            <li>
              <Link
                href="/login"
                className="text-brand-dark hover:underline"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up / Log In
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}