import alexFoto from '@/assets/alex-seijas.jpg.asset.json';
import lautaroSosaFoto from '@/assets/lautaro-sosa.jpg.asset.json';
import guillermoFoto from '@/assets/guillermo-olivera.jpg.asset.json';
import estebanFoto from '@/assets/esteban-valle.jpg.asset.json';
import lautaroIbarraFoto from '@/assets/lautaro-ibarra.jpg.asset.json';

export interface Asignacion {
  sucursalId: string;
  dias: string[];
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
  mapsUrl: string;
  activa: boolean;
}

export const SUCURSALES: Sucursal[] = [
  {
    id: 'centro',
    nombre: 'Centro',
    direccion: 'Florida esq. Rincón 841, Maldonado',
    mapsUrl: '',
    activa: true,
  },
  {
    id: 'lussich',
    nombre: 'Lussich',
    direccion: '', // PENDIENTE
    mapsUrl: '',
    activa: true,
  },
];

export const BARBEROS: Barbero[] = [
  {
    id: 'alex-seijas',
    nombre: 'Alex Seijas',
    foto: alexFoto.url,
    asignaciones: [
      {
        sucursalId: 'lussich',
        dias: ['lun', 'mie', 'vie'],
        calendly: 'https://calendly.com/asbarberiaa2025/45min',
      },
    ],
  },
  {
    id: 'lautaro-sosa',
    nombre: 'Lautaro Sosa',
    foto: lautaroSosaFoto.url,
    asignaciones: [
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
    foto: guillermoFoto.url,
    asignaciones: [
      {
        sucursalId: 'centro',
        dias: [],
        calendly: 'https://calendly.com/guillermoasbarberia/corte-de-cabello-guillermo-olivera',
      },
    ],
  },
  {
    id: 'lautaro-ibarra',
    nombre: 'Lautaro Ibarra',
    foto: lautaroIbarraFoto.url,
    asignaciones: [{ sucursalId: 'centro', dias: [], calendly: '' }],
  },
  {
    id: 'esteban-valle',
    nombre: 'Esteban Valle',
    foto: estebanFoto.url,
    asignaciones: [{ sucursalId: 'lussich', dias: [], calendly: '' }],
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
  return BARBEROS.map((b) => ({
    barbero: b,
    asignacion: b.asignaciones.find((a) => a.sucursalId === sucursalId),
  })).filter((x) => x.asignacion) as { barbero: Barbero; asignacion: Asignacion }[];
}
