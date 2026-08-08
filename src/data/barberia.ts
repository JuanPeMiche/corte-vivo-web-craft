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
    foto: '/barbero-1.jpg',
    asignaciones: [
      // { sucursalId: 'lussich', dias: ['lun','mie','vie'], calendly: '' },
    ],
  },
  {
    id: 'lautaro-sosa',
    nombre: 'Lautaro Sosa',
    foto: '/barbero-2.jpg',
    asignaciones: [],
  },
  {
    id: 'guillermo-olivera',
    nombre: 'Guillermo Olivera',
    foto: '/barbero-3.jpg',
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
    foto: '/barbero-4.jpg',
    asignaciones: [{ sucursalId: 'centro', dias: [], calendly: '' }],
  },
  {
    id: 'barbero-5',
    nombre: 'A confirmar',
    foto: '/barbero-5.jpg',
    asignaciones: [],
  },
];

const NOMBRE_DIAS: Record<string, string> = {
  lun: 'lunes',
  mar: 'martes',
  mie: 'miércoles',
  jue: 'jueves',
  vie: 'viernes',
  sab: 'sábado',
  dom: 'domingo',
};

export function formatearDias(dias: string[]): string {
  if (!dias || dias.length === 0) return '';
  const nombres = dias.map((d) => NOMBRE_DIAS[d] ?? d);
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
