import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

interface HeroSectionProps {
  language: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ language }) => {
  const content = {
    es: {
      title: "Bienvenido a AS Barbería",
      subtitle: "Estilo puro, corte perfecto",
      btnBook: "Reserva tu turno"
    },
    en: {
      title: "Welcome to AS Barbería",
      subtitle: "Pure style, perfect cut",
      btnBook: "Book your appointment"
    }
  };

  const text = content[language as keyof typeof content];

  const handleBooking = () => {
    document.querySelector('#reserva')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - AS Logo */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBg})`
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white container-responsive section-padding">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          {text.title.split(' ').map((word, index) => (
            <span key={index} className={word === 'Barbería' ? 'text-copper' : ''}>
              {word}{' '}
            </span>
          ))}
        </h1>
        
        <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-2xl mx-auto">
          {text.subtitle}
        </p>
        
        <div className="flex justify-center">
          <Button
            onClick={handleBooking}
            size="lg"
            className="btn-copper text-lg px-8 py-4 hover-scale"
          >
            <Calendar className="w-5 h-5 mr-2" />
            {text.btnBook}
          </Button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default HeroSection;