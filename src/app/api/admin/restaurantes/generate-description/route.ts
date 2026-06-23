import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { nombre, categoria, localidad } = await request.json();

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { descripcion: `${nombre} es un/a ${categoria} ubicado en ${localidad}, Galicia. Un lugar único donde disfrutar de la mejor gastronomía gallega con productos frescos de temporada.` },
      { status: 200 }
    );
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 400,
        messages: [
          {
            role: 'user',
            content: `Escribe una descripción atractiva y evocadora (3-4 frases) para un restaurante gallego:
Nombre: ${nombre}
Tipo: ${categoria}
Localidad: ${localidad}, Galicia

La descripción debe:
- Transmitir autenticidad, calidez y amor por la gastronomía gallega
- Mencionar el producto local y la tradición
- Ser descriptiva pero concisa
- Estar en español
- No mencionar precios

Solo devuelve la descripción, sin introducción ni explicaciones.`,
          },
        ],
      }),
    });

    const data = await response.json();
    const descripcion = data.content?.[0]?.text || '';
    return NextResponse.json({ descripcion });
  } catch {
    return NextResponse.json(
      { descripcion: `${nombre} es un restaurante de cocina ${categoria} en ${localidad} que combina la tradición gastronómica gallega con los mejores productos del mar y la tierra.` }
    );
  }
}
