import React from 'react';
import corte1 from '@/assets/corte-1.jpg';
import corte2 from '@/assets/corte-2.jpg';
import corte3 from '@/assets/corte-3.jpg';

interface StylesSectionProps {
  language: string;
}

const StylesSection: React.FC<StylesSectionProps> = ({ language }) => {
  const content = {
    es: {
      title: "Algunos de Nuestros Cortes Más Populares",
      styles: [
        { id: 1, image: corte1, alt: "Corte popular 1" },
        { id: 2, image: corte2, alt: "Corte popular 2" },
        { id: 3, image: corte3, alt: "Corte popular 3" }
      ]
    },
    en: {
      title: "Some of Our Most Popular Cuts",
      styles: [
        { id: 1, image: corte1, alt: "Popular cut 1" },
        { id: 2, image: corte2, alt: "Popular cut 2" },
        { id: 3, image: corte3, alt: "Popular cut 3" }
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {text.styles.map((style) => (
            <div 
              key={style.id} 
              className="overflow-hidden rounded-lg shadow-card hover:shadow-elegant transition-smooth hover-scale"
            >
              <img
                src={style.image}
                alt={style.alt}
                className="w-full h-96 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StylesSection;
