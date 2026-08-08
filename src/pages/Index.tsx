import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import StylesSection from '@/components/StylesSection';
import ReservaSection from '@/components/ReservaSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  const [language, setLanguage] = useState('es');

  return (
    <div className="min-h-screen bg-background">
      <Navigation language={language} onLanguageChange={setLanguage} />
      <HeroSection language={language} />
      <ServicesSection language={language} />
      <StylesSection language={language} />
      <ReservaSection language={language} />
      <ContactSection language={language} />
    </div>
  );
};

export default Index;
