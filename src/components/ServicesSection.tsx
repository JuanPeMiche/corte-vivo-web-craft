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
      subtitle: "Experiencias únicas de barbería urbana",
      viewAll: "Ver todos los servicios",
      quickView: "Vista rápida",
      price: "Precio",
      duration: "Duración",
      services: [
        {
          id: "corte-clasico",
          icon: <Scissors className="w-8 h-8" />,
          title: "Corte Clásico",
          description: "Corte tradicional con técnicas clásicas de barbería",
          fullDescription: "Un corte atemporal que nunca pasa de moda. Utilizamos técnicas tradicionales de barbería combinadas con un toque moderno para crear un look elegante y sofisticado.",
          price: "$25",
          duration: "45 min",
          images: ["https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"]
        },
        {
          id: "fade-degrade",
          icon: <Zap className="w-8 h-8" />,
          title: "Fade & Degradé",
          description: "Cortes modernos con transiciones perfectas",
          fullDescription: "Técnicas de fade y degradé de última generación. Desde low fade hasta high fade, creamos transiciones suaves y precisas que definen tu estilo urbano.",
          price: "$30",
          duration: "50 min",
          images: ["https://images.unsplash.com/photo-1531297484001-80022131f5a1"]
        },
        {
          id: "afeitado-tradicional",
          icon: <ShoppingBag className="w-8 h-8" />,
          title: "Afeitado Tradicional",
          description: "Afeitado clásico con navaja y toalla caliente",
          fullDescription: "La experiencia completa de barbería clásica. Incluye preparación con toalla caliente, afeitado con navaja recta y tratamiento post-afeitado con productos premium.",
          price: "$20",
          duration: "30 min",
          images: ["https://images.unsplash.com/photo-1473091534298-04dcbce3278c"]
        },
        {
          id: "diseno-barba",
          icon: <User className="w-8 h-8" />,
          title: "Diseño de Barba",
          description: "Perfilado y diseño profesional de barba",
          fullDescription: "Diseño personalizado de barba según tu estilo y forma de rostro. Incluye perfilado, recorte preciso y tratamiento acondicionador.",
          price: "$18",
          duration: "35 min",
          images: ["https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"]
        },
        {
          id: "combo-grooming",
          icon: <Sparkles className="w-8 h-8" />,
          title: "Combo Grooming",
          description: "Corte + barba + masaje facial relajante",
          fullDescription: "La experiencia completa de grooming masculino. Incluye corte personalizado, diseño de barba, masaje facial revitalizante y tratamiento hidratante.",
          price: "$55",
          duration: "90 min",
          images: ["https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"]
        }
      ]
    },
    en: {
      title: "Our Services",
      subtitle: "Unique urban barbershop experiences",
      viewAll: "View all services",
      quickView: "Quick view",
      price: "Price",
      duration: "Duration",
      services: [
        {
          id: "classic-cut",
          icon: <Scissors className="w-8 h-8" />,
          title: "Classic Cut",
          description: "Traditional cut with classic barbershop techniques",
          fullDescription: "A timeless cut that never goes out of style. We use traditional barbershop techniques combined with a modern touch to create an elegant and sophisticated look.",
          price: "$25",
          duration: "45 min",
          images: ["https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"]
        },
        {
          id: "fade-gradient",
          icon: <Zap className="w-8 h-8" />,
          title: "Fade & Gradient",
          description: "Modern cuts with perfect transitions",
          fullDescription: "Latest generation fade and gradient techniques. From low fade to high fade, we create smooth and precise transitions that define your urban style.",
          price: "$30",
          duration: "50 min",
          images: ["https://images.unsplash.com/photo-1531297484001-80022131f5a1"]
        },
        {
          id: "traditional-shave",
          icon: <ShoppingBag className="w-8 h-8" />,
          title: "Traditional Shave",
          description: "Classic shave with razor and hot towel",
          fullDescription: "The complete classic barbershop experience. Includes hot towel preparation, straight razor shave and post-shave treatment with premium products.",
          price: "$20",
          duration: "30 min",
          images: ["https://images.unsplash.com/photo-1473091534298-04dcbce3278c"]
        },
        {
          id: "beard-design",
          icon: <User className="w-8 h-8" />,
          title: "Beard Design",
          description: "Professional beard styling and design",
          fullDescription: "Custom beard design according to your style and face shape. Includes profiling, precise trimming and conditioning treatment.",
          price: "$18",
          duration: "35 min",
          images: ["https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"]
        },
        {
          id: "grooming-combo",
          icon: <Sparkles className="w-8 h-8" />,
          title: "Grooming Combo",
          description: "Cut + beard + relaxing facial massage",
          fullDescription: "The complete male grooming experience. Includes personalized cut, beard design, revitalizing facial massage and moisturizing treatment.",
          price: "$55",
          duration: "90 min",
          images: ["https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"]
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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
                  className="btn-outline-copper"
                >
                  {text.quickView}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="btn-copper">
            {text.viewAll}
          </Button>
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
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="font-semibold text-copper">{text.price}</p>
                  <p className="text-2xl font-bold">{selectedService.price}</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="font-semibold text-copper">{text.duration}</p>
                  <p className="text-2xl font-bold">{selectedService.duration}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ServicesSection;