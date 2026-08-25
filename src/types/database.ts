export interface Guest {
  id: string;
  name: string;
  token: string;
  attendance: boolean | null;
  dietary_restrictions: string | null;
  confirmed_at: string | null;
  created_at: string;
}

export const wedding = {
  couple: 'NOMBRE & NOMBRE',
  date: '15 de noviembre de 2026',
  time: '19:00 hs',
  venue: 'Nombre del salón',
  address: 'Dirección del lugar',
  mapsUrl: 'https://...',
}