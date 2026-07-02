import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { adminGetClientes, adminUpsertCliente, adminDeleteCliente } from '@/lib/clientes';

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    if (id) {
      const { adminGetCliente } = await import('@/lib/clientes');
      const data = await adminGetCliente(id);
      return NextResponse.json(data);
    }
    const data = await adminGetClientes();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = await adminUpsertCliente(body);
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await adminDeleteCliente(id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
