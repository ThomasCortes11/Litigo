import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Litigo — Membresia juridica mensual';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Imagen Open Graph generada en codigo: se muestra cuando el link de
 * Litigo se comparte en WhatsApp, redes sociales o gestores de correo.
 * Reutiliza la paleta y tipografia del hero para consistencia de marca.
 */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 90px',
          background: '#0B1520',
          backgroundImage: 'radial-gradient(circle at 78% 50%, rgba(158,122,63,0.16), transparent 60%)',
        }}
      >
        <div
          style={{
            width: 40,
            height: 2,
            background: '#9E7A3F',
            marginBottom: 36,
            display: 'flex',
          }}
        />
        <div
          style={{
            fontSize: 30,
            letterSpacing: 6,
            color: '#BFA06A',
            fontFamily: 'Georgia, serif',
            marginBottom: 22,
            display: 'flex',
          }}
        >
          LITIGO
        </div>
        <div
          style={{
            fontSize: 68,
            lineHeight: 1.1,
            color: '#F8F6F1',
            fontFamily: 'Georgia, serif',
            fontWeight: 600,
            maxWidth: 820,
            display: 'flex',
          }}
        >
          Asesoria legal permanente, sin sorpresas.
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 24,
            color: 'rgba(248,246,241,0.55)',
            fontFamily: 'Georgia, serif',
            display: 'flex',
          }}
        >
          Membresia juridica mensual para personas y empresas
        </div>
      </div>
    ),
    { ...size },
  );
}
