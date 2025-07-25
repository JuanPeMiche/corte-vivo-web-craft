import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TeamSectionProps {
  language: string;
}

const TeamSection: React.FC<TeamSectionProps> = ({ language }) => {
  const content = {
    es: {
      title: "Nuestro Equipo",
      subtitle: "Barberos expertos con pasión por el estilo",
      meetTeam: "Conoce a todo el equipo",
      team: [
        {
          id: "carlos",
          name: "Carlos Mendoza",
          specialty: "Especialista en Cortes Clásicos",
          image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          experience: "8 años"
        },
        {
          id: "miguel",
          name: "Miguel Rodriguez",
          specialty: "Master en Fade & Degradé",
          image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          experience: "6 años"
        },
        {
          id: "antonio",
          name: "Antonio Silva",
          specialty: "Afeitado Tradicional",
          image: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          experience: "12 años"
        },
        {
          id: "diego",
          name: "Diego Martinez",
          specialty: "Barber Artist",
          image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          experience: "5 años"
        }
      ]
    },
    en: {
      title: "Our Team",
      subtitle: "Expert barbers with a passion for style",
      meetTeam: "Meet the entire team",
      team: [
        {
          id: "carlos",
          name: "Carlos Mendoza",
          specialty: "Classic Cuts Specialist",
          image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          experience: "8 years"
        },
        {
          id: "miguel",
          name: "Miguel Rodriguez",
          specialty: "Fade & Gradient Master",
          image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          experience: "6 years"
        },
        {
          id: "antonio",
          name: "Antonio Silva",
          specialty: "Traditional Shaving",
          image: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          experience: "12 years"
        },
        {
          id: "diego",
          name: "Diego Martinez",
          specialty: "Barber Artist",
          image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          experience: "5 years"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {text.team.map((member) => (
            <Card key={member.id} className="text-center shadow-card hover:shadow-elegant transition-smooth hover-scale">
              <CardContent className="p-6">
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-copper shadow-copper"
                  />
                  <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-copper text-white">
                    {member.experience}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-copper font-semibold mb-4">{member.specialty}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="btn-copper">
            {text.meetTeam}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;