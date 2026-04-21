import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useSEO } from '../hooks/useSEO';
import AboutHeroSection from '../components/about/AboutHeroSection';
import AboutHeritageSection from '../components/about/AboutHeritageSection';
import AboutCTASection from '../components/about/AboutCTASection';
import WhyChooseSection from '../components/about/WhyChooseSection';


const AboutUsPage: React.FC = () => {
  useSEO({
    title: 'About Us',
    description: 'Learn about Hanumant Properties — our mission, values, and the luxury real estate experience in Punjab.',
  });

  return (
    <div className="bg-[#FDFBF7] min-h-screen">
      {/* Sticky Navigation */}
      <Navbar />

      {/* Hero Section */}
      <AboutHeroSection />

      {/* Our Heritage Section */}
      <AboutHeritageSection />

      {/* Stats Section */}

      {/* Values Section - Driven by Purpose */}

      {/* AI Intelligence Section */}

      {/* Why Choose Us Section */}
      <WhyChooseSection />

      {/* CTA Section */}
      <AboutCTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUsPage;
