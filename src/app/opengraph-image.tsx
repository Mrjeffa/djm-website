import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'De Jonge Motoren, motorzaak in Tholen';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#0B0B0C', color: '#fff', padding: 72, fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', width: 120, height: 12, background: '#E31E24' }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 96, fontWeight: 800, letterSpacing: -2, textTransform: 'uppercase', lineHeight: 1 }}>De Jonge Motoren</div>
          <div style={{ fontSize: 40, marginTop: 24, color: '#A1A1AA' }}>Occasions · inkoop · werkplaats · winterstalling</div>
        </div>
        <div style={{ display: 'flex', fontSize: 32, color: '#FF4A50', fontWeight: 700 }}>Stevinweg 14, Tholen · 0166-606090</div>
      </div>
    ),
    size,
  );
}
