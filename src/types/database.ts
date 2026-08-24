export interface Guest {
  id: string;
  name: string;
  token: string;
  allowed_guests: number;
  attendance: boolean | null;
  companions: number | null;
  dietary_restrictions: string | null;
  confirmed_at: string | null;
  created_at: string;
}