import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Scissors, Zap, ShoppingBag, User, Sparkles } from 'lucide-react';

interface ServicesSectionProps {
  language: string;
}

interface Service {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  fullDescription: string;
  price: string;
  duration: string;
  images: string[];
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ language }) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const content = {
    es: {
      title: "Nuestros Servicios",
      subtitle: "Cortes de primera, estilo uruguayo",
      viewAll: "Ver todos los servicios",
      quickView: "Vista rápida",
      price: "Precio",
      duration: "Duración",
      services: [
        {
          id: "corte",
          icon: <Scissors className="w-8 h-8" />,
          title: "Corte",
          description: "Corte profesional adaptado a tu estilo personal y forma del rostro",
          fullDescription: "Corte profesional que se adapta perfectamente a tu estilo personal y forma del rostro. Utilizamos técnicas modernas para lograr un acabado impecable.",
          price: "$500",
          duration: "30 min",
          images: ["https://images.unsplash.com/photo-1622286346003-4526d9101127?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]
        },
        {
          id: "corte-barba",
          icon: <User className="w-8 h-8" />,
          title: "Corte + Barba",
          description: "Servicio completo de corte y arreglo de barba con acabado perfecto",
          fullDescription: "Servicio premium que combina corte profesional con cuidado completo de barba. Incluye perfilado, recorte y acabado con productos especializados.",
          price: "$800",
          duration: "45 min",
          images: ["https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]
        },
        {
          id: "color-tinte",
          icon: <Sparkles className="w-8 h-8" />,
          title: "Color (Tinte)",
          description: "Coloración profesional para cubrir canas o cambiar tu look completamente",
          fullDescription: "Servicio completo de coloración con productos premium. Incluye análisis del cabello, aplicación profesional y tratamiento nutritivo post-color.",
          price: "$1.750",
          duration: "60 min",
          images: ["https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]
        }
      ]
    },
    en: {
      title: "Our Services",
      subtitle: "First-class cuts, Uruguayan style",
      viewAll: "View all services",
      quickView: "Quick view",
      price: "Price",
      duration: "Duration",
      services: [
        {
          id: "haircut",
          icon: <Scissors className="w-8 h-8" />,
          title: "Haircut",
          description: "Professional cut adapted to your personal style and face shape",
          fullDescription: "Professional haircut that perfectly adapts to your personal style and face shape. We use modern techniques to achieve an impeccable finish.",
          price: "$500",
          duration: "30 min",
          images: ["https://images.unsplash.com/photo-1622286346003-4526d9101127?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]
        },
        {
          id: "haircut-beard",
          icon: <User className="w-8 h-8" />,
          title: "Haircut + Beard",
          description: "Complete service of haircut and beard grooming with perfect finish",
          fullDescription: "Premium service that combines professional haircut with complete beard care. Includes trimming, cutting and finishing with specialized products.",
          price: "$800",
          duration: "45 min",
          images: ["https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]
        },
        {
          id: "color-dye",
          icon: <Sparkles className="w-8 h-8" />,
          title: "Color (Dye)",
          description: "Professional coloring to cover gray hair or completely change your look",
          fullDescription: "Complete coloring service with premium products. Includes hair analysis, professional application and post-color nourishing treatment.",
          price: "$1.750",
          duration: "60 min",
          images: ["https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]
        }
      ]
    }
  };

  const text = content[language as keyof typeof content];

  return (
    <section id="servicios" className="section-padding bg-muted/30">
      <div className="container-responsive">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            {text.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {text.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 max-w-5xl mx-auto">
          {text.services.map((service) => (
            <Card key={service.id} className="shadow-card hover:shadow-elegant transition-smooth hover-scale">
              <CardHeader className="text-center">
                <div className="text-copper mb-4 flex justify-center">
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button
                  onClick={() => setSelectedService(service)}
                  variant="outline"
                  className="btn-outline-copper w-full"
                >
                  {text.quickView}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-2xl">
          {selectedService && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                  <span className="text-copper">{selectedService.icon}</span>
                  {selectedService.title}
                </DialogTitle>
                <DialogDescription className="text-lg">
                  {selectedService.fullDescription}
                </DialogDescription>
              </DialogHeader>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ServicesSection;