import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

/**
 * Favicon generado en codigo (sin assets binarios): reutiliza el mismo
 * monograma "L" sobre fondo ink que aparece en el sello del hero, para
 * que la pestana del navegador refuerce la identidad de marca.
 */
export default function Icon() {
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
          borderRadius: 6,
        }}
      >
        <span
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: '#F8F6F1',
            fontFamily: 'Georgia, serif',
            transform: 'translateY(-1px)',
          }}
        >
          L
        </span>
      </div>
    ),
    { ...size },
  );
}
