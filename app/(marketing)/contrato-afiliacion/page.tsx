import type { Metadata } from 'next';
import { LegalDocumentShell } from '@/components/marketing/legal-document-shell';

export const metadata: Metadata = {
  title: 'Contrato de Afiliacion | LITIGO S.A.S.',
  description:
    'Consulta el Contrato de Afiliacion a servicios de asesoria y defensa juridica de LITIGO S.A.S.',
};

export default function ContratoPage() {
  return (
    <LegalDocumentShell title="CONTRATO DE AFILIACION A SERVICIOS DE ASESORIA Y DEFENSA JURIDICA">
      <p>
        Entre LITIGO S.A.S., sociedad identificada con NIT [901.071.005-9], en adelante &quot;LA SOCIEDAD&quot;, y la persona natural que se afilia a traves de la plataforma digital, en adelante &quot;EL AFILIADO&quot;, se celebra el presente contrato de afiliacion, el cual se regira por las siguientes clausulas:
      </p>

      <section aria-labelledby="clausula-primera" className="space-y-2">
        <h2 id="clausula-primera" className="text-lg font-semibold text-white sm:text-xl">PRIMERA - OBJETO.</h2>
        <p>
          LA SOCIEDAD se obliga a prestar a EL AFILIADO servicios de asesoria, representacion y defensa de sus intereses en las distintas areas del derecho, hasta la segunda instancia procesal, a cambio del pago de una cuota mensual de afiliacion.
        </p>
      </section>

      <section aria-labelledby="clausula-segunda" className="space-y-2">
        <h2 id="clausula-segunda" className="text-lg font-semibold text-white sm:text-xl">SEGUNDA - VIGENCIA Y FORMA DE PAGO.</h2>
        <p>
          El presente contrato tiene vigencia mensual, renovable automaticamente mientras el afiliado mantenga sus pagos al dia. El valor de la cuota mensual sera el indicado en el proceso de afiliacion. Los pagos deberan efectuarse de manera anticipada, dentro de los cinco (5) dias calendario siguientes al inicio de cada periodo mensual. El incumplimiento en este plazo genera mora y la perdida temporal del derecho a la asistencia juridica hasta normalizar el pago.
        </p>
      </section>

      <section aria-labelledby="clausula-tercera" className="space-y-2">
        <h2 id="clausula-tercera" className="text-lg font-semibold text-white sm:text-xl">TERCERA - EXIGIBILIDAD DE LOS SERVICIOS.</h2>
        <p>
          Los servicios de asesoria, representacion y defensa ofrecidos por LA SOCIEDAD solo seran exigibles por EL AFILIADO a partir del pago de un minimo de dos (2) cuotas mensuales consecutivas, contadas desde la firma del presente contrato.
        </p>
        <p>
          Los hechos o procesos preexistentes a la afiliacion, asi como aquellos que se hayan originado, iniciado o cuyas causas ya existieran antes de la suscripcion del contrato, no estaran amparados por este.
        </p>
      </section>

      <section aria-labelledby="clausula-cuarta" className="space-y-2">
        <h2 id="clausula-cuarta" className="text-lg font-semibold text-white sm:text-xl">CUARTA - EXCLUSIONES.</h2>
        <p>El presente contrato no ampara:</p>
        <ol className="list-decimal space-y-2 pl-6">
          <li>Servicios requeridos por causas o hechos anteriores al ejercicio profesional del abogado o representante asignado por LA SOCIEDAD.</li>
          <li>Gastos generados por causa de fuerza mayor o caso fortuito.</li>
          <li>Multas, indemnizaciones, reparaciones, costas procesales, fotocopias, notificaciones y demas erogaciones distintas a los honorarios de asesoria, las cuales debera asumir directamente EL AFILIADO.</li>
          <li>Actos dolosos cometidos por EL AFILIADO, los cuales tienen exclusiones especificas y no generan responsabilidad alguna para LA SOCIEDAD.</li>
        </ol>
      </section>

      <section aria-labelledby="clausula-quinta" className="space-y-2">
        <h2 id="clausula-quinta" className="text-lg font-semibold text-white sm:text-xl">QUINTA - GASTOS DE PROCESO.</h2>
        <p>
          Los gastos derivados del tramite de cualquier proceso (procesales, notificaciones, copias, desplazamientos u otros) seran asumidos directamente por EL AFILIADO.
        </p>
      </section>

      <section aria-labelledby="clausula-sexta" className="space-y-2">
        <h2 id="clausula-sexta" className="text-lg font-semibold text-white sm:text-xl">SEXTA - OBLIGACIONES DE EL AFILIADO.</h2>
        <p>
          Para la prestacion eficaz del servicio, EL AFILIADO debera suministrar de manera oportuna la documentacion que le sea requerida, anexandola por el medio mas expedito posible.
        </p>
        <p>
          La demora injustificada en la entrega de dicha documentacion exonera a LA SOCIEDAD de responsabilidad por los perjuicios que dicha demora ocasione.
        </p>
      </section>

      <section aria-labelledby="clausula-septima" className="space-y-2">
        <h2 id="clausula-septima" className="text-lg font-semibold text-white sm:text-xl">SEPTIMA - TERMINACION.</h2>
        <p>
          El contrato podra darse por terminado por cualquiera de las partes, o por LA SOCIEDAD de forma unilateral en caso de mora persistente o incumplimiento de las obligaciones aqui pactadas.
        </p>
      </section>

      <section aria-labelledby="clausula-octava" className="space-y-2">
        <h2 id="clausula-octava" className="text-lg font-semibold text-white sm:text-xl">OCTAVA - TRATAMIENTO DE DATOS.</h2>
        <p>
          El tratamiento de los datos personales suministrados por EL AFILIADO se regira por la Politica de Tratamiento de Datos Personales de LA SOCIEDAD.
        </p>
      </section>

      <section aria-labelledby="clausula-novena" className="space-y-2">
        <h2 id="clausula-novena" className="text-lg font-semibold text-white sm:text-xl">NOVENA - ACEPTACION ELECTRONICA.</h2>
        <p>
          Al marcar la casilla de aceptacion y continuar con el proceso de afiliacion en la plataforma digital, EL AFILIADO declara que ha leido, entendido y aceptado en su totalidad el contenido del presente contrato, el cual tiene la misma validez que su version firmada fisicamente, de conformidad con la Ley 527 de 1999 sobre comercio electronico y firmas digitales.
        </p>
      </section>
    </LegalDocumentShell>
  );
}
