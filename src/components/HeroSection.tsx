import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Calendar } from 'lucide-react';

interface HeroSectionProps {
  language: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ language }) => {
  const content = {
    es: {
      title: "Bienvenido a Barbería CorteVivo",
      subtitle: "Estilo auténtico, acabado perfecto",
      btnCatalog: "Ver catálogo de servicios",
      btnBook: "Reserva tu turno"
    },
    en: {
      title: "Welcome to Barbería CorteVivo",
      subtitle: "Authentic style, perfect finish",
      btnCatalog: "View services catalog",
      btnBook: "Book your appointment"
    }
  };

  const text = content[language as keyof typeof content];

  const handleDownloadPDF = () => {
    // Create a link to download the PDF
    const link = document.createElement('a');
    link.href = '/assets/servicios_cortevivo.pdf';
    link.download = 'servicios_cortevivo.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBooking = () => {
    document.querySelector('#reserva')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 hero-gradient">
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1622286346003-4526d9101127?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
        }}
      >
        <div className="absolute inset-0 bg-primary/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white container-responsive section-padding">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          {text.title.split(' ').map((word, index) => (
            <span key={index} className={word === 'CorteVivo' ? 'text-copper' : ''}>
              {word}{' '}
            </span>
          ))}
        </h1>
        
        <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-2xl mx-auto">
          {text.subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            onClick={handleDownloadPDF}
            size="lg"
            className="btn-copper text-lg px-8 py-4 hover-scale"
          >
            <Download className="w-5 h-5 mr-2" />
            {text.btnCatalog}
          </Button>
          
          <Button
            onClick={handleBooking}
            variant="outline"
            size="lg"
            className="btn-outline-copper text-lg px-8 py-4 hover-scale border-white text-white hover:bg-white hover:text-primary"
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