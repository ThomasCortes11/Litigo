/**
 * Rate limiter en memoria (ventana fija) por IP/clave.
 *
 * NOTA DE PRODUCCION: este limitador es por instancia de proceso.
 * En un despliegue serverless con multiples instancias (Vercel) cada
 * instancia tiene su propio contador, por lo que el limite real efectivo
 * es N x (numero de instancias). Para un limite estrictamente global en
 * produccion con trafico alto, reemplazar por un store compartido como
 * Upstash Redis (@upstash/ratelimit), manteniendo esta misma interfaz.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: limit - 1, resetAt: now + windowMs };
  }

  if (existing.count >= limit) {
    return { success: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return { success: true, remaining: limit - existing.count, resetAt: existing.resetAt };
}

// Limpieza periodica para no acumular memoria indefinidamente.
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets.entries()) {
      if (bucket.resetAt < now) buckets.delete(key);
    }
  }, 5 * 60 * 1000);
}
