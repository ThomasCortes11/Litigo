import Image from 'next/image';
import asesoriaJuridicaImage from '@/components/img/Asesoria Juridica.png';

export function BenefitsSection() {
  return (
    <section id="beneficios" className="section-shell relative overflow-hidden bg-paper py-14 sm:py-18 lg:py-24">
      <div className="pointer-events-none absolute -left-24 top-8 h-64 w-64 rounded-full bg-[#2F5D7C]/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 bottom-6 h-72 w-72 rounded-full bg-gold/15 blur-3xl" aria-hidden="true" />
      <div className="container">
        <div className="relative mx-auto w-full max-w-[1180px] overflow-hidden rounded-[22px] border border-[#1B2D3F]/20 bg-[#F5F3EE] p-2.5 shadow-[0_36px_80px_-42px_rgba(11,13,15,0.58)] sm:p-3.5 lg:p-4">
          <div className="group relative overflow-hidden rounded-[16px] border border-white/60 bg-[#EDE8DF]">
            <Image
              src={asesoriaJuridicaImage}
              alt="Asesoria juridica Litigo"
              priority
              className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
              sizes="(max-width: 640px) 96vw, (max-width: 1024px) 92vw, 1180px"
            />

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_15%,rgba(255,255,255,0.15),transparent_35%),linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.28)_100%)]" aria-hidden="true" />
            <div className="pointer-events-none absolute -inset-y-full left-[-35%] w-[40%] -rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-1000 group-hover:translate-x-[270%] group-hover:opacity-100" aria-hidden="true" />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 via-black/20 to-transparent sm:h-28" aria-hidden="true" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-lg border border-white/20 bg-black/25 px-3 py-2 backdrop-blur-[2px] sm:bottom-4 sm:left-4 sm:right-4 sm:px-4">
              <p className="text-[0.64rem] font-medium uppercase tracking-[0.18em] text-gold-light sm:text-[0.69rem]">LITIGO S.A.S.</p>
              <span className="text-[0.68rem] text-white/78 sm:text-[0.74rem]">Asesoria juridica inmediata</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
