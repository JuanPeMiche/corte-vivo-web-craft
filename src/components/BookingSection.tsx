import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon, Clock, CreditCard } from 'lucide-react';

interface BookingSectionProps {
  language: string;
}

const BookingSection: React.FC<BookingSectionProps> = ({ language }) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [step, setStep] = useState(1);

  const content = {
    es: {
      title: "Reserva tu Turno",
      subtitle: "Agenda tu cita en simples pasos",
      service: "Servicio",
      barber: "Barbero",
      dateTime: "Fecha y Hora",
      contact: "Contacto",
      payment: "Pago",
      confirm: "Confirmar Reserva",
      name: "Nombre completo",
      email: "Email",
      phone: "Teléfono",
      paymentMethod: "Método de pago",
      inStore: "En el local",
      online: "Pago en línea",
      tip: "Propina",
      noTip: "Sin propina",
      services: ["Corte Clásico", "Fade & Degradé", "Afeitado Tradicional", "Diseño de Barba", "Combo Grooming"],
      barbers: ["Carlos Mendoza", "Miguel Rodriguez", "Antonio Silva", "Diego Martinez"]
    },
    en: {
      title: "Book Your Appointment",
      subtitle: "Schedule your appointment in simple steps",
      service: "Service",
      barber: "Barber",
      dateTime: "Date & Time",
      contact: "Contact",
      payment: "Payment",
      confirm: "Confirm Booking",
      name: "Full name",
      email: "Email",
      phone: "Phone",
      paymentMethod: "Payment method",
      inStore: "In store",
      online: "Online payment",
      tip: "Tip",
      noTip: "No tip",
      services: ["Classic Cut", "Fade & Gradient", "Traditional Shave", "Beard Design", "Grooming Combo"],
      barbers: ["Carlos Mendoza", "Miguel Rodriguez", "Antonio Silva", "Diego Martinez"]
    }
  };

  const text = content[language as keyof typeof content];

  return (
    <section id="reserva" className="section-padding">
      <div className="container-responsive">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            {text.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {text.subtitle}
          </p>
        </div>

        <Card className="max-w-2xl mx-auto shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-copper" />
              {text.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="service">{text.service}</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={`${text.service}...`} />
                  </SelectTrigger>
                  <SelectContent>
                    {text.services.map((service) => (
                      <SelectItem key={service} value={service}>{service}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="barber">{text.barber}</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={`${text.barber}...`} />
                  </SelectTrigger>
                  <SelectContent>
                    {text.barbers.map((barber) => (
                      <SelectItem key={barber} value={barber}>{barber}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="name">{text.name}</Label>
                <Input id="name" placeholder={text.name} />
              </div>
              <div>
                <Label htmlFor="email">{text.email}</Label>
                <Input id="email" type="email" placeholder={text.email} />
              </div>
              <div>
                <Label htmlFor="phone">{text.phone}</Label>
                <Input id="phone" placeholder={text.phone} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>{text.paymentMethod}</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={text.paymentMethod} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="store">{text.inStore}</SelectItem>
                    <SelectItem value="online">{text.online}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>{text.tip}</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={text.tip} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">{text.noTip}</SelectItem>
                    <SelectItem value="5">5%</SelectItem>
                    <SelectItem value="10">10%</SelectItem>
                    <SelectItem value="custom">Otro monto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button className="w-full btn-copper text-lg py-6">
              <CreditCard className="w-5 h-5 mr-2" />
              {text.confirm}
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BookingSection;