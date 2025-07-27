import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Scissors, Star } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const EstiloDetalle = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data - in a real app this would come from an API
  const styleDetails = {
    id: parseInt(id || '1'),
    name: "Fade Clásico",
    category: "Degradados",
    description: "Degradado perfecto desde la sien hacia arriba con transición suave y acabado impecable",
    duration: "45 min",
    difficulty: "Intermedio",
    rating: 4.8,
    beforeImage: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1622286346003-4526d9101127?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    fullDescription: "El fade clásico es uno de nuestros cortes más solicitados. Se caracteriza por una transición gradual desde el cabello más largo en la parte superior hasta el más corto en los laterales y la nuca. Este estilo es versátil y funciona con diferentes tipos de cabello y formas de rostro.",
    variants: [
      "High Fade - Degradado alto",
      "Mid Fade - Degradado medio", 
      "Low Fade - Degradado bajo",
      "Skin Fade - Degradado a navaja"
    ],
    recommendedProducts: [
      "Pomada mate para textura",
      "Cera de fijación media",
      "Spray texturizante",
      "Champú revitalizante"
    ],
    careInstructions: [
      "Lavar con champú específico para hombre 2-3 veces por semana",
      "Aplicar una pequeña cantidad de producto con el cabello húmedo",
      "Peinar hacia atrás o al costado según preferencia",
      "Retocar cada 3-4 semanas para mantener el degradado"
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-white section-padding">
        <div className="container-responsive">
          <Button
            variant="ghost"
            onClick={() => navigate('/estilos')}
            className="mb-6 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a estilos
          </Button>
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-copper text-white">
                  {styleDetails.category}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{styleDetails.rating}</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{styleDetails.name}</h1>
              <p className="text-xl text-gray-300 mb-6">{styleDetails.description}</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-copper" />
                  <span>{styleDetails.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Scissors className="w-5 h-5 text-copper" />
                  <span>{styleDetails.difficulty}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="section-padding">
        <div className="container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Before & After Images */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Antes y Después</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-copper mb-2 text-center">Antes</p>
                  <img
                    src={styleDetails.beforeImage}
                    alt="Antes del corte"
                    className="w-full h-64 object-cover rounded-lg shadow-card"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-copper mb-2 text-center">Después</p>
                  <img
                    src={styleDetails.afterImage}
                    alt="Después del corte"
                    className="w-full h-64 object-cover rounded-lg shadow-card"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Descripción Completa</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {styleDetails.fullDescription}
              </p>
              <Button 
                className="btn-copper"
                onClick={() => navigate('/#reserva')}
              >
                Reservar este estilo
              </Button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Variants */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Variantes Disponibles</CardTitle>
                <CardDescription>Diferentes opciones del mismo estilo</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {styleDetails.variants.map((variant, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-copper rounded-full"></div>
                      <span className="text-sm">{variant}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Recommended Products */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Productos Recomendados</CardTitle>
                <CardDescription>Para mantener el estilo en casa</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {styleDetails.recommendedProducts.map((product, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-copper rounded-full"></div>
                      <span className="text-sm">{product}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Care Instructions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Cuidados en Casa</CardTitle>
                <CardDescription>Mantén tu corte impecable</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {styleDetails.careInstructions.map((instruction, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-copper rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{instruction}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstiloDetalle;