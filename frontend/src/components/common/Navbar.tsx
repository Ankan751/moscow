import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, Home, Building, Info, MessageCircle, Phone, Sparkles } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { title: 'Home', path: '/', icon: Home },
    { title: 'Properties', path: '/properties', icon: Building },
    { title: 'About Us', path: '/about', icon: Info },
    { title: 'Contact', path: '/contact', icon: Phone },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg h-[65px]' : 'bg-white h-[81px]'
      }`}>
      <div className="max-w-[1440px] mx-auto h-full px-4 sm:px-8 flex items-center justify-between relative">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 h-full py-0 lg:static absolute left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0"
        >
          <img
            src="https://res.cloudinary.com/diidko3fa/image/upload/f_webp,q_auto/v1776714352/WhatsApp_Image_2026-04-19_at_8.58.17_PM-Photoroom_hpuhgx.png"
            alt="Hanumant Properties Logo"
            className="h-full w-auto object-contain py-1"
          />
          <span className="font-playfair font-medium text-2xl sm:text-3xl text-[#C5A059] hidden lg:block tracking-wide">
            Hanumant Properties
          </span>      </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              to={link.path}
              className={`font-red-hat text-sm font-bold uppercase tracking-widest transition-all duration-300 relative py-1 ${location.pathname === link.path
                ? 'text-black'
                : 'text-[#1F2937] hover:text-black'
                }`}
            >
              {link.title}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="navUnderline"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C5A059]"
                />
              )}
            </Link>
          ))}
          <Link
            to="/properties"
            className="bg-black text-white font-red-hat text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-lg hover:bg-[#B89345] transition-all duration-300 shadow-md"
          >
            Explore Listings
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden w-10 h-10 flex items-center justify-center text-[#C5A059]"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Backdrop & Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[85] lg:hidden"
            />

            {/* Sidebar Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 w-[310px] h-screen bg-white z-[90] lg:hidden flex flex-col p-8 shadow-2xl"
            >
              {/* Close Button on the Left */}
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-[#C5A059] mb-12 -ml-2"
              >
                <X className="w-8 h-8" />
              </button>

              <div className="flex flex-col gap-8 w-full">
                {navLinks.map((link) => (
                  <Link
                    key={link.title}
                    to={link.path}
                    className="flex items-center gap-5 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#C5A059]/10 flex items-center justify-center group-hover:bg-[#C5A059] transition-all duration-300">
                      <link.icon className="w-5 h-5 text-[#C5A059] group-hover:text-white" />
                    </div>
                    <span className="font-fraunces text-2xl font-bold text-[#1a1a1a] group-hover:text-[#C5A059] transition-colors">
                      {link.title}
                    </span>
                  </Link>
                ))}
                
                <div className="pt-8 mt-4 border-t border-gray-100">
                  <Link
                    to="/properties"
                    className="block w-full bg-[#C5A059] text-white font-red-hat text-xs font-black uppercase tracking-[2px] py-5 rounded-xl shadow-lg shadow-[#C5A059]/20 text-center active:scale-[0.98] transition-transform"
                  >
                    View All listings
                  </Link>
                </div>
              </div>

              {/* Contact Support */}
              <div className="mt-auto pt-8 border-t border-gray-100">
                <p className="font-red-hat text-[10px] text-gray-400 uppercase tracking-widest mb-2 font-bold">Need Assistance?</p>
                <p className="font-fraunces text-2xl font-bold text-[#C5A059]">78190-81887</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
