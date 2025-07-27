import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface BlogSectionProps {
  language: string;
}

const BlogSection: React.FC<BlogSectionProps> = ({ language }) => {
  const content = {
    es: {
      title: "Blog & Consejos",
      subtitle: "Tendencias y cuidado personal masculino",
      readMore: "Leer más",
      viewAll: "Ver más artículos",
      posts: [
        {
          title: "Tendencias en cortes 2025",
          excerpt: "Descubre los estilos que marcarán el próximo año",
          image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
          date: "15 Dic 2024",
          author: "Carlos Mendoza"
        },
        {
          title: "Cómo cuidar tu barba en verano",
          excerpt: "Tips esenciales para mantener tu barba perfecta",
          image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
          date: "10 Dic 2024", 
          author: "Antonio Silva"
        },
        {
          title: "Productos esenciales para hombres",
          excerpt: "Los must-have para tu rutina de grooming",
          image: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c",
          date: "5 Dic 2024",
          author: "Miguel Rodriguez"
        }
      ]
    },
    en: {
      title: "Blog & Tips",
      subtitle: "Men's trends and personal care",
      readMore: "Read more",
      viewAll: "View more articles",
      posts: [
        {
          title: "2025 Haircut Trends",
          excerpt: "Discover the styles that will define next year",
          image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
          date: "Dec 15, 2024",
          author: "Carlos Mendoza"
        },
        {
          title: "Summer Beard Care",
          excerpt: "Essential tips to keep your beard perfect",
          image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
          date: "Dec 10, 2024",
          author: "Antonio Silva"
        },
        {
          title: "Essential Products for Men",
          excerpt: "Must-haves for your grooming routine",
          image: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c",
          date: "Dec 5, 2024",
          author: "Miguel Rodriguez"
        }
      ]
    }
  };

  const text = content[language as keyof typeof content];

  return (
    <section id="blog" className="section-padding bg-muted/30">
      <div className="container-responsive">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">{text.title}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{text.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {text.posts.map((post, index) => (
            <Card key={index} className="shadow-card hover:shadow-elegant transition-smooth hover-scale">
              <div className="overflow-hidden rounded-t-lg">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              </div>
              <CardHeader>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                </div>
                <CardTitle className="text-xl">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <Button 
                  variant="outline" 
                  className="btn-outline-copper"
                  onClick={() => window.location.href = `/blog/${index + 1}`}
                >
                  {text.readMore} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="btn-copper"
            onClick={() => window.location.href = '/blog'}
          >
            {text.viewAll}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;