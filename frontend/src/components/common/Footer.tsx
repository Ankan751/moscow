import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, Twitter, Facebook, ArrowRight, Home } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Our Team', path: '/about' },
      { name: 'Contact', path: '/contact' },
    ],
    services: [
      { name: 'Buy Property', path: '/properties' },
    ],

  };

  return (
    <footer className="bg-[#0B1726] text-white pt-24 pb-12 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">

          {/* Logo & Vision */}
          <div className="lg:col-span-2 space-y-8">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="https://ik.imagekit.io/kceia4cyw/Property/WhatsApp%20Image%202026-04-28%20at%2010.54.44%20PM-Photoroom.png?tr=f-webp,t-true"
                alt="Get A Dream Home"
                className="h-20 w-auto object-contain"
              />
              <span className="font-fraunces font-bold text-3xl tracking-tight text-[#4CAF50]">JINI HOMES</span>
            </Link>
            <p className="font-inter  text-base text-white max-w-sm leading-relaxed">
              Curating luxury living spaces and premium investment opportunities across India's most prestigious locations.
            </p>
            <div className="flex items-center gap-5">
              <a href="https://www.instagram.com/hanumant_properties2024?igsh=MXNxMGMybXk4aHY5eA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-lg border-0 bg-white/10 hover:bg-[#4CAF50] transition-all duration-300">
                <Instagram className="w-5 h-5 text-white hover:text-white transition-colors" />
              </a>
              <a href="https://www.youtube.com/@Hanumant_properties" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-lg border-0 bg-white/10 hover:bg-[#4CAF50] transition-all duration-300">
                <Youtube className="w-5 h-5 text-white hover:text-white transition-colors" />
              </a>
              <a href="https://www.facebook.com/share/1F8iGtz8gA/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-lg border-0 bg-white/10 hover:bg-[#4CAF50] transition-all duration-300">
                <Facebook className="w-5 h-5 text-white hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-6">
              <h4 className="font-red-hat text-xs font-extra-bold uppercase tracking-[3px] text-[#4CAF50]">{title}</h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="font-red-hat text-sm text-white/80 hover:text-[#4CAF50] hover:translate-x-1 transition-all inline-block">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="font-red-hat text-xs text-white/60 uppercase tracking-widest">
            © {currentYear} JINI HOMES Luxury Real Estate.
          </p>
          <div className="flex items-center gap-8">
            <Link to="/contact" className="font-red-hat text-xs text-white/60 hover:text-[#4CAF50] uppercase tracking-widest transition-colors font-bold">Contact Support</Link>
            <Link to="/properties" className="font-red-hat text-xs text-[#4CAF50]/60 hover:text-[#4CAF50] uppercase tracking-widest transition-colors font-bold">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
