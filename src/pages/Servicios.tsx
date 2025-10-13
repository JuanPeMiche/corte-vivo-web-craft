import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft, Clock, Camera } from 'lucide-react';
import Navigation from '@/components/Navigation';

const Servicios: React.FC = () => {
  const [language, setLanguage] = useState('es');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const content = {
    es: {
      title: "Todos Nuestros Servicios",
      subtitle: "Descubre la gama completa de servicios premium de AS Barbería",
      backHome: "Volver al inicio",
      filters: {
        all: "Todos",
        corte: "Cortes",
        color: "Color",
        combo: "Combos"
      },
      services: [
        {
          id: 1,
          name: "Corte",
          category: "corte",
          description: "Corte profesional adaptado a tu estilo personal y forma del rostro. Utilizamos técnicas modernas y clásicas para lograr el look perfecto.",
          fullDescription: "Nuestro servicio de corte incluye consulta personalizada, lavado con productos premium, corte con tijeras y/o máquina según tu preferencia, y peinado final. Cada corte se adapta a tu tipo de cabello y forma de rostro para garantizar el mejor resultado.",
          image: "https://images.unsplash.com/photo-1622286346003-4526d9101127?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          price: "$500",
          duration: "30 min",
          gallery: [
            "https://images.unsplash.com/photo-1622286346003-4526d9101127?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1618495850296-9123b0475fb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          ]
        },
        {
          id: 2,
          name: "Corte + Barba",
          category: "combo",
          description: "Servicio completo de corte y arreglo de barba con acabado perfecto. La combinación ideal para un look completo.",
          fullDescription: "Este servicio premium combina nuestro corte profesional con un cuidado completo de barba. Incluye perfilado, recorte, hidratación y acabado con productos especializados. El resultado es un look equilibrado y profesional.",
          image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          price: "$800",
          duration: "45 min",
          gallery: [
            "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          ]
        },
        {
          id: 3,
          name: "Color (Tinte)",
          category: "color",
          description: "Coloración profesional para cubrir canas o cambiar tu look completamente. Productos de alta calidad y técnicas avanzadas.",
          fullDescription: "Servicio completo de coloración con productos premium. Incluye análisis del cabello, aplicación profesional del tinte, tratamiento nutritivo post-color y peinado final. Ideal para cubrir canas o experimentar con nuevos tonos.",
          image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          price: "$1.750",
          duration: "60 min",
          gallery: [
            "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          ]
        }
      ],
      viewDetails: "Ver detalles",
      bookNow: "Reservar ahora"
    },
    en: {
      title: "All Our Services",
      subtitle: "Discover the complete range of premium services at AS Barbería",
      backHome: "Back to home",
      filters: {
        all: "All",
        corte: "Haircuts",
        color: "Color",
        combo: "Combos"
      },
      services: [
        {
          id: 1,
          name: "Haircut",
          category: "corte",
          description: "Professional cut adapted to your personal style and face shape. We use modern and classic techniques to achieve the perfect look.",
          fullDescription: "Our haircut service includes personalized consultation, washing with premium products, cutting with scissors and/or machine according to your preference, and final styling. Each cut is adapted to your hair type and face shape to guarantee the best result.",
          image: "https://images.unsplash.com/photo-1622286346003-4526d9101127?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          price: "$500",
          duration: "30 min",
          gallery: [
            "https://images.unsplash.com/photo-1622286346003-4526d9101127?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1618495850296-9123b0475fb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          ]
        },
        {
          id: 2,
          name: "Haircut + Beard",
          category: "combo",
          description: "Complete service of haircut and beard grooming with perfect finish. The ideal combination for a complete look.",
          fullDescription: "This premium service combines our professional haircut with complete beard care. Includes trimming, cutting, hydration and finishing with specialized products. The result is a balanced and professional look.",
          image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          price: "$800",
          duration: "45 min",
          gallery: [
            "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          ]
        },
        {
          id: 3,
          name: "Color (Dye)",
          category: "color",
          description: "Professional coloring to cover gray hair or completely change your look. High quality products and advanced techniques.",
          fullDescription: "Complete coloring service with premium products. Includes hair analysis, professional dye application, post-color nourishing treatment and final styling. Ideal for covering gray hair or experimenting with new tones.",
          image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          price: "$1.750",
          duration: "60 min",
          gallery: [
            "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          ]
        }
      ],
      viewDetails: "View details",
      bookNow: "Book now"
    }
  };

  const text = content[language as keyof typeof content];

  const filteredServices = selectedFilter === 'all' 
    ? text.services 
    : text.services.filter(service => service.category === selectedFilter);

  const handleBooking = () => {
    window.location.href = '/#reserva';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation language={language} onLanguageChange={setLanguage} />
      
      <div className="section-padding container-responsive">
        {/* Header */}
        <div className="text-center mb-12">
          <Button 
            variant="ghost" 
            className="mb-8 text-copper hover:text-copper/80"
            onClick={() => window.location.href = '/'}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {text.backHome}
          </Button>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            {text.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {text.subtitle}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(text.filters).map(([key, label]) => (
            <Button
              key={key}
              variant={selectedFilter === key ? "default" : "outline"}
              className={selectedFilter === key ? "bg-copper hover:bg-copper/90" : "border-copper text-copper hover:bg-copper hover:text-white"}
              onClick={() => setSelectedFilter(key)}
            >
              {label}
            </Button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredServices.map((service) => (
            <Card key={service.id} className="overflow-hidden shadow-card hover:shadow-elegant transition-smooth hover-scale">
              <div className="relative h-64">
                <img 
                  src={service.image} 
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 right-4 bg-copper text-white">
                  {service.category}
                </Badge>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-primary">{service.name}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-3xl font-bold text-copper">{service.price}</span>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{service.duration}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex-1 border-copper text-copper hover:bg-copper hover:text-white">
                        <Camera className="w-4 h-4 mr-2" />
                        {text.viewDetails}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl text-primary">{service.name}</DialogTitle>
                        <DialogDescription className="text-lg">
                          {service.fullDescription}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                        {service.gallery.map((image, index) => (
                          <div key={index} className="aspect-square rounded-lg overflow-hidden">
                            <img 
                              src={image} 
                              alt={`${service.name} ${index + 1}`}
                              className="w-full h-full object-cover hover:scale-105 transition-smooth"
                            />
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center mt-6 p-4 bg-muted rounded-lg">
                        <div>
                          <span className="text-2xl font-bold text-copper">{service.price}</span>
                          <div className="flex items-center text-muted-foreground mt-1">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{service.duration}</span>
                          </div>
                        </div>
                        <Button 
                          className="btn-copper"
                          onClick={handleBooking}
                        >
                          {text.bookNow}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    className="flex-1 btn-copper"
                    onClick={handleBooking}
                  >
                    {text.bookNow}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Servicios;