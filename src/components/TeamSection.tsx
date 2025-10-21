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
      title: "Conoce a nuestro equipo y reserva tu turno con el que quieras!",
      subtitle: "Profesionales con pasión por el estilo - Haz clic en la foto para reservar tu turno",
      clickToBook: "Haz clic para reservar",
      team: [
        {
          id: "alexis",
          name: "Alexis Seijas",
          specialty: "Especialista en Cortes Modernos",
          image: lautaro,
          experience: "8 años",
          calendlyUrl: "https://calendly.com/asbarberiaa2025/45min?month=2025-10"
        },
        {
          id: "lautaro", 
          name: "Lautaro Sosa",
          specialty: "Master en Estilo & Diseño",
          image: alexis,
          experience: "6 años",
          calendlyUrl: "https://calendly.com/lautarojoaquinsosanavarro8/45min?month=2025-10"
        }
      ]
    },
    en: {
      title: "Meet our team and book your appointment with whoever you want!",
      subtitle: "Professionals with a passion for style - Click on the photo to book your appointment",
      clickToBook: "Click to book",
      team: [
        {
          id: "alexis",
          name: "Alexis Seijas",
          specialty: "Modern Cuts Specialist",
          image: lautaro,
          experience: "8 years",
          calendlyUrl: "https://calendly.com/asbarberiaa2025/45min?month=2025-10"
        },
        {
          id: "lautaro",
          name: "Lautaro Sosa",
          specialty: "Style & Design Master",
          image: alexis,
          experience: "6 years",
          calendlyUrl: "https://calendly.com/lautarojoaquinsosanavarro8/45min?month=2025-10"
        }
      ]
    }
  };

  const text = content[language as keyof typeof content];

  return (
    <section id="equipo" className="section-padding bg-muted/30">
      <div id="reserva"></div>
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
                  <a
                    href={member.calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block cursor-pointer group"
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-48 h-48 rounded-full mx-auto object-cover border-4 border-copper shadow-copper group-hover:border-charcoal transition-colors duration-300"
                    />
                    <div className="mt-4 text-sm text-copper font-semibold group-hover:text-charcoal transition-colors duration-300">
                      {text.clickToBook}
                    </div>
                  </a>
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-muted-foreground mb-2">{member.specialty}</p>
                <p className="text-sm text-copper font-semibold">{member.experience}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
