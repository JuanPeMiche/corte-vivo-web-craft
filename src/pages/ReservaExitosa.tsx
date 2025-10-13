import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Calendar, MapPin, Phone, Mail, ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';

const ReservaExitosa: React.FC = () => {
  const [language, setLanguage] = useState('es');

  const content = {
    es: {
      title: "¡Reserva Confirmada!",
      subtitle: "Tu cita ha sido reservada exitosamente",
      reservationCode: "Código de Reserva",
      appointmentDetails: "Detalles de tu Cita",
      service: "Servicio",
      barber: "Barbero",
      date: "Fecha",
      time: "Hora",
      total: "Total",
      location: "Ubicación",
      contact: "Contacto",
      addToCalendar: "Agregar al Calendario",
      viewLocation: "Ver Ubicación",
      backHome: "Volver al Inicio",
      sampleData: {
        code: "CV-2025-001",
        service: "Corte + Barba",
        barber: "Carlos Mendoza",
        date: "15 de Febrero, 2025",
        time: "14:30",
        total: "$1.800",
        address: "Av. 18 de Julio 1234, Montevideo",
        phone: "+598 2xxx xxxx",
        email: "info@asbarberia.uy"
      },
      thanks: "Gracias por elegir AS Barbería. Te esperamos para brindarte la mejor experiencia de grooming."
    },
    en: {
      title: "Booking Confirmed!",
      subtitle: "Your appointment has been successfully booked",
      reservationCode: "Reservation Code",
      appointmentDetails: "Your Appointment Details",
      service: "Service",
      barber: "Barber",
      date: "Date",
      time: "Time",
      total: "Total",
      location: "Location",
      contact: "Contact",
      addToCalendar: "Add to Calendar",
      viewLocation: "View Location",
      backHome: "Back to Home",
      sampleData: {
        code: "CV-2025-001",
        service: "Haircut + Beard",
        barber: "Carlos Mendoza",
        date: "February 15, 2025",
        time: "2:30 PM",
        total: "$1.800",
        address: "Av. 18 de Julio 1234, Montevideo",
        phone: "+598 2xxx xxxx",
        email: "info@asbarberia.uy"
      },
      thanks: "Thank you for choosing AS Barbería. We look forward to providing you with the best grooming experience."
    }
  };

  const text = content[language as keyof typeof content];

  const generateCalendarLink = () => {
    const event = {
      title: `AS Barbería - ${text.sampleData.service}`,
      start: '20250215T143000',
      end: '20250215T151500',
      description: `Cita en AS Barbería. Servicio: ${text.sampleData.service}. Barbero: ${text.sampleData.barber}`,
      location: text.sampleData.address
    };
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    window.open(calendarUrl, '_blank');
  };

  const openMaps = () => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(text.sampleData.address)}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation language={language} onLanguageChange={setLanguage} />
      
      <div className="section-padding container-responsive">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <CheckCircle className="w-20 h-20 text-copper" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
              {text.title}
            </h1>
            <p className="text-xl text-muted-foreground">
              {text.subtitle}
            </p>
          </div>

          {/* Reservation Code */}
          <Card className="mb-8 border-copper/20">
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground mb-2">{text.reservationCode}</p>
              <p className="text-3xl font-bold text-copper tracking-wider">
                {text.sampleData.code}
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Appointment Details */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <Calendar className="w-5 h-5 mr-2" />
                  {text.appointmentDetails}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{text.service}:</span>
                  <span className="font-semibold">{text.sampleData.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{text.barber}:</span>
                  <span className="font-semibold">{text.sampleData.barber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{text.date}:</span>
                  <span className="font-semibold">{text.sampleData.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{text.time}:</span>
                  <span className="font-semibold">{text.sampleData.time}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">{text.total}:</span>
                    <span className="text-2xl font-bold text-copper">{text.sampleData.total}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location & Contact */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <MapPin className="w-5 h-5 mr-2" />
                  {text.location} & {text.contact}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-muted-foreground mb-1">{text.location}:</p>
                  <p className="font-semibold">{text.sampleData.address}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">{text.contact}:</p>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-copper" />
                      <span>{text.sampleData.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-copper" />
                      <span>{text.sampleData.email}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <Button 
              onClick={generateCalendarLink}
              className="btn-copper"
              size="lg"
            >
              <Calendar className="w-5 h-5 mr-2" />
              {text.addToCalendar}
            </Button>
            
            <Button 
              onClick={openMaps}
              variant="outline"
              className="border-copper text-copper hover:bg-copper hover:text-white"
              size="lg"
            >
              <MapPin className="w-5 h-5 mr-2" />
              {text.viewLocation}
            </Button>
          </div>

          {/* Thank You Message */}
          <Card className="mt-8 bg-gradient-to-r from-copper/5 to-copper/10 border-copper/20">
            <CardContent className="text-center py-8">
              <p className="text-lg text-muted-foreground">
                {text.thanks}
              </p>
            </CardContent>
          </Card>

          {/* Back to Home */}
          <div className="text-center mt-8">
            <Button 
              variant="ghost" 
              className="text-copper hover:text-copper/80"
              onClick={() => window.location.href = '/'}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {text.backHome}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservaExitosa;