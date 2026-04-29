import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useSEO } from '../hooks/useSEO';
import ContactHeroSection from '../components/contact/ContactHeroSection';
import ContactInfoCards from '../components/contact/ContactInfoCards';
import ContactMapSection from '../components/contact/ContactMapSection';

const ContactPage: React.FC = () => {
  useSEO({
    title: 'Contact Us',
    description: 'Get in touch with Get A Dream Home. We\'re here to help you find your dream property.',
  });

  return (
    <div className="bg-[#FDFBF7] min-h-screen">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <ContactHeroSection />

      {/* Contact Form & Info Cards Section */}
      <section className="bg-[#FFFFFF] py-16">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left - Direct Chat & Call Methods (2/3 width) */}
            <div className="lg:col-span-2 flex flex-col justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                {/* WhatsApp Us */}
                <div className="bg-[#E8F7ED] border border-[#25D366]/20 rounded-2xl p-8 hover:shadow-xl transition-all group flex flex-col justify-between">
                  <div>
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <span className="material-icons text-3xl text-[#25D366]">
                        chat
                      </span>
                    </div>
                    <h3 className="font-fraunces font-bold text-2xl text-[#1F2937] mb-3">
                      WhatsApp Us
                    </h3>
                    <p className="font-red-hat font-medium text-[#4B5563] leading-relaxed mb-6">
                      Chat directly with our support team via WhatsApp for instant assistance.
                    </p>
                  </div>
                  <a
                    href="https://wa.me/919501490002"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-red-hat font-bold text-black hover:text-[#0EA5E9] transition-colors group/link"
                  >
                    <span>Start Chat</span>
                    <span className="material-icons text-sm group-hover/link:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </a>
                </div>

                {/* Schedule a Call */}
                <div className="bg-[#FBF4E4] border border-[#38BDF8]/20 rounded-2xl p-8 hover:shadow-xl transition-all group flex flex-col justify-between">
                  <div>
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <span className="material-icons text-3xl text-black">
                        event
                      </span>
                    </div>
                    <h3 className="font-fraunces font-bold text-2xl text-[#1F2937] mb-3">
                      Schedule a Call
                    </h3>
                    <p className="font-red-hat font-medium text-[#4B5563] leading-relaxed mb-6">
                      Book a convenient time for a detailed consultation with our specialists.
                    </p>
                  </div>
                  <a
                    href="/#consultation-section"
                    className="inline-flex items-center gap-2 font-red-hat font-bold text-black hover:text-[#0EA5E9] transition-colors group/link"
                  >
                    <span>Book Now</span>
                    <span className="material-icons text-sm group-hover/link:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right - Contact Info Cards (1/3 width) */}
            <div className="lg:col-span-1">
              <ContactInfoCards />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <ContactMapSection />




      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;
