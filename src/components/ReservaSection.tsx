import React, { useState } from 'react';
import { MapPin, Check, ArrowLeftRight, ArrowRight, CalendarDays } from 'lucide-react';
import CalendlyInline from '@/components/ui/calendly-inline';
import {
  SUCURSALES,
  barberosDeSucursal,
  formatearDias,
  type DiaSemana,
} from '@/data/barberia';

interface ReservaSectionProps {
  language?: string;
}

/** Días que se ofrecen para filtrar, en orden de semana. */
const DIAS_SEMANA: { id: DiaSemana; ini: string; corto: string; largo: string }[] = [
  { id: 'lun', ini: 'Lu', corto: 'Lun', largo: 'lunes' },
  { id: 'mar', ini: 'Ma', corto: 'Mar', largo: 'martes' },
  { id: 'mie', ini: 'Mi', corto: 'Mié', largo: 'miércoles' },
  { id: 'jue', ini: 'Ju', corto: 'Jue', largo: 'jueves' },
  { id: 'vie', ini: 'Vi', corto: 'Vie', largo: 'viernes' },
  { id: 'sab', ini: 'Sá', corto: 'Sáb', largo: 'sábados' },
];

const nombreSucursal = (id: string) => SUCURSALES.find((s) => s.id === id)?.nombre ?? id;

