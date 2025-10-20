import React from 'react';

interface BookingSectionProps {
  language: string;
}

const BookingSection: React.FC<BookingSectionProps> = ({ language }) => {
  const content = {
    es: {
      title: "Reserva tu Turno",
      subtitle: "Verifica la disponibilidad de nuestro equipo y agéndate!",
      lautaro: "Reservar con Lautaro",
      alexis: "Reservar con Alexis"
    },
    en: {
      title: "Book Your Appointment",
      subtitle: "Check our team's availability and book your appointment!",
      lautaro: "Book with Lautaro",
      alexis: "Book with Alexis"
    }
  };

  const text = content[language as keyof typeof content];

  return (
    <section className="py-20 bg-gradient-to-br from-cream via-cream/50 to-sage/10" id="reservas">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-charcoal mb-4">{text.title}</h2>
          <p className="text-xl text-charcoal/80 max-w-2xl mx-auto">{text.subtitle}</p>
        </div>
        
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="space-y-4">
            <a
              href="https://calendly.com/lautarojoaquinsosanavarro8/45min"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-copper text-cream py-3 px-6 rounded-lg font-semibold text-lg hover:bg-copper/90 transition-colors"
            >
              {text.lautaro}
            </a>
            
            <a
              href="https://calendly.com/asbarberiaa2025/45min"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-charcoal text-cream py-3 px-6 rounded-lg font-semibold text-lg hover:bg-charcoal/90 transition-colors"
            >
              {text.alexis}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;