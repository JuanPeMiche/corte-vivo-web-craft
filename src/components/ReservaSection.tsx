import React, { useState } from 'react';
import { MapPin, Check } from 'lucide-react';
import { SUCURSALES, barberosDeSucursal, formatearDias } from '@/data/barberia';

interface ReservaSectionProps {
  language?: string;
}

const ReservaSection: React.FC<ReservaSectionProps> = () => {
  const [sucursalId, setSucursalId] = useState<string | null>(null);

  const sucursal = SUCURSALES.find((s) => s.id === sucursalId) ?? null;
  const barberos = sucursalId ? barberosDeSucursal(sucursalId) : [];

  const scrollTo = (id: string) => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: reduce ? 'auto' : 'smooth',
        block: 'start',
      });
    });
  };

  const elegirSucursal = (id: string) => {
    setSucursalId(id);
    setTimeout(() => scrollTo('paso-barbero'), 60);
  };

  return (
    <section id="reserva" className="section-padding bg-background">
      <div className="container-responsive">
        {/* Paso 1 */}
        <div id="paso-sucursal" className="scroll-mt-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 text-foreground">
              ¿En qué sucursal te queda mejor?
            </h2>
            <p className="text-lg text-muted-foreground">
              Elegí dónde querés atenderte y después tu barbero.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {SUCURSALES.filter((s) => s.activa).map((s) => {
              const activa = s.id === sucursalId;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => elegirSucursal(s.id)}
                  aria-pressed={activa}
                  className={`text-left rounded-xl border p-6 md:p-8 bg-card transition-smooth ${
                    activa
                      ? 'border-copper shadow-copper'
                      : 'border-border hover:border-copper/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">{s.nombre}</h3>
                      <p className="text-muted-foreground flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-1 text-copper shrink-0" />
                        <span>{s.direccion || 'Dirección a confirmar'}</span>
                      </p>
                    </div>
                    {activa && <Check className="w-6 h-6 text-copper shrink-0" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Paso 2 */}
        {sucursal && (
          <div id="paso-barbero" className="mt-16 scroll-mt-24">
            <div className="text-center mb-8">
              <p className="text-sm text-muted-foreground mb-2">
                Sucursal: <span className="text-foreground">{sucursal.nombre}</span>{' '}
                <button
                  type="button"
                  onClick={() => {
                    setSucursalId(null);
                    scrollTo('paso-sucursal');
                  }}
                  className="text-copper underline underline-offset-4 ml-2"
                >
                  Cambiar sucursal
                </button>
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Elegí tu barbero</h2>
            </div>

            {barberos.length === 0 ? (
              <p className="text-center text-muted-foreground">
                Estamos armando el equipo de esta sucursal. Escribinos y te ayudamos a reservar.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {barberos.map(({ barbero, asignacion }) => {
                  const dias = formatearDias(asignacion.dias);
                  // Quien rota entre locales usa una sola agenda de Calendly, que no
                  // distingue sucursal. Se manda la elegida como nota para que quede
                  // asentada en la reserva y en el mail de confirmación.
                  const rota = barbero.asignaciones.length > 1;
                  const urlCalendly = asignacion.calendly
                    ? `${asignacion.calendly}?location=${encodeURIComponent(sucursal.nombre)}&a1=${encodeURIComponent(
                        `Sucursal: ${sucursal.nombre} (${sucursal.direccion})`,
                      )}`
                    : '';
                  return (
                    <article
                      key={barbero.id}
                      className="group relative overflow-hidden rounded-xl border border-border bg-card transition-smooth hover:border-copper"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <img
                          src={barbero.foto}
                          alt={`${barbero.nombre}, barbero en AS Barbería`}
                          loading="lazy"
                          className="h-full w-full object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 foto-gradient" aria-hidden="true"></div>

                        <div className="absolute inset-x-0 bottom-0 p-5">
                          <h3 className="text-xl font-bold text-foreground">{barbero.nombre}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {sucursal.nombre}
                            {dias && ` · ${dias}`}
                          </p>
                          {rota && dias && (
                            <p className="mt-2 text-xs text-copper">
                              En {sucursal.nombre} atiende solo {dias.toLowerCase()}. Elegí uno de esos
                              días en el calendario.
                            </p>
                          )}
                          <div className="mt-4">
                            {urlCalendly ? (
                              <a
                                href={urlCalendly}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-copper inline-block w-full text-center"
                              >
                                Reservar turno
                              </a>
                            ) : (
                              <button
                                type="button"
                                disabled
                                className="w-full rounded-lg border border-border bg-secondary px-6 py-3 font-semibold text-muted-foreground cursor-not-allowed"
                              >
                                Agenda en preparación
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ReservaSection;
