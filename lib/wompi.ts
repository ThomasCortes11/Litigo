import crypto from 'node:crypto';

/**
 * Integracion con Wompi (Colombia) - Checkout Web + Eventos (webhooks).
 * Documentacion de referencia: https://docs.wompi.co
 *
 * Flujo elegido: Checkout Web hospedado por Wompi (no manejamos datos de
 * tarjeta directamente -> reduce alcance de PCI-DSS a casi cero). El
 * usuario es redirigido a Wompi, paga alli, y Wompi:
 *   1) lo redirige de vuelta a nuestro redirect-url (UX), y
 *   2) nos notifica el resultado real via webhook firmado (fuente de verdad).
 * La activacion del afiliado SOLO ocurre por el webhook validado, nunca
 * por el redirect del navegador (que puede perderse o falsificarse).
 */

const WOMPI_PUBLIC_KEY = process.env.WOMPI_PUBLIC_KEY ?? '';
const WOMPI_PRIVATE_KEY = process.env.WOMPI_PRIVATE_KEY ?? '';
const WOMPI_INTEGRITY_SECRET = process.env.WOMPI_INTEGRITY_SECRET ?? '';
const WOMPI_EVENTS_SECRET = process.env.WOMPI_EVENTS_SECRET ?? '';
const WOMPI_API_URL = process.env.WOMPI_API_URL ?? 'https://sandbox.wompi.co/v1';

interface BuildCheckoutUrlParams {
  reference: string;
  amountInCents: number;
  currency?: string;
  redirectUrl: string;
  customerEmail?: string;
}

/**
 * Calcula la firma de integridad requerida por el Checkout Web de Wompi.
 * Formula oficial: SHA256(referencia + montoEnCentavos + moneda + secretoIntegridad)
 */
function buildIntegritySignature(reference: string, amountInCents: number, currency: string): string {
  const raw = `${reference}${amountInCents}${currency}${WOMPI_INTEGRITY_SECRET}`;
  return crypto.createHash('sha256').update(raw).digest('hex');
}

export function buildCheckoutUrl(params: BuildCheckoutUrlParams): string {
  const currency = params.currency ?? 'COP';
  const signature = buildIntegritySignature(params.reference, params.amountInCents, currency);

  const query = new URLSearchParams({
    'public-key': WOMPI_PUBLIC_KEY,
    'currency': currency,
    'amount-in-cents': String(params.amountInCents),
    'reference': params.reference,
    'redirect-url': params.redirectUrl,
  });

  // Wompi expects colon-containing parameter names like `signature:integrity`
  // and `customer-data:email` in the raw query string.
  query.set('signature:integrity', signature);

  if (params.customerEmail) {
    query.set('customer-data:email', params.customerEmail);
  }

  const queryString = query
    .toString()
    .replace(/signature%3Aintegrity=/g, 'signature:integrity=')
    .replace(/customer-data%3Aemail=/g, 'customer-data:email=');

  return `https://checkout.wompi.co/p/?${queryString}`;
}

/**
 * Consulta el estado real de una transaccion directamente contra la API
 * de Wompi (usado como respaldo/reconciliacion, por ejemplo si el webhook
 * no llega o llega tarde).
 */
export async function fetchWompiTransaction(transactionId: string) {
  const response = await fetch(`${WOMPI_API_URL}/transactions/${transactionId}`, {
    headers: { Authorization: `Bearer ${WOMPI_PRIVATE_KEY}` },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Wompi respondio ${response.status} al consultar la transaccion ${transactionId}`);
  }

  const json = await response.json();
  return json.data as WompiTransaction;
}

export interface WompiTransaction {
  id: string;
  status: 'PENDING' | 'APPROVED' | 'DECLINED' | 'ERROR' | 'VOIDED';
  reference: string;
  amount_in_cents: number;
  currency: string;
  payment_method_type?: string;
}

export interface WompiEventPayload {
  event: string;
  data: { transaction: WompiTransaction };
  sent_at: string;
  timestamp: number;
  signature: { properties: string[]; checksum: string };
}

/**
 * Lee un valor anidado de un objeto a partir de un path tipo "transaction.id".
 */
function getByPath(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

/**
 * Valida la firma de un evento entrante de Wompi.
 * Formula oficial: SHA256(valoresDeLasPropiedadesConcatenadas + timestamp + eventsSecret)
 */
export function verifyWompiEventSignature(payload: WompiEventPayload): boolean {
  if (!payload?.signature?.properties || !payload.signature.checksum) return false;

  const concatenatedValues = payload.signature.properties
    .map((prop) => getByPath(payload.data, prop))
    .join('');

  const raw = `${concatenatedValues}${payload.timestamp}${WOMPI_EVENTS_SECRET}`;
  const expectedChecksum = crypto.createHash('sha256').update(raw).digest('hex');
  const receivedChecksum = payload.signature.checksum.toLowerCase();

  if (expectedChecksum.length !== receivedChecksum.length) return false;

  return crypto.timingSafeEqual(Buffer.from(expectedChecksum, 'utf-8'), Buffer.from(receivedChecksum, 'utf-8'));
}
