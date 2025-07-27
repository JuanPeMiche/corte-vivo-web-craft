import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface StylesSectionProps {
  language: string;
}

const StylesSection: React.FC<StylesSectionProps> = ({ language }) => {
  const content = {
    es: {
      title: "Estilos Destacados",
      subtitle: "Nuestros cortes y barbas más populares",
      viewStyle: "Ver estilo",
      viewMore: "Ver más estilos",
      styles: [
        {
          id: "fade-moderno",
          name: "Fade Moderno",
          image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          description: "Degradado perfecto con líneas definidas"
        },
        {
          id: "clasico-elegante",
          name: "Clásico Elegante",
          image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          description: "Estilo atemporal para el hombre sofisticado"
        },
        {
          id: "barba-full",
          name: "Barba Full",
          image: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          description: "Barba completa con perfilado profesional"
        },
        {
          id: "undercut-textured",
          name: "Undercut Texturizado",
          image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          description: "Corte urbano con textura y movimiento"
        }
      ]
    },
    en: {
      title: "Featured Styles",
      subtitle: "Our most popular cuts and beards",
      viewStyle: "View style",
      viewMore: "View more styles",
      styles: [
        {
          id: "modern-fade",
          name: "Modern Fade",
          image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          description: "Perfect gradient with defined lines"
        },
        {
          id: "elegant-classic",
          name: "Elegant Classic",
          image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          description: "Timeless style for the sophisticated man"
        },
        {
          id: "full-beard",
          name: "Full Beard",
          image: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          description: "Complete beard with professional styling"
        },
        {
          id: "textured-undercut",
          name: "Textured Undercut",
          image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          description: "Urban cut with texture and movement"
        }
      ]
    }
  };

  const text = content[language as keyof typeof content];

  return (
    <section id="estilos" className="section-padding">
      <div className="container-responsive">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            {text.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {text.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {text.styles.map((style) => (
            <Card key={style.id} className="group overflow-hidden shadow-card hover:shadow-elegant transition-smooth">
              <div className="relative overflow-hidden">
                <img
                  src={style.image}
                  alt={style.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-smooth"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white text-white hover:bg-white hover:text-primary"
                    onClick={() => window.location.href = `/estilos/${style.id}`}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {text.viewStyle}
                  </Button>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{style.name}</h3>
                <p className="text-muted-foreground">{style.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="btn-copper"
            onClick={() => window.location.href = '/estilos'}
          >
            {text.viewMore}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StylesSection;