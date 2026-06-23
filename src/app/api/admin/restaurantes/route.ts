import { NextResponse } from 'next/server';
import { adminGetAllRestaurantes, adminUpsertRestaurante, adminDeleteRestaurante } from '@/lib/data';

// Simple auth check via env secret
function isAuthorized(request: Request): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return true; // dev mode: no auth
  const authHeader = request.headers.get('x-admin-secret');
  return authHeader === secret;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const data = await adminGetAllRestaurantes();
    const { searchParams } = new URL(request.url);
    if (searchParams.get('export') === 'true') {
      return new NextResponse(JSON.stringify(data, null, 2), {
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': 'attachment; filename="restaurantes.json"',
        },
      });
    }
    return NextResponse.json({ data, total: data?.length || 0 });
  } catch (err) {
    return NextResponse.json({ error: 'Database error', data: [], total: 0 }, { status: 200 });
  }
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = await request.json();
    const result = await adminUpsertRestaurante(body);
    return NextResponse.json({ data: result }, { status: 201 });
  } catch (err) {
    console.error('Error creating restaurante:', err);
    return NextResponse.json({ error: 'Error creating restaurante' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  try {
    await adminDeleteRestaurante(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Error deleting restaurante' }, { status: 500 });
  }
}
