import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Star, Award, Clock, Quote } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EquipoPage = () => {
  const navigate = useNavigate();

  const teamMembers = [
    {
      id: 1,
      name: "Carlos Mendoza",
      role: "Master Barber & Fundador",
      specialty: "Cortes clásicos y degradados",
      experience: "12 años",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.9,
      certifications: ["Master Barber Certified", "Straight Razor Specialist", "Hair Color Expert"],
      bio: "Carlos fundó CorteVivo con la visión de crear un espacio donde el arte tradicional de la barbería se encontrara con las técnicas modernas. Su experiencia de 12 años y su pasión por la perfección lo han convertido en uno de los barberos más reconocidos de la ciudad.",
      testimonials: [
        {
          client: "Ricardo M.",
          text: "Carlos tiene una precisión increíble. Cada corte es una obra de arte."
        },
        {
          client: "Andrés P.",
          text: "Llevo 3 años viniendo con Carlos. Nunca me decepciona."
        }
      ],
      availability: "Lun-Vie: 9:00-18:00, Sáb: 9:00-16:00"
    },
    {
      id: 2,
      name: "Miguel Rodriguez",
      role: "Senior Barber",
      specialty: "Diseño de barba y afeitado clásico",
      experience: "8 años",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      certifications: ["Traditional Shaving Master", "Beard Design Specialist", "Men's Grooming Expert"],
      bio: "Miguel es nuestro experto en afeitado tradicional y diseño de barba. Su técnica con la navaja es excepcional y su conocimiento en productos de grooming masculino es inigualable. Cada cliente sale no solo con un gran corte, sino con consejos valiosos para el cuidado diario.",
      testimonials: [
        {
          client: "Fernando L.",
          text: "El mejor afeitado de mi vida. Miguel es un verdadero artista."
        },
        {
          client: "Jorge S.",
          text: "Mi barba nunca se había visto mejor. Excelente trabajo."
        }
      ],
      availability: "Mar-Sáb: 10:00-19:00"
    },
    {
      id: 3,
      name: "Antonio Silva",
      role: "Barber Artist",
      specialty: "Cortes modernos y coloración",
      experience: "6 años",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.7,
      certifications: ["Creative Hair Design", "Color Specialist", "Trend Forecasting"],
      bio: "Antonio aporta creatividad y vanguardia al equipo. Especializado en cortes modernos y técnicas de coloración, es el barbero ideal para quienes buscan un cambio radical o seguir las últimas tendencias. Su ojo para el detalle y su creatividad lo distinguen.",
      testimonials: [
        {
          client: "David R.",
          text: "Antonio entendió exactamente lo que buscaba. Corte perfecto."
        },
        {
          client: "Manuel T.",
          text: "Excelente atención y resultado. Muy profesional."
        }
      ],
      availability: "Lun-Vie: 11:00-20:00"
    },
    {
      id: 4,
      name: "Diego Martinez",
      role: "Junior Barber",
      specialty: "Cortes juveniles y mantenimiento",
      experience: "3 años",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.6,
      certifications: ["Certified Barber", "Youth Styling Specialist"],
      bio: "Diego es el más joven de nuestro equipo pero no le falta talento ni dedicación. Se especializa en cortes juveniles y es excelente para el mantenimiento de estilos. Su energía y frescura conectan especialmente bien con clientes jóvenes.",
      testimonials: [
        {
          client: "Pablo J.",
          text: "Diego siempre está al día con las últimas tendencias. Genial."
        },
        {
          client: "Sebastián K.",
          text: "Muy buen barbero, ambiente relajado y buen precio."
        }
      ],
      availability: "Mié-Dom: 12:00-20:00"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-white section-padding">
        <div className="container-responsive">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nuestro Equipo</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Conoce a los maestros barberos que hacen posible la experiencia CorteVivo
          </p>
        </div>
      </div>

      {/* Team Members */}
      <div className="section-padding">
        <div className="container-responsive">
          <div className="space-y-16">
            {teamMembers.map((member) => (
              <div key={member.id} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Member Photo and Basic Info */}
                <div className="lg:col-span-1">
                  <Card className="shadow-card">
                    <div className="aspect-square overflow-hidden rounded-t-lg">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="text-center">
                      <CardTitle className="text-xl">{member.name}</CardTitle>
                      <CardDescription className="text-copper font-semibold">
                        {member.role}
                      </CardDescription>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">{member.rating}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-1">Especialidad</p>
                        <p className="font-medium">{member.specialty}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-1">Experiencia</p>
                        <p className="font-medium">{member.experience}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-2">Horarios</p>
                        <p className="text-xs bg-muted p-2 rounded">{member.availability}</p>
                      </div>
                      <Button 
                        className="w-full btn-copper"
                        onClick={() => navigate('/#reserva')}
                      >
                        Reservar con {member.name.split(' ')[0]}
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Member Details */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Bio */}
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-copper" />
                        Biografía
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
                    </CardContent>
                  </Card>

                  {/* Certifications */}
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-copper" />
                        Certificaciones
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {member.certifications.map((cert, index) => (
                          <Badge key={index} variant="secondary" className="bg-copper/10 text-copper">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Testimonials */}
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Quote className="w-5 h-5 text-copper" />
                        Testimonios de Clientes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {member.testimonials.map((testimonial, index) => (
                          <div key={index} className="bg-muted/50 p-4 rounded-lg">
                            <p className="text-muted-foreground italic mb-2">"{testimonial.text}"</p>
                            <p className="text-sm font-semibold text-copper">— {testimonial.client}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <Card className="mt-16 bg-copper/5 border-copper/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">¿Listo para la experiencia CorteVivo?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Nuestro equipo de expertos está preparado para brindarte el mejor servicio de barbería. 
                Reserva tu cita y descubre por qué somos los mejores.
              </p>
              <Button 
                className="btn-copper mr-4"
                onClick={() => navigate('/#reserva')}
              >
                Reservar cita
              </Button>
              <Button 
                variant="outline"
                className="btn-outline-copper"
                onClick={() => navigate('/#contacto')}
              >
                Contactanos
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EquipoPage;