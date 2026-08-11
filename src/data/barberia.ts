// Retratos del equipo. Para reasignar una foto a otro barbero alcanza con
// cambiar el número de archivo en el import correspondiente.
import alexFoto from '@/assets/barbero-2.jpg';
import lautaroSosaFoto from '@/assets/barbero-3.jpg';
import guillermoFoto from '@/assets/barbero-5.jpg';
import lautaroIbarraFoto from '@/assets/barbero-1.jpg';
import estebanFoto from '@/assets/barbero-4.jpg';

export type DiaSemana = 'lun' | 'mar' | 'mie' | 'jue' | 'vie' | 'sab' | 'dom';

export interface Asignacion {
  sucursalId: string;
  dias: DiaSemana[];
  calendly: string;
}

export interface Barbero {
  id: string;
  nombre: string;
  foto: string;
  asignaciones: Asignacion[];
}

export interface Sucursal {
  id: string;
  nombre: string;
  direccion: string;
  /** Coordenadas reales, usadas para centrar el mapa embebido. */
  lat: number;
  lng: number;
  mapsUrl: string;
  /** Días y franja en que abre el local. Refleja la cobertura de los barberos asignados. */
  horario: string;
  activa: boolean;
}

export const SUCURSALES: Sucursal[] = [
  {
    id: 'centro',
    nombre: 'Centro',
    direccion: 'Florida esq. Rincón 841, 20000 Maldonado',
    lat: -34.9083,
    lng: -54.9556,
    mapsUrl: '',
    horario: 'Lunes a sábado, 10:00 a 19:00',
    activa: true,
  },
  {
    id: 'lussich',
    nombre: 'Lussich',
    direccion: 'Av. Antonio Lussich, 20000 Maldonado, Departamento de Maldonado',
    lat: -34.899,
    lng: -54.9675,
    mapsUrl: 'https://maps.app.goo.gl/Aa7JVjD6jJTkhHkBA?g_st=iw',
    horario: 'Lunes a sábado, 10:00 a 19:00',
    activa: true,
  },
];

export const BARBEROS: Barbero[] = [
  {
    id: 'alex-seijas',
    nombre: 'Alex Seijas',
    foto: alexFoto,
    asignaciones: [
      {
        sucursalId: 'lussich',
        dias: ['mar', 'jue', 'sab'],
        calendly: 'https://calendly.com/asbarberiaa2025/45min',
      },
      {
        sucursalId: 'centro',
        dias: ['lun', 'mie', 'vie'],
        calendly: 'https://calendly.com/asbarberiaa2025/45min',
      },
    ],
  },
  {
    id: 'lautaro-sosa',
    nombre: 'Lautaro Sosa',
    foto: lautaroSosaFoto,
    asignaciones: [
      {
        sucursalId: 'lussich',
        dias: ['lun', 'mie', 'vie'],
        calendly: 'https://calendly.com/lautarojoaquinsosanavarro8/45min',
      },
      {
        sucursalId: 'centro',
        dias: ['mar', 'jue', 'sab'],
        calendly: 'https://calendly.com/lautarojoaquinsosanavarro8/45min',
      },
    ],
  },
  {
    id: 'guillermo-olivera',
    nombre: 'Guillermo Olivera',
    foto: guillermoFoto,
    asignaciones: [
      {
        sucursalId: 'centro',
        dias: ['lun', 'mar', 'mie', 'jue', 'vie'],
        calendly: 'https://calendly.com/guillermoasbarberia/corte-de-cabello-guillermo-olivera',
      },
    ],
  },
  {
    id: 'lautaro-ibarra',
    nombre: 'Lautaro Ibarra',
    foto: lautaroIbarraFoto,
    asignaciones: [
      {
        sucursalId: 'centro',
        dias: ['lun', 'mar', 'mie', 'jue', 'vie'],
        calendly: 'https://calendly.com/lautaroiasbarberia/45min',
      },
    ],
  },
  {
    id: 'esteban-valle',
    nombre: 'Esteban Valle',
    foto: estebanFoto,
    asignaciones: [
      {
        sucursalId: 'lussich',
        dias: ['lun', 'mar', 'mie', 'jue', 'vie'],
        calendly: 'https://calendly.com/estebanvasbarberia/45min',
      },
    ],
  },
];


const NOMBRE_DIAS: Record<string, string> = {
  lun: 'lunes',
  mar: 'martes',
  mie: 'miércoles',
  jue: 'jueves',
  vie: 'viernes',
  sab: 'sábados',
  dom: 'domingos',
};

const ORDEN_DIAS = ['lun', 'mar', 'mie', 'jue', 'vie', 'sab'];

export function formatearDias(dias: string[]): string {
  if (!dias || dias.length === 0) return '';

  const unicos = Array.from(new Set(dias));
  const esTodaLaSemana = ORDEN_DIAS.every((d) => unicos.includes(d));
  if (esTodaLaSemana) return 'Todos los días';

  const ordenados = [...unicos].sort(
    (a, b) => ORDEN_DIAS.indexOf(a) - ORDEN_DIAS.indexOf(b),
  );
  const nombres = ordenados.map((d) => NOMBRE_DIAS[d] ?? d);
  const texto =
    nombres.length === 1
      ? nombres[0]
      : `${nombres.slice(0, -1).join(', ')} y ${nombres[nombres.length - 1]}`;
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export function barberosDeSucursal(sucursalId: string) {
  return (
    BARBEROS.map((b) => ({
      barbero: b,
      asignacion: b.asignaciones.find((a) => a.sucursalId === sucursalId),
    })).filter((x) => x.asignacion) as { barbero: Barbero; asignacion: Asignacion }[]
  ).sort((a, b) => a.barbero.nombre.localeCompare(b.barbero.nombre, 'es'));
}

/**
 * Barberos que atienden en una sucursal un día puntual. Un barbero puede rotar
 * entre locales, así que se filtra por la asignación de ESA sucursal: los días
 * que cubre en otra no cuentan acá.
 */
export function barberosDeSucursalEnDia(sucursalId: string, dia: DiaSemana) {
  return barberosDeSucursal(sucursalId).filter(({ asignacion }) =>
    asignacion.dias.includes(dia),
  );
}

