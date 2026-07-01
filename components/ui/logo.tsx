/**
 * Logo SVG de Litigo S.A.S.
 * Recrea el logo de la marca con los colores oficiales:
 *   Azul marino: #1B3470
 *   Teal:        #2AACB8
 *
 * Props:
 *   variant="dark"   — para fondos oscuros (letras en blanco)
 *   variant="light"  — para fondos claros (letras en colores originales)
 *   size="sm" | "md" | "lg"
 */

interface LogoProps {
  variant?: 'dark' | 'light';
  size?:    'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: { width: 100, height: 32  },
  md: { width: 140, height: 44  },
  lg: { width: 200, height: 62  },
};

export function LitigoLogo({ variant = 'dark', size = 'md', className }: LogoProps) {
  const { width, height } = sizes[size];

  /* En fondos oscuros las letras del logo van en blanco manteniendo
     la G y la O en teal para conservar la identidad de marca */
  const navy = variant === 'dark' ? '#FFFFFF' : '#1B3470';
  const teal = '#2AACB8';

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Litigo S.A.S. — Asesoría Jurídica Inmediata"
      role="img"
      className={className}
    >
      {/* ── Letras LITIGO ── */}

      {/* L */}
      <text x="0"   y="44" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="46" fill={navy}>L</text>

      {/* Corbata (la I con corbata es el elemento icónico) */}
      {/* Palito de la I */}
      <rect x="33" y="2"  width="8" height="10" rx="1" fill={navy} />
      {/* Nudo de corbata */}
      <polygon points="33,12 41,12 39,17 35,17" fill={navy} />
      {/* Cuerpo de la corbata */}
      <polygon points="35,17 39,17 43,42 31,42" fill={navy} />
      {/* Punta de la corbata */}
      <polygon points="31,42 43,42 38,50 36,50" fill={navy} />

      {/* T */}
      <text x="44"  y="44" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="46" fill={navy}>T</text>

      {/* i (punto) */}
      <circle cx="88" cy="8"  r="5" fill={navy} />
      {/* i (palo) */}
      <rect   x="84" y="17" width="8" height="27" rx="1" fill={navy} />

      {/* G — en teal */}
      <text x="95"  y="44" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="46" fill={teal}>G</text>

      {/* O — en teal */}
      <text x="130" y="44" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="46" fill={teal}>O</text>

      {/* S.A.S. */}
      <text x="170" y="38" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="11" fill={navy}>S.A.S.</text>

      {/* Tagline */}
      <text x="0" y="58" fontFamily="Arial, sans-serif" fontWeight="400" fontSize="8.5"
            letterSpacing="0.5" fill={variant === 'dark' ? 'rgba(255,255,255,0.55)' : '#1B3470'}>
        Asesoría Jurídica Inmediata
      </text>
    </svg>
  );
}
