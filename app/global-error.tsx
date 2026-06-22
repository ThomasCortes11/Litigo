'use client';

import * as React from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * Boundary de error global. Captura excepciones no manejadas en
 * cualquier punto del arbol de renderizado y muestra una pantalla
 * de marca en lugar del error tecnico crudo de Next.js.
 *
 * Debe incluir sus propias etiquetas <html>/<body> porque reemplaza
 * el root layout cuando se activa.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error('[global-error]', error);
  }, [error]);

  return (
    <html lang="es">
      <body className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center font-sans">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-danger/10">
          <AlertCircle className="h-8 w-8 text-danger" />
        </div>
        <h1 className="mt-6 text-2xl font-semibold text-paper">Algo salio mal</h1>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-paper/55">
          Ocurrio un error inesperado. Nuestro equipo ya fue notificado. Puedes intentar de nuevo
          o escribir a soporte@litigo.com.co si el problema persiste.
        </p>
        <button
          onClick={reset}
          className="mt-8 rounded bg-gold px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gold-dark"
        >
          Intentar de nuevo
        </button>
      </body>
    </html>
  );
}
