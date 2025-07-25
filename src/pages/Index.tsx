import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import StylesSection from '@/components/StylesSection';
import TeamSection from '@/components/TeamSection';
import BlogSection from '@/components/BlogSection';
import BookingSection from '@/components/BookingSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  const [language, setLanguage] = useState('es');

  return (
    <div className="min-h-screen">
      <Navigation language={language} onLanguageChange={setLanguage} />
      <HeroSection language={language} />
      <ServicesSection language={language} />
      <StylesSection language={language} />
      <TeamSection language={language} />
      <BlogSection language={language} />
      <BookingSection language={language} />
      <ContactSection language={language} />
    </div>
  );
};

export default Index;
