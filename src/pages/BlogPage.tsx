import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Search, Calendar, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BlogPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const posts = [
    {
      id: 1,
      title: "Tendencias en cortes masculinos 2025",
      category: "tendencias",
      excerpt: "Descubre los estilos que dominarán este año: desde fades texturizados hasta cortes clásicos renovados.",
      image: "https://images.unsplash.com/photo-1622286346003-4526d9101127?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author: "Carlos Mendoza",
      date: "15 Enero 2025",
      readTime: "5 min"
    },
    {
      id: 2,
      title: "Cómo cuidar tu barba en verano",
      category: "cuidado",
      excerpt: "Tips esenciales para mantener tu barba hidratada y con buen aspecto durante los meses más calurosos.",
      image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author: "Miguel Rodriguez",
      date: "12 Enero 2025",
      readTime: "7 min"
    },
    {
      id: 3,
      title: "Productos esenciales para hombres",
      category: "productos",
      excerpt: "La guía completa de productos de grooming que todo hombre debería tener en su rutina diaria.",
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author: "Antonio Silva",
      date: "8 Enero 2025",
      readTime: "6 min"
    },
    {
      id: 4,
      title: "El arte del afeitado clásico",
      category: "tecnicas",
      excerpt: "Redescubre la experiencia del afeitado tradicional con navaja y aprende las técnicas de los maestros barberos.",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author: "Diego Martinez",
      date: "5 Enero 2025",
      readTime: "8 min"
    },
    {
      id: 5,
      title: "Cortes para cada tipo de rostro",
      category: "consejos",
      excerpt: "Encuentra el corte perfecto según la forma de tu cara y potencia tus mejores características.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author: "Carlos Mendoza",
      date: "2 Enero 2025",
      readTime: "4 min"
    },
    {
      id: 6,
      title: "Historia de la barbería moderna",
      category: "cultura",
      excerpt: "Un viaje por la evolución de la barbería desde sus orígenes hasta convertirse en un símbolo de estilo masculino.",
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author: "Miguel Rodriguez",
      date: "28 Diciembre 2024",
      readTime: "10 min"
    }
  ];

  const categories = [
    { value: 'all', label: 'Todos los artículos' },
    { value: 'tendencias', label: 'Tendencias' },
    { value: 'cuidado', label: 'Cuidado' },
    { value: 'productos', label: 'Productos' },
    { value: 'tecnicas', label: 'Técnicas' },
    { value: 'consejos', label: 'Consejos' },
    { value: 'cultura', label: 'Cultura' }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog & Consejos</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Consejos expertos, tendencias y todo lo que necesitas saber sobre el mundo del grooming masculino
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
                placeholder="Buscar artículos..."
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

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="shadow-card hover:shadow-elegant transition-smooth hover-scale">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-smooth"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span className="bg-copper/10 text-copper px-2 py-1 rounded-full text-xs font-medium">
                      {categories.find(cat => cat.value === post.category)?.label}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  <CardTitle className="text-xl font-bold hover:text-copper transition-smooth cursor-pointer">
                    {post.title}
                  </CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full btn-outline-copper"
                    onClick={() => navigate(`/blog/${post.id}`)}
                  >
                    Leer más
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No se encontraron artículos que coincidan con tu búsqueda</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;