import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const filename = `blog/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const client = createAdminClient();
    const { error } = await client.storage
      .from('images')
      .upload(filename, buffer, { contentType: file.type, upsert: false });

    if (error) {
      // Intenta crear el bucket si no existe
      await client.storage.createBucket('images', { public: true });
      const { error: error2 } = await client.storage
        .from('images')
        .upload(filename, buffer, { contentType: file.type, upsert: false });
      if (error2) throw error2;
    }

    const { data: { publicUrl } } = client.storage.from('images').getPublicUrl(filename);
    return NextResponse.json({ url: publicUrl });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: 'Error uploading image' }, { status: 500 });
  }
}
