/**
 * Loading state del sitio publico. Se muestra automaticamente mientras
 * los Server Components de la pagina (ej. el Hero leyendo el telefono
 * de soporte) resuelven sus datos — evita el flash en blanco entre
 * navegaciones.
 */
export default function MarketingLoading() {
  return (
    <div className="flex min-h-[86vh] items-center justify-center bg-ink">
      <div className="flex flex-col items-center gap-4">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-gold/25 border-t-gold" />
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-paper/30">
          Litigo
        </span>
      </div>
    </div>
  );
}