const ReservaSection: React.FC<ReservaSectionProps> = () => {
  const [sucursalId, setSucursalId] = useState<string | null>(null);
  const [dia, setDia] = useState<DiaSemana | null>(null);
  /** Barbero cuyo calendario está abierto debajo de la grilla. */
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

  /** Lleva al cliente a la agenda del mismo barbero en la otra sucursal. */
  const irAOtraSucursal = (id: string, barberoId: string, d: DiaSemana | null) => {
    setSucursalId(id);
    setDia(d);
    setBarberoAbierto(barberoId);
    setTimeout(() => scrollTo('calendario'), 120);
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {SUCURSALES.filter((s) => s.activa).map((s) => {
              const activa = s.id === sucursalId;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => elegirSucursal(s.id)}
                  aria-pressed={activa}
                  className={`group flex flex-col text-left overflow-hidden rounded-xl border bg-card transition-smooth ${
                    activa
                      ? 'border-copper shadow-copper'
                      : 'border-border hover:border-copper/60'
                  }`}
                >
                  {s.foto && (
                    // Fachada a todo el ancho, desde el cartel del local hacia abajo
                    <div className="relative aspect-[7/6] overflow-hidden">
                      <img
                        src={s.foto}
                        alt={`Fachada de AS Barbería, sucursal ${s.nombre}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.02]"
                      />
                      {activa && (
                        <span className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-copper text-white shadow-lg">
                          <Check className="w-5 h-5" />
                        </span>
                      )}
                    </div>
                  )}
                  <div className="flex items-start justify-between gap-4 p-6">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">{s.nombre}</h3>
                      <p className="text-muted-foreground flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-1 text-copper shrink-0" />
                        <span>{s.direccion || 'Dirección a confirmar'}</span>
                      </p>
                    </div>
                    {activa && !s.foto && <Check className="w-6 h-6 text-copper shrink-0" />}
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
                    setBarberoAbierto(null);
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
                    onClick={() => {
                      setDia(null);
                      setBarberoAbierto(null);
                    }}
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
                  const urlReserva = asignacion.reservaUrl;
                  // Agendas del mismo barbero en otras sucursales (los que rotan).
                  const otras = barbero.asignaciones.filter(
                    (a) => a.sucursalId !== asignacion.sucursalId,
                  );
                  // Con un día elegido, quien no atiende ese día en esta sucursal
                  // no puede reservar acá: ese día su agenda es de otro local.
                  const atiendeEseDia = dia ? asignacion.dias.includes(dia) : true;
                  const nombreDia = DIAS_SEMANA.find((d) => d.id === dia)?.largo ?? '';
                  const otraEseDia = dia
                    ? otras.find((a) => a.dias.includes(dia) && a.reservaUrl)
                    : undefined;
                  return (
                    <article
                      key={barbero.id}
                      className={`group relative overflow-hidden rounded-xl border bg-card transition-smooth ${
                        atiendeEseDia ? 'border-border hover:border-copper' : 'border-border'
                      }`}
                    >
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <img
                          src={barbero.foto}
                          alt={`${barbero.nombre}, barbero en AS Barbería`}
                          loading="lazy"
                          className={`h-full w-full object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-[1.03] ${
                            atiendeEseDia ? '' : 'opacity-40 grayscale'
                          }`}
                        />
                        <div className="absolute inset-0 foto-gradient" aria-hidden="true"></div>

                        <div className="absolute inset-x-0 bottom-0 p-5">
                          <h3 className="text-xl font-bold text-foreground">{barbero.nombre}</h3>

                          {/* Días que atiende en ESTA sucursal, visibles de un vistazo */}
                          <p className="mt-2 mb-1.5 text-xs text-muted-foreground">
                            Días en {sucursal.nombre}
                          </p>
                          <p className="sr-only">{dias}</p>
                          <div className="flex gap-1" aria-hidden="true">
                            {DIAS_SEMANA.map((d) => {
                              const atiende = asignacion.dias.includes(d.id);
                              return (
                                <span
                                  key={d.id}
                                  className={`flex-1 rounded-md border py-1 text-center text-xs font-semibold ${
                                    atiende
                                      ? 'border-copper bg-copper text-white'
                                      : 'border-muted-foreground/30 bg-background/70 text-muted-foreground/70 line-through'
                                  } ${dia === d.id ? 'ring-2 ring-foreground' : ''}`}
                                >
                                  {d.ini}
                                </span>
                              );
                            })}
                          </div>

                          {otras.map((o) => (
                            <button
                              key={o.sucursalId}
                              type="button"
                              onClick={() => irAOtraSucursal(o.sucursalId, barbero.id, null)}
                              className="mt-2 inline-flex items-start gap-1.5 text-left text-xs text-copper underline-offset-4 hover:underline"
                            >
                              <ArrowLeftRight className="w-3.5 h-3.5 mt-px shrink-0" />
                              {formatearDias(o.dias)}: en {nombreSucursal(o.sucursalId)}
                            </button>
                          ))}

                          <div className="mt-4">
                            {!atiendeEseDia && otraEseDia ? (
                              <button
                                type="button"
                                onClick={() => irAOtraSucursal(otraEseDia.sucursalId, barbero.id, dia)}
                                className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-copper px-4 py-3 text-sm font-semibold text-copper transition-smooth hover:bg-copper hover:text-white"
                              >
                                Los {nombreDia} está en {nombreSucursal(otraEseDia.sucursalId)}
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            ) : !atiendeEseDia ? (
                              <button
                                type="button"
                                disabled
                                className="w-full rounded-lg border border-border bg-secondary px-6 py-3 text-sm font-semibold text-muted-foreground cursor-not-allowed"
                              >
                                No atiende los {nombreDia} en {sucursal.nombre}
                              </button>
                            ) : urlReserva ? (
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

            {/* Calendario embebido del barbero elegido */}
            {(() => {
              const elegido = barberos.find(
                ({ barbero, asignacion }) =>
                  barbero.id === barberoAbierto &&
                  asignacion.reservaUrl &&
                  (dia ? asignacion.dias.includes(dia) : true),
              );
              if (!elegido) return null;
              const { barbero, asignacion } = elegido;
              const otras = barbero.asignaciones.filter(
                (a) => a.sucursalId !== asignacion.sucursalId && a.reservaUrl,
              );
              return (
                <div id="calendario" className="mt-12 scroll-mt-24 max-w-4xl mx-auto">
                  {/* Aviso para los que rotan: qué días están acá y dónde el resto */}
                  {otras.length > 0 && (
                    <div className="mb-6 flex flex-col gap-4 rounded-xl border border-copper/60 bg-copper/10 p-4 md:flex-row md:items-center md:justify-between md:p-5">
                      <div className="flex gap-3">
                        <CalendarDays className="w-6 h-6 text-copper shrink-0" />
                        <p className="text-foreground">
                          <strong>
                            {barbero.nombre} atiende en {sucursal.nombre} solo los{' '}
                            {formatearDias(asignacion.dias).toLowerCase()}.
                          </strong>{' '}
                          {otras.map((o) => (
                            <span key={o.sucursalId} className="text-muted-foreground">
                              Los {formatearDias(o.dias).toLowerCase()} está en{' '}
                              {nombreSucursal(o.sucursalId)}.{' '}
                            </span>
                          ))}
                        </p>
                      </div>
                      {otras.map((o) => (
                        <button
                          key={o.sucursalId}
                          type="button"
                          onClick={() => irAOtraSucursal(o.sucursalId, barbero.id, null)}
                          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-copper px-4 py-2 text-sm font-semibold text-copper transition-smooth hover:bg-copper hover:text-white"
                        >
                          Ver agenda en {nombreSucursal(o.sucursalId)}
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ))}
                    </div>
                  )}
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
                  <CalendlyInline
                    key={`${barbero.id}-${asignacion.sucursalId}`}
                    url={asignacion.reservaUrl}
                    nombre={barbero.nombre}
                  />
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
