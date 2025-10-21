import React from 'react';
import InteractiveMap from '@/components/ui/interactive-map';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

interface ContactSectionProps {
  language: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ language }) => {
  const content = {
    es: {
      title: "Contacto",
      subtitle: "Visítanos o escríbenos",
      address: "Av. 18 de Julio 1234, Montevideo",
      phone: "+598 2XXX XXXX",
      email: "info@asbarberia.uy",
      hours: "Horarios",
      weekdays: "Lun-Vie: 9:00-19:00, Sáb: 9:00-17:00",
      location: "Nuestra Ubicación",
      directions: "Cómo llegar",
      googleMaps: "Ver en Google Maps"
    },
    en: {
      title: "Contact",
      subtitle: "Visit us or write to us",
      address: "Av. 18 de Julio 1234, Montevideo",
      phone: "+598 2XXX XXXX", 
      email: "info@asbarberia.uy",
      hours: "Hours",
      weekdays: "Mon-Fri: 9:00-19:00, Sat: 9:00-17:00",
      location: "Our Location",
      directions: "How to get there",
      googleMaps: "View on Google Maps"
    }
  };

  const text = content[language as keyof typeof content];

  return (
    <section className="py-20 bg-gradient-to-br from-sage/5 via-cream/30 to-copper/5" id="contacto">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-charcoal mb-4">{text.title}</h2>
          <p className="text-xl text-charcoal/80 max-w-2xl mx-auto">{text.subtitle}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Información de contacto centrada */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-charcoal/90 backdrop-blur-sm rounded-lg p-6 shadow-sm text-center">
              <div className="flex items-center justify-center mb-3">
                <MapPin className="w-6 h-6 text-copper" />
              </div>
              <h3 className="font-semibold text-cream mb-2">Dirección</h3>
              <p className="text-cream/80 text-sm">{text.address}</p>
            </div>

            <div className="bg-charcoal/90 backdrop-blur-sm rounded-lg p-6 shadow-sm text-center">
              <div className="flex items-center justify-center mb-3">
                <Phone className="w-6 h-6 text-copper" />
              </div>
              <h3 className="font-semibold text-cream mb-2">Teléfono</h3>
              <p className="text-cream/80 text-sm">{text.phone}</p>
            </div>

            <div className="bg-charcoal/90 backdrop-blur-sm rounded-lg p-6 shadow-sm text-center">
              <div className="flex items-center justify-center mb-3">
                <Mail className="w-6 h-6 text-copper" />
              </div>
              <h3 className="font-semibold text-cream mb-2">Email</h3>
              <p className="text-cream/80 text-sm">{text.email}</p>
            </div>

            <div className="bg-charcoal/90 backdrop-blur-sm rounded-lg p-6 shadow-sm text-center">
              <div className="flex items-center justify-center mb-3">
                <Clock className="w-6 h-6 text-copper" />
              </div>
              <h3 className="font-semibold text-cream mb-2">{text.hours}</h3>
              <p className="text-cream/80 text-sm">{text.weekdays}</p>
            </div>
          </div>

          {/* Mapa centrado */}
          <div className="bg-charcoal/90 backdrop-blur-sm rounded-lg p-6 shadow-sm">
            <h3 className="text-2xl font-semibold text-cream mb-6 text-center flex items-center justify-center">
              <MapPin className="w-6 h-6 text-copper mr-2" />
              {text.location}
            </h3>
            <div className="rounded-lg overflow-hidden mb-6">
              <InteractiveMap 
                address={text.address}
                businessName="AS Barbería"
                language={language}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;