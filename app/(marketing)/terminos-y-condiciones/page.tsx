import type { Metadata } from 'next';
import { LegalDocumentShell } from '@/components/marketing/legal-document-shell';

export const metadata: Metadata = {
  title: 'Terminos y Condiciones | LITIGO S.A.S.',
  description:
    'Consulta los Terminos y Condiciones de uso de la plataforma digital de LITIGO S.A.S.',
};

export default function TerminosPage() {
  return (
    <LegalDocumentShell title="TERMINOS Y CONDICIONES DE USO - PLATAFORMA LITIGO S.A.S.">
      <section aria-labelledby="termino-aceptacion" className="space-y-2">
        <h2 id="termino-aceptacion" className="text-lg font-semibold text-white sm:text-xl">1. Aceptacion.</h2>
        <p>
          El acceso y uso de esta plataforma implica la aceptacion plena de los presentes terminos y condiciones. Si no esta de acuerdo, no debe continuar con el proceso de afiliacion.
        </p>
      </section>

      <section aria-labelledby="termino-capacidad" className="space-y-2">
        <h2 id="termino-capacidad" className="text-lg font-semibold text-white sm:text-xl">1. Capacidad legal.</h2>
        <p>
          El usuario declara ser mayor de edad y contar con capacidad legal para contratar, y que la informacion suministrada en el proceso de afiliacion es veraz, exacta y actualizada.
        </p>
      </section>

      <section aria-labelledby="termino-veracidad" className="space-y-2">
        <h2 id="termino-veracidad" className="text-lg font-semibold text-white sm:text-xl">1. Veracidad de la informacion.</h2>
        <p>
          LITIGO S.A.S. no se hace responsable por las consecuencias derivadas de informacion falsa, incompleta o desactualizada suministrada por el usuario durante el registro o perfilamiento.
        </p>
      </section>

      <section aria-labelledby="termino-uso" className="space-y-2">
        <h2 id="termino-uso" className="text-lg font-semibold text-white sm:text-xl">1. Uso adecuado de la plataforma.</h2>
        <p>
          El usuario se compromete a utilizar la plataforma unicamente para los fines para los que fue dispuesta, absteniendose de realizar cualquier uso fraudulento, ilegal o que afecte el funcionamiento del servicio o los derechos de terceros.
        </p>
      </section>

      <section aria-labelledby="termino-propiedad" className="space-y-2">
        <h2 id="termino-propiedad" className="text-lg font-semibold text-white sm:text-xl">1. Propiedad intelectual.</h2>
        <p>
          Todos los contenidos, marcas, logotipos, textos y desarrollos tecnologicos de la plataforma son propiedad de LITIGO S.A.S. o de sus licenciantes, y estan protegidos por la normatividad vigente en materia de propiedad intelectual.
        </p>
      </section>

      <section aria-labelledby="termino-disponibilidad" className="space-y-2">
        <h2 id="termino-disponibilidad" className="text-lg font-semibold text-white sm:text-xl">1. Disponibilidad del servicio.</h2>
        <p>
          LITIGO S.A.S. procurara mantener la plataforma disponible de forma continua, pero no garantiza la ausencia de interrupciones por mantenimiento, fallas tecnicas o causas de fuerza mayor.
        </p>
      </section>

      <section aria-labelledby="termino-relacion" className="space-y-2">
        <h2 id="termino-relacion" className="text-lg font-semibold text-white sm:text-xl">1. Relacion con el contrato de afiliacion.</h2>
        <p>
          Estos terminos regulan el uso de la plataforma digital y son independientes, pero complementarios, al Contrato de Afiliacion, el cual regula la prestacion de los servicios juridicos propiamente dichos.
        </p>
      </section>

      <section aria-labelledby="termino-modificaciones" className="space-y-2">
        <h2 id="termino-modificaciones" className="text-lg font-semibold text-white sm:text-xl">1. Modificaciones.</h2>
        <p>
          LITIGO S.A.S. podra actualizar estos terminos en cualquier momento. Los cambios se entenderan aceptados por el uso continuado de la plataforma despues de su publicacion.
        </p>
      </section>

      <section aria-labelledby="termino-ley" className="space-y-2">
        <h2 id="termino-ley" className="text-lg font-semibold text-white sm:text-xl">1. Ley aplicable y jurisdiccion.</h2>
        <p>
          Los presentes terminos se rigen por las leyes de la Republica de Colombia. Cualquier controversia sera resuelta ante los jueces competentes, sin perjuicio de mecanismos alternativos de solucion de conflictos que las partes puedan acordar.
        </p>
      </section>

      <section aria-labelledby="termino-contacto" className="space-y-2">
        <h2 id="termino-contacto" className="text-lg font-semibold text-white sm:text-xl">1. Contacto.</h2>
        <p>
          Para consultas relacionadas con estos terminos, el usuario puede comunicarse a traves de{' '}
          <a
            href="mailto:litigojarvis@gmail.com"
            className="font-medium text-gold-light underline underline-offset-2 hover:text-white focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07090B]"
          >
            litigojarvis@gmail.com
          </a>
          .
        </p>
      </section>
    </LegalDocumentShell>
  );
}
