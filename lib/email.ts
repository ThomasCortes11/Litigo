import { Resend } from 'resend';

const FROM = process.env.EMAIL_FROM ?? 'Litigo <afiliaciones@litigo.com.co>';
const WHATSAPP_PHONE = '573118551771';

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new Resend(apiKey);
}

interface SendWelcomeEmailParams {
  to: string;
  fullName: string;
  affiliateCode: string;
  membershipEndDate: Date;
}

function welcomeEmailHtml(params: SendWelcomeEmailParams): string {
  const formattedDate = new Intl.DateTimeFormat('es-CO', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(params.membershipEndDate);

  return `
  <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #2B2E33;">
    <div style="background: #0E1A2B; padding: 32px; text-align: center;">
      <span style="color: #F7F5F0; font-size: 22px; letter-spacing: 2px; text-transform: uppercase;">Litigo</span>
    </div>
    <div style="padding: 32px; background: #ffffff;">
      <h1 style="font-size: 20px; color: #0E1A2B;">Bienvenido(a), ${params.fullName}</h1>
      <p>Tu afiliacion a la membresia juridica de Litigo ha sido <strong>activada con exito</strong>.</p>
      <p style="background: #F7F5F0; border: 1px solid #E2DED4; border-radius: 6px; padding: 16px; text-align: center;">
        Tu codigo de afiliado es:<br/>
        <span style="font-size: 24px; font-weight: bold; color: #A9844C; letter-spacing: 1px;">${params.affiliateCode}</span>
      </p>
      <p>Tu membresia esta vigente hasta el <strong>${formattedDate}</strong>. Conservala, la necesitaras para acceder a los beneficios y para cualquier comunicacion con nuestro equipo.</p>
      <p style="color: #5B6472; font-size: 13px; margin-top: 32px;">Si no realizaste esta afiliacion, contacta a soporte@litigo.com.co inmediatamente.</p>
    </div>
  </div>`;
}

export async function sendAffiliateWelcomeEmail(params: SendWelcomeEmailParams) {
  try {
    const resend = getResendClient();
    if (!resend) {
      console.warn('[email] RESEND_API_KEY no definido. Se omite el envío de correo de bienvenida.');
      return;
    }
    await resend.emails.send({
      from: FROM,
      to: params.to,
      subject: 'Tu afiliacion a Litigo ha sido activada',
      html: welcomeEmailHtml(params),
    });
  } catch (error) {
    console.error('[email] No se pudo enviar el correo de bienvenida:', error);
  }
}

interface SendPaymentFailedEmailParams {
  to: string;
  fullName: string;
  reason?: string;
}

function paymentFailedEmailHtml(params: SendPaymentFailedEmailParams): string {
  return `
  <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #2B2E33;">
    <div style="background: #0E1A2B; padding: 32px; text-align: center;">
      <span style="color: #F7F5F0; font-size: 22px; letter-spacing: 2px; text-transform: uppercase;">Litigo</span>
    </div>
    <div style="padding: 32px; background: #ffffff;">
      <h1 style="font-size: 20px; color: #0E1A2B;">Hola, ${params.fullName}</h1>
      <p>No pudimos confirmar tu pago de afiliacion${params.reason ? ` (${params.reason})` : ''}.</p>
      <p>Puedes intentarlo nuevamente desde el sitio web. Si el problema persiste, escribenos a soporte@litigo.com.co.</p>
    </div>
  </div>`;
}

export async function sendPaymentFailedEmail(params: SendPaymentFailedEmailParams) {
  try {
    const resend = getResendClient();
    if (!resend) {
      console.warn('[email] RESEND_API_KEY no definido. Se omite el envío de correo de pago fallido.');
      return;
    }
    await resend.emails.send({
      from: FROM,
      to: params.to,
      subject: 'No pudimos confirmar tu pago - Litigo',
      html: paymentFailedEmailHtml(params),
    });
  } catch (error) {
    console.error('[email] No se pudo enviar el correo de pago fallido:', error);
  }
}

interface ApplicationDecisionEmailParams {
  to: string;
  fullName: string;
  url?: string;
  detail?: string;
}

async function sendApplicationDecisionEmail(params: ApplicationDecisionEmailParams, subject: string, title: string, body: string) {
  try {
    const resend = getResendClient();
    if (!resend) return;
    await resend.emails.send({
      from: FROM,
      to: params.to,
      subject,
      html: `<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#172033"><h1>${title}</h1><p>Hola, ${params.fullName}.</p><p>${body}</p>${params.detail ? `<p><strong>Detalle:</strong> ${params.detail}</p>` : ''}${params.url ? `<p><a href="${params.url}" style="background:#2563eb;color:#fff;padding:12px 18px;text-decoration:none">Continuar en Litigo</a></p>` : ''}</div>`,
    });
  } catch (error) {
    console.error('[email] No se pudo enviar correo de decisión:', error);
  }
}

export async function sendApplicationApprovedEmail(params: ApplicationDecisionEmailParams) {
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(`Hola, soy ${params.fullName}. Mi solicitud de afiliacion fue aprobada. Quiero conocer los medios de pago para activar mi membresia.`)}`;

  try {
    const resend = getResendClient();
    if (!resend) return;
    await resend.emails.send({
      from: FROM,
      to: params.to,
      subject: 'Tu solicitud fue aprobada - Litigo',
      html: `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#172033">
        <div style="background:#0E1A2B;padding:32px;text-align:center">
          <span style="color:#F7F5F0;font-size:22px;letter-spacing:2px;text-transform:uppercase">Litigo</span>
        </div>
        <div style="padding:32px;background:#ffffff">
          <h1 style="font-size:20px;color:#0E1A2B">Solicitud aprobada</h1>
          <p>Hola, ${params.fullName}.</p>
          <p>El equipo reviso tu solicitud y fue <strong>aprobada</strong>.</p>
          <p>Para activar tu membresia y conocer los medios de pago, contacta a nuestro equipo de cobranza por WhatsApp:</p>
          <div style="text-align:center;margin:30px 0">
            <a href="${whatsappUrl}" target="_blank" style="display:inline-block;background:#25D366;color:#ffffff;padding:14px 28px;text-decoration:none;border-radius:8px;font-size:16px;font-weight:bold">
              Abrir WhatsApp
            </a>
          </div>
          <p style="color:#5B6472;font-size:13px;margin-top:24px">Medios de pago: Transferencia bancaria, Nequi, Daviplata</p>
          <p style="color:#5B6472;font-size:13px">Si no realizaste esta solicitud, contacta a soporte@litigo.com.co inmediatamente.</p>
        </div>
      </div>`,
    });
  } catch (error) {
    console.error('[email] No se pudo enviar correo de aprobacion:', error);
  }
}

export function sendApplicationInformationEmail(params: ApplicationDecisionEmailParams) {
  return sendApplicationDecisionEmail(params, 'Necesitamos información adicional - Litigo', 'Necesitamos más información', 'El equipo necesita algunos datos adicionales para continuar revisando tu solicitud.',);
}

export function sendApplicationRejectedEmail(params: ApplicationDecisionEmailParams) {
  return sendApplicationDecisionEmail(params, 'Actualización de tu solicitud - Litigo', 'Solicitud no aprobada', 'Después de revisar la información recibida, en este momento no podemos aprobar la solicitud.',);
}
