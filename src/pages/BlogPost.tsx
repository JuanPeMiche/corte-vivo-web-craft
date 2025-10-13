import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const BlogPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data - in a real app this would come from an API
  const post = {
    id: parseInt(id || '1'),
    title: "Tendencias en cortes masculinos 2025",
    category: "Tendencias",
    author: "Carlos Mendoza",
    date: "15 Enero 2025",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1622286346003-4526d9101127?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    content: [
      {
        type: "paragraph",
        text: "El 2025 llega con una revolución en el mundo del grooming masculino. Los cortes de cabello evolucionan hacia estilos que combinan la sofisticación clásica con toques modernos y funcionales, adaptándose al estilo de vida dinámico del hombre contemporáneo."
      },
      {
        type: "heading",
        text: "1. Fade Texturizado - La Nueva Evolución"
      },
      {
        type: "paragraph", 
        text: "El fade tradicional se reinventa con texturas más naturales y orgánicas. Los barberos están incorporando técnicas de corte que mantienen la estructura del degradado pero añaden movimiento y dimensión al cabello."
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Ejemplo de fade texturizado"
      },
      {
        type: "heading",
        text: "2. El Regreso del Pompadour Moderno"
      },
      {
        type: "paragraph",
        text: "Los cortes vintage vuelven con fuerza, especialmente el pompadour. Sin embargo, la versión 2025 es más suave y accesible, perfecta para el uso diario sin sacrificar la elegancia que caracteriza a este estilo clásico."
      },
      {
        type: "heading", 
        text: "3. Cortes Minimalistas y Funcionales"
      },
      {
        type: "paragraph",
        text: "La simplicidad es clave. Los cortes limpios, de fácil mantenimiento y que requieren poco producto están ganando popularidad entre profesionales que buscan verse impecables sin invertir mucho tiempo en el styling."
      },
      {
        type: "quote",
        text: "La barbería moderna no solo corta cabello, crea experiencias y fortalece la confianza de cada cliente.",
        author: "Carlos Mendoza, Master Barber"
      },
      {
        type: "heading",
        text: "Consejos para Elegir tu Estilo"
      },
      {
        type: "list",
        items: [
          "Considera la forma de tu rostro y tipo de cabello",
          "Piensa en tu rutina diaria y tiempo disponible para el styling",
          "Consulta con tu barbero sobre el mantenimiento requerido",
          "No tengas miedo de experimentar con variaciones del mismo corte"
        ]
      },
      {
        type: "paragraph",
        text: "En AS Barbería, nuestro equipo de expertos está preparado para ayudarte a encontrar el corte perfecto que se adapte a tu personalidad y estilo de vida. ¡Reserva tu cita y descubre tu nuevo look!"
      }
    ]
  };

  const relatedPosts = [
    {
      id: 2,
      title: "Cómo cuidar tu barba en verano",
      image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 3,
      title: "Productos esenciales para hombres",
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 5,
      title: "Cortes para cada tipo de rostro",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    }
  ];

  const renderContent = (item: any, index: number) => {
    switch (item.type) {
      case 'paragraph':
        return <p key={index} className="mb-6 text-muted-foreground leading-relaxed">{item.text}</p>;
      case 'heading':
        return <h2 key={index} className="text-2xl font-bold mb-4 mt-8 text-primary">{item.text}</h2>;
      case 'image':
        return (
          <div key={index} className="my-8">
            <img src={item.src} alt={item.alt} className="w-full h-64 object-cover rounded-lg shadow-card" />
          </div>
        );
      case 'quote':
        return (
          <blockquote key={index} className="my-8 p-6 bg-copper/10 border-l-4 border-copper rounded-r-lg">
            <p className="text-lg italic mb-2">"{item.text}"</p>
            <cite className="text-sm text-copper font-semibold">— {item.author}</cite>
          </blockquote>
        );
      case 'list':
        return (
          <ul key={index} className="mb-6 space-y-2">
            {item.items.map((listItem: string, listIndex: number) => (
              <li key={listIndex} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-copper rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground">{listItem}</span>
              </li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-white section-padding">
        <div className="container-responsive">
          <Button
            variant="ghost"
            onClick={() => navigate('/blog')}
            className="mb-6 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al blog
          </Button>
          <Badge variant="secondary" className="bg-copper text-white mb-4">
            {post.category}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-gray-300">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{post.readTime}</span>
            </div>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Share2 className="w-4 h-4 mr-2" />
              Compartir
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="w-full h-64 md:h-96 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="section-padding">
        <div className="container-responsive max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <article className="prose prose-lg max-w-none">
                {post.content.map((item, index) => renderContent(item, index))}
              </article>

              {/* Call to Action */}
              <Card className="mt-12 bg-copper/5 border-copper/20">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">¿Listo para tu nuevo corte?</h3>
                  <p className="text-muted-foreground mb-6">
                    Nuestros expertos barberos están listos para crear el look perfecto para ti
                  </p>
                  <Button 
                    className="btn-copper"
                    onClick={() => navigate('/#reserva')}
                  >
                    Reservar cita
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <h3 className="text-xl font-bold mb-6">Artículos Relacionados</h3>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <Card 
                      key={relatedPost.id} 
                      className="cursor-pointer hover:shadow-elegant transition-smooth"
                      onClick={() => navigate(`/blog/${relatedPost.id}`)}
                    >
                      <CardContent className="p-4">
                        <div className="flex gap-3">
                          <img
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                          />
                          <div>
                            <h4 className="font-semibold text-sm leading-tight hover:text-copper transition-smooth">
                              {relatedPost.title}
                            </h4>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;