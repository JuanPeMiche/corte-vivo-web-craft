import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EstilosPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const styles = [
    {
      id: 1,
      name: "Fade Clásico",
      category: "fade",
      description: "Degradado perfecto desde la sien hacia arriba",
      beforeImage: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      afterImage: "https://images.unsplash.com/photo-1622286346003-4526d9101127?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Pompadour Moderno",
      category: "clasico",
      description: "Estilo vintage con toque contemporáneo",
      beforeImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      afterImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "Texturizado Urbano",
      category: "moderno",
      description: "Corte desestructurado con movimiento natural",
      beforeImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      afterImage: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      name: "Quiff Elegante",
      category: "clasico",
      description: "Volumen frontal con degradado lateral",
      beforeImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      afterImage: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      name: "Buzz Cut Estilizado",
      category: "corto",
      description: "Corte militar con precisión profesional",
      beforeImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      afterImage: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      name: "Rizo Definido",
      category: "rizado",
      description: "Potencia la textura natural del cabello rizado",
      beforeImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      afterImage: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const categories = [
    { value: 'all', label: 'Todos los estilos' },
    { value: 'fade', label: 'Degradados' },
    { value: 'clasico', label: 'Clásicos' },
    { value: 'moderno', label: 'Modernos' },
    { value: 'corto', label: 'Cortes cortos' },
    { value: 'rizado', label: 'Cabello rizado' }
  ];

  const filteredStyles = styles.filter(style => {
    const matchesSearch = style.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         style.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || style.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Galería de Estilos</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Descubre nuestra colección de cortes antes y después, inspiración para tu próximo look
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="section-padding bg-muted/30">
        <div className="container-responsive">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar estilos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Styles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStyles.map((style) => (
              <Card key={style.id} className="shadow-card hover:shadow-elegant transition-smooth hover-scale">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-center">{style.name}</CardTitle>
                  <CardDescription className="text-center">{style.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="text-center">
                      <p className="text-sm font-semibold text-copper mb-2">Antes</p>
                      <img
                        src={style.beforeImage}
                        alt={`${style.name} - antes`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-copper mb-2">Después</p>
                      <img
                        src={style.afterImage}
                        alt={`${style.name} - después`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                  </div>
                  <Button 
                    className="w-full btn-outline-copper"
                    onClick={() => navigate(`/estilos/${style.id}`)}
                  >
                    Ver detalles
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredStyles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No se encontraron estilos que coincidan con tu búsqueda</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EstilosPage;