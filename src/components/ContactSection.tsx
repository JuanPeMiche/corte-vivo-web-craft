import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

interface ContactSectionProps {
  language: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ language }) => {
  const content = {
    es: {
      title: "Contacto",
      subtitle: "Visítanos o escríbenos",
      name: "Nombre",
      email: "Email", 
      message: "Mensaje",
      send: "Enviar mensaje",
      newsletter: "Suscríbete al newsletter",
      subscribe: "Suscribirse",
      address: "Av. 18 de Julio 1234, Montevideo",
      phone: "+598 2XXX XXXX",
      emailContact: "info@cortevivo.uy",
      hours: "Lun-Vie: 9:00-19:00, Sáb: 9:00-17:00"
    },
    en: {
      title: "Contact",
      subtitle: "Visit us or write to us",
      name: "Name",
      email: "Email",
      message: "Message", 
      send: "Send message",
      newsletter: "Subscribe to newsletter",
      subscribe: "Subscribe",
      address: "Av. 18 de Julio 1234, Montevideo",
      phone: "+598 2XXX XXXX",
      emailContact: "info@cortevivo.uy",
      hours: "Mon-Fri: 9:00-19:00, Sat: 9:00-17:00"
    }
  };

  const text = content[language as keyof typeof content];

  return (
    <section id="contacto" className="section-padding">
      <div className="container-responsive">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">{text.title}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{text.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>{text.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contact-name">{text.name}</Label>
                <Input id="contact-name" placeholder={text.name} />
              </div>
              <div>
                <Label htmlFor="contact-email">{text.email}</Label>
                <Input id="contact-email" type="email" placeholder={text.email} />
              </div>
              <div>
                <Label htmlFor="contact-message">{text.message}</Label>
                <Textarea id="contact-message" placeholder={text.message} rows={4} />
              </div>
              <Button className="w-full btn-copper">{text.send}</Button>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-copper mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Dirección</h4>
                  <p className="text-muted-foreground">{text.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-copper mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Teléfono</h4>
                  <p className="text-muted-foreground">{text.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-copper mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p className="text-muted-foreground">{text.emailContact}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-copper mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Horarios</h4>
                  <p className="text-muted-foreground">{text.hours}</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 p-6 rounded-lg">
              <h4 className="font-semibold mb-4">{text.newsletter}</h4>
              <div className="flex gap-2">
                <Input placeholder={text.email} className="flex-1" />
                <Button className="btn-copper">{text.subscribe}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;