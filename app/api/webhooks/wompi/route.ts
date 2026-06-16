import { NextRequest, NextResponse } from 'next/server';
import { verifyWompiEventSignature, type WompiEventPayload } from '@/lib/wompi';
import { processWompiTransaction } from '@/lib/services/activation-service';
import { logAudit } from '@/lib/audit';
import { rateLimit } from '@/lib/rate-limit';

/**
 * Webhook de eventos de Wompi.
 * Reglas:
 *  - Siempre validar la firma antes de confiar en el payload.
 *  - Responder 200 rapido (Wompi reintenta si no recibe 2xx) incluso si
 *    el procesamiento interno falla de forma recuperable, para evitar
 *    tormentas de reintentos; los errores se registran en auditoria/logs.
 *  - Idempotente: process Wompi puede reenviar el mismo evento.
 */
export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  const limited = rateLimit(`webhook:wompi:${ip}`, 60, 60 * 1000);
  if (!limited.success) {
    return NextResponse.json({ error: 'Demasiadas solicitudes' }, { status: 429 });
  }

  let payload: WompiEventPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'JSON invalido' }, { status: 400 });
  }

  const validSignature = verifyWompiEventSignature(payload);

  if (!validSignature) {
    await logAudit({
      action: 'WEBHOOK_INVALID_SIGNATURE',
      entityType: 'WompiEvent',
      metadata: { event: payload?.event },
      ipAddress: ip,
    });
    return NextResponse.json({ error: 'Firma invalida' }, { status: 401 });
  }

  if (payload.event !== 'transaction.updated') {
    // Reconocemos el evento pero no actuamos sobre tipos de evento no manejados.
    return NextResponse.json({ received: true });
  }

  try {
    await processWompiTransaction(payload.data.transaction);
  } catch (error) {
    console.error('[webhook/wompi] Error procesando transaccion:', error);
    await logAudit({
      action: 'WEBHOOK_PROCESSING_ERROR',
      entityType: 'WompiEvent',
      metadata: { event: payload.event, transactionId: payload.data?.transaction?.id },
      ipAddress: ip,
    });
    // 200 para evitar reintentos infinitos de Wompi; el error queda auditado
    // y puede reconciliarse manualmente desde el panel admin.
    return NextResponse.json({ received: true, processed: false });
  }

  return NextResponse.json({ received: true, processed: true });
}
