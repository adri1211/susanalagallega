import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

export async function GET() {
  try {
    const client = createAdminClient();
    const { data } = await client.from('notas_crm').select('contenido').eq('id', 'principal').single();
    return NextResponse.json({ contenido: data?.contenido ?? '' });
  } catch {
    return NextResponse.json({ contenido: '' });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { contenido } = await req.json();
    const client = createAdminClient();
    await client.from('notas_crm').upsert({ id: 'principal', contenido, updated_at: new Date().toISOString() });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
