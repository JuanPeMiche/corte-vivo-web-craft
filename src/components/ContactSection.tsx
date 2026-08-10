import React, { useState } from 'react';
import InteractiveMap from '@/components/ui/interactive-map';
import { MapPin, Phone, Mail, Clock, ExternalLink, Check } from 'lucide-react';
import { SUCURSALES } from '@/data/barberia';

interface ContactSectionProps {
  language: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ language }) => {
  const text = {
    title: "Contacto",
    subtitle: "Visitanos o escribinos",
    phone: "(+598) 92 048 926",
    email: "asbarberias@gmail.com",
    hours: "Horarios",
    weekdays: "Consultá vía mensaje o email",
    location: "Nuestras Sucursales",
    googleMaps: "Ver en Google Maps"
  };

  const sucursalesVisibles = SUCURSALES.filter((s) => s.activa && s.direccion);
  const [sucursalId, setSucursalId] = useState<string>(sucursalesVisibles[0]?.id ?? '');
  const sucursalSeleccionada = sucursalesVisibles.find((s) => s.id === sucursalId) ?? sucursalesVisibles[0];

  return (
    <section className="section-padding bg-background" id="contacto">
      <div className="container-responsive">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-foreground mb-4">{text.title}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{text.subtitle}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Datos de contacto */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <Phone className="w-6 h-6 text-copper" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Teléfono</h3>
              <p className="text-muted-foreground text-sm">{text.phone}</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <Mail className="w-6 h-6 text-copper" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Email</h3>
              <p className="text-muted-foreground text-sm break-all">{text.email}</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <Clock className="w-6 h-6 text-copper" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{text.hours}</h3>
              <p className="text-muted-foreground text-sm">{text.weekdays}</p>
            </div>
          </div>

          {/* Sucursales */}
          <div className="mb-8">
            <h3 id="sucursales" className="text-2xl font-bold text-foreground mb-6 text-center">{text.location}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {sucursalesVisibles.map((s) => {
                const activa = s.id === sucursalId;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSucursalId(s.id)}
                    aria-pressed={activa}
                    className={`text-left bg-card border rounded-lg p-6 transition-smooth ${
                      activa
                        ? 'border-copper shadow-copper'
                        : 'border-border hover:border-copper/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-copper" />
                          {s.nombre}
                        </h4>
                        <p className="text-muted-foreground text-sm mb-3">{s.direccion}</p>
                        <a
                          href={s.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.direccion)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-copper text-sm inline-flex items-center gap-1 underline underline-offset-4"
                        >
                          {text.googleMaps}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      {activa && <Check className="w-6 h-6 text-copper shrink-0" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mapa */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h4 className="text-2xl font-semibold text-foreground mb-6 text-center flex items-center justify-center">
              <MapPin className="w-6 h-6 text-copper mr-2" />
              {sucursalSeleccionada?.nombre ?? text.location}
            </h4>
            <div className="rounded-lg overflow-hidden">
              {sucursalSeleccionada && (
                <InteractiveMap
                  address={sucursalSeleccionada.direccion}
                  businessName={`AS Barbería - ${sucursalSeleccionada.nombre}`}
                  language={language}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
