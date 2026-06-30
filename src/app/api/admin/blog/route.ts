import { NextResponse } from 'next/server';
import { adminGetAllPosts, adminUpsertPost, adminDeletePost } from '@/lib/blog';

function isAuthorized(request: Request): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return true;
  return request.headers.get('x-admin-secret') === secret;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const data = await adminGetAllPosts();
    return NextResponse.json({ data, total: data.length });
  } catch {
    return NextResponse.json({ error: 'Database error', data: [], total: 0 }, { status: 200 });
  }
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await request.json();
    const result = await adminUpsertPost(body);
    return NextResponse.json({ data: result }, { status: 201 });
  } catch (err) {
    console.error('Error creating blog post:', err);
    return NextResponse.json({ error: 'Error creating post' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!isAuthorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  try {
    await adminDeletePost(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Error deleting post' }, { status: 500 });
  }
}
