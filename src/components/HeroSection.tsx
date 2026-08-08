import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

interface HeroSectionProps {
  language: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ language }) => {
  const content = {
    es: {
      title: "Bienvenido a AS Barbería",
      subtitle: "Estilo puro, corte perfecto",
      btnBook: "Reservar turno"
    },
    en: {
      title: "Bienvenido a AS Barbería",
      subtitle: "Estilo puro, corte perfecto",
      btnBook: "Reservar turno"
    }
  };

  const text = content[language as keyof typeof content];

  const handleBooking = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.querySelector('#reserva')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Foto de la pared con el logo */}
      <img
        src="/pared-logo.jpg"
        alt="Pared con el logo de AS Barbería"
        className="absolute inset-0 h-full w-full object-cover object-[65%_30%] md:object-center"
      />
      <div className="absolute inset-0 bg-background/55" aria-hidden="true"></div>

      {/* Contenido */}
      <div className="relative z-10 text-center text-foreground container-responsive section-padding">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight">
          {text.title.split(' ').map((word, index) => (
            <span key={index} className={word === 'Barbería' ? 'text-copper' : ''}>
              {word}{' '}
            </span>
          ))}
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl mb-12 text-muted-foreground max-w-2xl mx-auto">
          {text.subtitle}
        </p>

        <div className="flex justify-center">
          <Button
            onClick={handleBooking}
            size="lg"
            className="btn-copper text-lg px-8 py-4"
          >
            <Calendar className="w-5 h-5 mr-2" />
            {text.btnBook}
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default HeroSection;
