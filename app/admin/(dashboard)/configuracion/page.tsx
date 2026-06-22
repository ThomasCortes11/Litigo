import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SettingsForm } from '@/components/admin/settings-form';
import { LegalDocumentForm } from '@/components/admin/legal-document-form';

export const metadata = {
  title: 'Configuracion',
  robots: { index: false, follow: false },
};

export default async function ConfiguracionPage() {
  const [settings, legalDocuments] = await Promise.all([
    prisma.setting.findMany(),
    prisma.legalDocument.findMany({ where: { isActive: true } }),
  ]);

  const defaults = settings.reduce<Record<string, string>>((acc, s) => {
    acc[s.key] = s.value;
    return acc;
  }, {});

  const documents = legalDocuments.map((d) => ({
    type: d.type,
    title: d.title,
    content: d.content,
    version: d.version,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Configuracion</h1>
        <p className="mt-1 text-sm text-slate">
          Informacion corporativa, valor de membresia y documentos legales.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informacion general</CardTitle>
        </CardHeader>
        <CardContent>
          <SettingsForm defaults={defaults} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Documentos legales</CardTitle>
        </CardHeader>
        <CardContent>
          <LegalDocumentForm documents={documents} />
        </CardContent>
      </Card>
    </div>
  );
}
