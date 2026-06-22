import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/**
 * Apple touch icon — misma identidad que app/icon.tsx pero a mayor
 * resolucion para pantallas de inicio de iOS/iPadOS.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0B1520',
        }}
      >
        <span
          style={{
            fontSize: 110,
            fontWeight: 600,
            color: '#F8F6F1',
            fontFamily: 'Georgia, serif',
            transform: 'translateY(-6px)',
          }}
        >
          L
        </span>
      </div>
    ),
    { ...size },
  );
}
