import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, Home, Building, Info, Phone } from 'lucide-react';

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
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { title: 'Home', path: '/', icon: Home },
    { title: 'Properties', path: '/properties', icon: Building },
    { title: 'About Us', path: '/about', icon: Info },
    { title: 'Contact', path: '/contact', icon: Phone },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg h-20' 
        : 'bg-transparent h-24'
    }`}>
      <div className="max-w-[1800px] mx-auto h-full px-4 sm:px-12 flex items-center justify-between relative">
        
        {/* Mobile Menu Button - Left Aligned on Mobile */}
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden p-2.5 bg-white text-[#1A2B49] rounded-xl shadow-lg active:scale-95 transition-all"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo Section - Centered on Mobile, Left-aligned on Desktop (will adjust to center if needed) */}
        <Link 
          to="/" 
          className="flex items-center gap-3 group absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0"
        >
          <div className="relative flex items-center h-10 sm:h-14 overflow-hidden">
             <img
              src="/logo.jpg"
              alt="JINI HOMES"
              className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="flex flex-col leading-tight hidden xs:flex">
            <span className="font-fraunces font-black text-lg sm:text-2xl tracking-tight text-[#1A2B49]">
              JINI <span className="text-[#4CAF50]">HOMES</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation - Right Aligned */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-2 bg-gray-100/50 p-1.5 rounded-2xl border border-gray-100 shadow-sm">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'bg-white text-[#4CAF50] shadow-sm border border-gray-100'
                    : 'text-gray-500 hover:text-[#4CAF50] hover:bg-white/50'
                }`}
              >
                {link.title}
              </Link>
            ))}
          </div>
          
          <Link
            to="/properties"
            className="bg-[#1A2B49] text-white px-8 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#4CAF50] transition-all shadow-lg active:scale-95"
          >
            Explore Listings
          </Link>
        </div>

        {/* Mobile Contact Icon or Empty div to balance the layout on mobile */}
        <div className="lg:hidden w-10"></div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-[#1A2B49]/60 backdrop-blur-sm z-[110]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 w-[85%] max-w-[400px] h-screen bg-white z-[120] shadow-2xl flex flex-col"
            >
              <div className="p-6 flex items-center justify-between border-b border-gray-50">
                <div className="flex items-center gap-2">
                   <img src="/logo.jpg" alt="Logo" className="h-10 w-auto" />
                   <span className="font-fraunces font-bold text-lg text-[#1A2B49]">JINI HOMES</span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 bg-gray-50 rounded-xl text-gray-500"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center justify-between p-5 rounded-2xl transition-all ${
                      location.pathname === link.path
                        ? 'bg-[#4CAF50]/10 border border-[#4CAF50]/20 text-[#4CAF50]'
                        : 'bg-gray-50 text-[#1A2B49] hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <link.icon className={`w-5 h-5 ${location.pathname === link.path ? 'text-[#4CAF50]' : 'text-gray-400'}`} />
                      <span className="font-bold text-lg">{link.title}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 opacity-30" />
                  </Link>
                ))}
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 text-center">Contact Support</p>
                <a 
                  href="tel:78190-81887"
                  className="flex items-center justify-center gap-3 text-[#1A2B49] font-fraunces text-2xl font-bold mb-6"
                >
                  <Phone className="w-5 h-5 text-[#4CAF50]" />
                  78190-81887
                </a>
                <Link
                  to="/properties"
                  className="flex items-center justify-center gap-2 w-full bg-[#1A2B49] text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl"
                >
                  <Building className="w-4 h-4 text-[#4CAF50]" />
                  View All Listings
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
