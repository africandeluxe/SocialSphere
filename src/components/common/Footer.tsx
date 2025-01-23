const Footer = () => {
  return (
    <footer className="bg-brand-bronze text-white py-12 relative overflow-hidden rounded-t-3xl">
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent opacity-20 pointer-events-none"></div>
      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        <h2 className="text-8xl font-bold mb-6">Pssst... Waiting you!</h2>
        <div className="flex gap-6 mb-8">
          <a href="#" className="hover:scale-110 transition-transform">
            <img src="/icons/tiktok.svg" alt="TikTok" className="h-8 w-8" />
          </a>
          <a href="#" className="hover:scale-110 transition-transform">
            <img src="/icons/instagram.svg" alt="Instagram" className="h-8 w-8" />
          </a>
        </div>
        <p className="text-sm mb-2">© 2025 SocialSphere. All Rights Reserved.</p>
        <p className="text-sm">
          <a href="mailto:contact@socialsphere.com" className="hover:underline">
            contact@socialsphere.com
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;