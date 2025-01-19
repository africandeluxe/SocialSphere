import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-center px-10 py-4 bg-transparent z-50">
      <div className="flex items-center gap-6">
        <a href="#features" className="text-brand-dark hover:underline">What We Are</a>
        <a href="#values" className="text-brand-dark hover:underline">Our Values</a>
      </div>
      <div className="mx-8">
        <img src="/logo.png" alt="SocialSphere Logo" className="h-24 w-auto"/>
      </div>
      <div className="flex items-center gap-6">
        <a href="#how-it-works" className="text-brand-dark hover:underline">How It Works</a>
        <Link href="/login" className="text-brand-dark hover:underline">Sign Up / Log In</Link>
      </div>
    </nav>
  );
}