import React, { useState } from 'react';
import { MapPin, Check } from 'lucide-react';
import {
  SUCURSALES,
  barberosDeSucursal,
  formatearDias,
  proveedorDeReserva,
  type DiaSemana,
} from '@/data/barberia';

interface ReservaSectionProps {
  language?: string;
}

/** Días que se ofrecen para filtrar, en orden de semana. */
const DIAS_SEMANA: { id: DiaSemana; corto: string; largo: string }[] = [
  { id: 'lun', corto: 'Lun', largo: 'lunes' },
  { id: 'mar', corto: 'Mar', largo: 'martes' },
  { id: 'mie', corto: 'Mié', largo: 'miércoles' },
  { id: 'jue', corto: 'Jue', largo: 'jueves' },
  { id: 'vie', corto: 'Vie', largo: 'viernes' },
  { id: 'sab', corto: 'Sáb', largo: 'sábados' },
];

const ReservaSection: React.FC<ReservaSectionProps> = () => {
  const [sucursalId, setSucursalId] = useState<string | null>(null);
  const [dia, setDia] = useState<DiaSemana | null>(null);
  /** Barbero cuyo calendario de Cal.com está abierto debajo de la grilla. */
  const [barberoAbierto, setBarberoAbierto] = useState<string | null>(null);

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
    setDia(null); // los días dependen de la sucursal: se elige de nuevo
    setBarberoAbierto(null);
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
                    setDia(null);
                    scrollTo('paso-sucursal');
                  }}
                  className="text-copper underline underline-offset-4 ml-2"
                >
                  Cambiar sucursal
                </button>
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Elegí tu barbero</h2>
            </div>

            {/* Filtro por día: deshabilita a quien no atiende ese día en esta sucursal */}
            <div className="mb-10">
              <p className="text-center text-sm text-muted-foreground mb-3">
                ¿Qué día querés venir? <span className="text-xs">(opcional)</span>
              </p>
              <div
                role="group"
                aria-label="Filtrar barberos por día"
                className="flex flex-wrap justify-center gap-2"
              >
                {DIAS_SEMANA.map((d) => {
                  const activo = dia === d.id;
                  const hayAlguien = barberos.some(({ asignacion }) =>
                    asignacion.dias.includes(d.id),
                  );
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => {
                        setDia(activo ? null : d.id);
                        setBarberoAbierto(null);
                      }}
                      aria-pressed={activo}
                      className={`rounded-lg border px-4 py-2 text-sm font-medium transition-smooth ${
                        activo
                          ? 'border-copper bg-copper text-white'
                          : hayAlguien
                            ? 'border-border text-foreground hover:border-copper/60'
                            : 'border-border text-muted-foreground/50'
                      }`}
                    >
                      {d.corto}
                      {!hayAlguien && <span className="sr-only"> (sin barberos este día)</span>}
                    </button>
                  );
                })}
                {dia && (
                  <button
                    type="button"
                    onClick={() => setDia(null)}
                    className="rounded-lg px-4 py-2 text-sm text-copper underline underline-offset-4"
                  >
                    Ver todos
                  </button>
                )}
              </div>
            </div>

            {barberos.length === 0 ? (
              <p className="text-center text-muted-foreground">
                Estamos armando el equipo de esta sucursal. Escribinos y te ayudamos a reservar.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {barberos.map(({ barbero, asignacion }) => {
                  const dias = formatearDias(asignacion.dias);
                  const rota = barbero.asignaciones.length > 1;
                  const proveedor = proveedorDeReserva(asignacion.calendly);
                  // En Calendly la agenda es única para las dos sucursales, así que se
                  // manda la elegida como nota para que quede asentada en la reserva.
                  // Cal.com ya tiene un evento por sucursal: no hace falta aclararlo.
                  const urlReserva =
                    proveedor === 'calendly'
                      ? `${asignacion.calendly}?location=${encodeURIComponent(
                          sucursal.nombre,
                        )}&a1=${encodeURIComponent(
                          `Sucursal: ${sucursal.nombre} (${sucursal.direccion})`,
                        )}`
                      : asignacion.calendly;
                  // Con un día elegido, quien no atiende ese día en esta sucursal
                  // no puede reservar: su agenda es de otro local ese día.
                  const atiendeEseDia = dia ? asignacion.dias.includes(dia) : true;
                  const nombreDia = DIAS_SEMANA.find((d) => d.id === dia)?.largo ?? '';
                  return (
                    <article
                      key={barbero.id}
                      className={`group relative overflow-hidden rounded-xl border bg-card transition-smooth ${
                        atiendeEseDia
                          ? 'border-border hover:border-copper'
                          : 'border-border opacity-60'
                      }`}
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
                          {rota && dias && atiendeEseDia && proveedor === 'calendly' && (
                            <p className="mt-2 text-xs text-copper">
                              En {sucursal.nombre} atiende solo {dias.toLowerCase()}. Elegí uno de esos
                              días en el calendario.
                            </p>
                          )}
                          <div className="mt-4">
                            {!atiendeEseDia ? (
                              <button
                                type="button"
                                disabled
                                className="w-full rounded-lg border border-border bg-secondary px-6 py-3 text-sm font-semibold text-muted-foreground cursor-not-allowed"
                              >
                                No atiende los {nombreDia} en {sucursal.nombre}
                              </button>
                            ) : proveedor === 'calcom' ? (
                              <button
                                type="button"
                                onClick={() => {
                                  const abrir = barberoAbierto === barbero.id ? null : barbero.id;
                                  setBarberoAbierto(abrir);
                                  if (abrir) setTimeout(() => scrollTo('calendario'), 60);
                                }}
                                aria-expanded={barberoAbierto === barbero.id}
                                aria-controls="calendario"
                                className="btn-copper inline-block w-full text-center"
                              >
                                {barberoAbierto === barbero.id ? 'Cerrar calendario' : 'Reservar turno'}
                              </button>
                            ) : urlReserva ? (
                              <a
                                href={urlReserva}
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

            {/* Calendario embebido de Cal.com para el barbero elegido */}
            {(() => {
              const elegido = barberos.find(
                ({ barbero, asignacion }) =>
                  barbero.id === barberoAbierto &&
                  proveedorDeReserva(asignacion.calendly) === 'calcom' &&
                  (dia ? asignacion.dias.includes(dia) : true),
              );
              if (!elegido) return null;
              const { barbero, asignacion } = elegido;
              return (
                <div id="calendario" className="mt-12 scroll-mt-24 max-w-4xl mx-auto">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <h3 className="text-xl font-bold text-foreground">
                      Reservar con {barbero.nombre} · {sucursal.nombre}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setBarberoAbierto(null)}
                      className="text-sm text-copper underline underline-offset-4 shrink-0"
                    >
                      Cerrar
                    </button>
                  </div>
                  <div className="overflow-hidden rounded-xl border border-border bg-card">
                    <iframe
                      src={`${asignacion.calendly}?embed=true`}
                      title={`Reservar con ${barbero.nombre} en ${sucursal.nombre}`}
                      loading="lazy"
                      className="w-full h-[700px] border-0"
                    />
                  </div>
                  <p className="mt-3 text-center text-sm text-muted-foreground">
                    ¿No carga el calendario?{' '}
                    <a
                      href={asignacion.calendly}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-copper underline underline-offset-4"
                    >
                      Abrilo en una pestaña nueva
                    </a>
                    .
                  </p>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </section>
  );
};

export default ReservaSection;
