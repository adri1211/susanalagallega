import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !anon) {
    return NextResponse.json({ error: 'Missing env vars', url: !!url, anon: !!anon, service: !!service });
  }

  try {
    const client = createClient(url, anon);
    const { data, error, count } = await client
      .from('restaurantes')
      .select('id, nombre, activo', { count: 'exact' })
      .limit(3);

    return NextResponse.json({ ok: true, count, error, sample: data });
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, thrown: String(e) });
  }
}
