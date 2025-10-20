import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import alexis from '@/assets/alexis.jpg';
import lautaro from '@/assets/lautaro.jpg';

interface TeamSectionProps {
  language: string;
}

const TeamSection: React.FC<TeamSectionProps> = ({ language }) => {
  const content = {
    es: {
      title: "Nuestro Equipo",
      subtitle: "Profesionales con pasión por el estilo",
      team: [
        {
          id: "alexis",
          name: "Alexis Seijas",
          specialty: "Especialista en Cortes Modernos",
          image: alexis,
          experience: "8 años"
        },
        {
          id: "lautaro",
          name: "Lautaro Sosa",
          specialty: "Master en Estilo & Diseño",
          image: lautaro,
          experience: "6 años"
        }
      ]
    },
    en: {
      title: "Our Team",
      subtitle: "Professionals with a passion for style",
      team: [
        {
          id: "alexis",
          name: "Alexis Seijas",
          specialty: "Modern Cuts Specialist",
          image: alexis,
          experience: "8 years"
        },
        {
          id: "lautaro",
          name: "Lautaro Sosa",
          specialty: "Style & Design Master",
          image: lautaro,
          experience: "6 years"
        }
      ]
    }
  };

  const text = content[language as keyof typeof content];

  return (
    <section id="equipo" className="section-padding bg-muted/30">
      <div className="container-responsive">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            {text.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {text.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {text.team.map((member) => (
            <Card key={member.id} className="text-center shadow-card hover:shadow-elegant transition-smooth hover-scale">
              <CardContent className="p-6">
                <div className="mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 rounded-full mx-auto object-cover border-4 border-copper shadow-copper"
                  />
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
