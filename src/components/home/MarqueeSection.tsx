import Image from 'next/image';

export function MarqueeSection() {
  return (
    <div style={{ background: '#F4F3E4', overflow: 'hidden', lineHeight: 0 }}>
      <Image
        src="/images/original_32884.png"
        alt="Susana La Gallega"
        width={1920}
        height={293}
        unoptimized
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </div>
  );
}
