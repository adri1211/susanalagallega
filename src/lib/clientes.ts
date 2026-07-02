import { createAdminClient } from './supabase';

export type EstadoCliente = 'pendiente' | 'contactado' | 'interesado' | 'contratado' | 'rechazado' | 'no_contesta';

export type Cliente = {
  id: string;
  nombre_persona: string;
  nombre_comercio: string | null;
  correo: string | null;
  telefono: string | null;
  localidad: string | null;
  notas: string | null;
  estado: EstadoCliente;
  created_at: string;
  updated_at: string;
};

export const ESTADOS: { slug: EstadoCliente; label: string; color: string; bg: string }[] = [
  { slug: 'pendiente',   label: 'Pendiente',    color: '#92400e', bg: '#fef3c7' },
  { slug: 'contactado',  label: 'Contactado',   color: '#1d4ed8', bg: '#dbeafe' },
  { slug: 'interesado',  label: 'Interesado',   color: '#6d28d9', bg: '#ede9fe' },
  { slug: 'contratado',  label: 'Contratado',   color: '#065f46', bg: '#d1fae5' },
  { slug: 'rechazado',   label: 'Rechazado',    color: '#991b1b', bg: '#fee2e2' },
  { slug: 'no_contesta', label: 'No contesta',  color: '#374151', bg: '#f3f4f6' },
];

export function getEstado(slug: string) {
  return ESTADOS.find(e => e.slug === slug) ?? ESTADOS[0];
}

export async function adminGetClientes(): Promise<Cliente[]> {
  const client = createAdminClient();
  const { data, error } = await client
    .from('clientes')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function adminGetCliente(id: string): Promise<Cliente | null> {
  const client = createAdminClient();
  const { data } = await client.from('clientes').select('*').eq('id', id).single();
  return data;
}

export async function adminUpsertCliente(cliente: Partial<Cliente> & { nombre_persona: string }): Promise<Cliente> {
  const client = createAdminClient();
  const { data, error } = await client
    .from('clientes')
    .upsert({ ...cliente, updated_at: new Date().toISOString() })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function adminDeleteCliente(id: string): Promise<void> {
  const client = createAdminClient();
  const { error } = await client.from('clientes').delete().eq('id', id);
  if (error) throw error;
}
