import Image from 'next/image';

export function MarqueeSection() {
  return (
    // Fondo azul oscuro para que el texto crema de la imagen contraste
    <div style={{ background: '#1a2d4a', overflow: 'hidden', lineHeight: 0 }}>
      <Image
        src="/images/original_32884.png"
        alt="Susana La Gallega"
        width={1920}
        height={293}
        unoptimized
        style={{ width: '100%', height: 'auto', display: 'block', mixBlendMode: 'screen', opacity: 0.9 }}
      />
    </div>
  );
}
