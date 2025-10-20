import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, Clock, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { useFormValidation } from '@/hooks/use-form-validation';
import { toast } from 'sonner';

interface ContactSectionProps {
  language: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ language }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reglas de validación
  const validationRules = {
    name: {
      required: true,
      minLength: 2,
      maxLength: 50,
      message: 'El nombre debe tener entre 2 y 50 caracteres'
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Por favor ingresa un email válido'
    },
    phone: {
      required: false,
      pattern: /^(\+598|598)?\s?[0-9]{8}$/,
      message: 'Por favor ingresa un teléfono uruguayo válido'
    },
    message: {
      required: true,
      minLength: 10,
      maxLength: 500,
      message: 'El mensaje debe tener entre 10 y 500 caracteres'
    }
  };

  const { errors, validateForm, clearFieldError } = useFormValidation(validationRules);

  const content = {
    es: {
      title: "Contacto",
      subtitle: "Visítanos o escríbenos",
      name: "Nombre",
      email: "Email", 
      phone: "Teléfono (opcional)",
      message: "Mensaje",
      send: "Enviar mensaje",
      sending: "Enviando...",
      success: "Mensaje enviado correctamente",
      error: "Error al enviar el mensaje",
      newsletter: "Suscríbete al newsletter",
      subscribe: "Suscribirse",
      address: "Av. 18 de Julio 1234, Montevideo",
      phoneContact: "+598 2XXX XXXX",
      emailContact: "info@asbarberia.uy",
      hours: "Lun-Vie: 9:00-19:00, Sáb: 9:00-17:00"
    },
    en: {
      title: "Contact",
      subtitle: "Visit us or write to us",
      name: "Name",
      email: "Email",
      phone: "Phone (optional)",
      message: "Message", 
      send: "Send message",
      sending: "Sending...",
      success: "Message sent successfully",
      error: "Error sending message",
      newsletter: "Subscribe to newsletter",
      subscribe: "Subscribe",
      address: "Av. 18 de Julio 1234, Montevideo",
      phoneContact: "+598 2XXX XXXX",
      emailContact: "info@asbarberia.uy",
      hours: "Mon-Fri: 9:00-19:00, Sat: 9:00-17:00"
    }
  };

  const text = content[language as keyof typeof content];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    clearFieldError(field);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm(formData)) {
      toast.error(text.error);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simular envío de email (aquí integrarías con tu backend)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success(text.success);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      toast.error(text.error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="contact-name">{text.name}</Label>
                  <Input 
                    id="contact-name" 
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder={text.name}
                    className={errors.name ? 'border-red-500' : ''}
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </div>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="contact-email">{text.email}</Label>
                  <Input 
                    id="contact-email" 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder={text.email}
                    className={errors.email ? 'border-red-500' : ''}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="contact-phone">{text.phone}</Label>
                  <Input 
                    id="contact-phone" 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+598 99 123 456"
                    className={errors.phone ? 'border-red-500' : ''}
                    disabled={isSubmitting}
                  />
                  {errors.phone && (
                    <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      {errors.phone}
                    </div>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="contact-message">{text.message}</Label>
                  <Textarea 
                    id="contact-message" 
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder={text.message} 
                    rows={4}
                    className={errors.message ? 'border-red-500' : ''}
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      {errors.message}
                    </div>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full btn-copper" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {text.sending}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      {text.send}
                    </div>
                  )}
                </Button>
              </form>
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
                  <p className="text-muted-foreground">{text.phoneContact}</p>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;