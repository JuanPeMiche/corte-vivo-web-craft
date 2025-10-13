import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import barber1 from '@/assets/barber-1.jpg';
import barber2 from '@/assets/barber-2.jpg';
import barber3 from '@/assets/barber-3.jpg';
import barber4 from '@/assets/barber-4.jpg';

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
          image: barber1,
          experience: "8 años"
        },
        {
          id: "miguel",
          name: "Miguel Rodriguez",
          specialty: "Master en Fade & Degradé",
          image: barber2,
          experience: "6 años"
        },
        {
          id: "antonio",
          name: "Antonio Silva",
          specialty: "Afeitado Tradicional",
          image: barber3,
          experience: "12 años"
        },
        {
          id: "diego",
          name: "Diego Martinez",
          specialty: "Barber Artist",
          image: barber4,
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
          image: barber1,
          experience: "8 years"
        },
        {
          id: "miguel",
          name: "Miguel Rodriguez",
          specialty: "Fade & Gradient Master",
          image: barber2,
          experience: "6 years"
        },
        {
          id: "antonio",
          name: "Antonio Silva",
          specialty: "Traditional Shaving",
          image: barber3,
          experience: "12 years"
        },
        {
          id: "diego",
          name: "Diego Martinez",
          specialty: "Barber Artist",
          image: barber4,
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
          <Button 
            size="lg" 
            className="btn-copper"
            onClick={() => window.location.href = '/equipo'}
          >
            {text.meetTeam}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;