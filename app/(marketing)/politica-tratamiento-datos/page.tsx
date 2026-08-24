import type { Metadata } from 'next';
import { LegalDocumentShell } from '@/components/marketing/legal-document-shell';

export const metadata: Metadata = {
  title: 'Politica de Tratamiento de Datos | LITIGO S.A.S.',
  description:
    'Consulta la Politica de Tratamiento de Datos Personales de LITIGO S.A.S. y los derechos del titular.',
};

export default function PoliticaDatosPage() {
  return (
    <LegalDocumentShell title="POLITICA DE TRATAMIENTO DE DATOS PERSONALES - LITIGO S.A.S.">
      <p>
        En cumplimiento de la Ley 1581 de 2012, el Decreto 1377 de 2013 y demas normas concordantes sobre proteccion de datos personales en Colombia, LITIGO S.A.S., identificada con NIT [901.071.005-9], en calidad de Responsable del Tratamiento, informa:
      </p>

      <section aria-labelledby="politica-datos" className="space-y-2">
        <h2 id="politica-datos" className="text-lg font-semibold text-white sm:text-xl">1. Datos que se recolectan.</h2>
        <p>
          Nombres y apellidos, tipo y numero de identificacion, fecha de nacimiento, ciudad, departamento, barrio, telefono y correo electronico, entre otros suministrados durante el proceso de afiliacion.
        </p>
      </section>

      <section aria-labelledby="politica-finalidades" className="space-y-2">
        <h2 id="politica-finalidades" className="text-lg font-semibold text-white sm:text-xl">1. Finalidades del tratamiento.</h2>
        <p>Los datos seran utilizados para:</p>
        <ol className="list-none space-y-2 pl-0">
          <li>(i) gestionar el proceso de afiliacion y perfilamiento;</li>
          <li>(ii) prestar los servicios de asesoria, representacion y defensa juridica contratados;</li>
          <li>(iii) efectos de facturacion y cobro de la cuota mensual;</li>
          <li>(iv) enviar comunicaciones relacionadas con el servicio;</li>
          <li>(v) dar cumplimiento a obligaciones legales, contractuales y regulatorias.</li>
        </ol>
      </section>

      <section aria-labelledby="politica-derechos" className="space-y-2">
        <h2 id="politica-derechos" className="text-lg font-semibold text-white sm:text-xl">1. Derechos del titular.</h2>
        <p>Como titular de los datos, usted tiene derecho a:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Conocer, actualizar y rectificar sus datos personales.</li>
          <li>Solicitar prueba de la autorizacion otorgada.</li>
          <li>Ser informado sobre el uso dado a sus datos.</li>
          <li>Presentar quejas ante la Superintendencia de Industria y Comercio (SIC) por infracciones a la ley.</li>
          <li>Revocar la autorizacion y/o solicitar la supresion de sus datos, cuando no exista un deber legal o contractual que impida su eliminacion.</li>
          <li>Acceder de forma gratuita a sus datos personales que hayan sido objeto de tratamiento.</li>
        </ul>
      </section>

      <section aria-labelledby="politica-procedimiento" className="space-y-2">
        <h2 id="politica-procedimiento" className="text-lg font-semibold text-white sm:text-xl">1. Procedimiento para ejercer sus derechos.</h2>
        <p>
          Las solicitudes, consultas y reclamos podran presentarse a traves de{' '}
          <a
            href="mailto:litigojarvis@gmail.com"
            className="font-medium text-gold-light underline underline-offset-2 hover:text-white focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07090B]"
          >
            litigojarvis@gmail.com
          </a>
          , indicando nombre completo, documento de identidad y el motivo de la solicitud.
        </p>
        <p>
          Las consultas seran atendidas en un termino maximo de quince (15) dias habiles y los reclamos en un termino maximo de quince (15) dias habiles, prorrogable por ocho (8) dias habiles adicionales cuando sea necesario.
        </p>
      </section>

      <section aria-labelledby="politica-seguridad" className="space-y-2">
        <h2 id="politica-seguridad" className="text-lg font-semibold text-white sm:text-xl">1. Seguridad de la informacion.</h2>
        <p>
          LITIGO S.A.S. adopta medidas tecnicas, humanas y administrativas razonables para proteger la informacion personal contra perdida, acceso no autorizado, uso indebido, fraude o alteracion.
        </p>
      </section>

      <section aria-labelledby="politica-transferencia" className="space-y-2">
        <h2 id="politica-transferencia" className="text-lg font-semibold text-white sm:text-xl">1. Transferencia y transmision de datos.</h2>
        <p>
          Los datos podran ser compartidos con terceros unicamente cuando sea necesario para la correcta prestacion del servicio, por ejemplo, apoderados o profesionales del derecho asignados al caso, garantizando siempre condiciones de confidencialidad.
        </p>
      </section>

      <section aria-labelledby="politica-vigencia" className="space-y-2">
        <h2 id="politica-vigencia" className="text-lg font-semibold text-white sm:text-xl">1. Vigencia.</h2>
        <p>
          Esta politica rige a partir de su publicacion y los datos personales se conservaran durante el tiempo necesario para cumplir las finalidades descritas y las obligaciones legales aplicables.
        </p>
      </section>
    </LegalDocumentShell>
  );
}
