'use client';

import * as React from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { updateLegalDocumentAction, type SettingsActionState } from '@/lib/actions/settings-actions';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const initialState: SettingsActionState = { success: false };

interface LegalDoc {
  type: 'TERMS' | 'CONTRACT' | 'DATA_POLICY';
  title: string;
  content: string;
  version: number;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="gold" disabled={pending}>
      {pending ? 'Publicando...' : 'Publicar nueva version'}
    </Button>
  );
}

export function LegalDocumentForm({ documents }: { documents: LegalDoc[] }) {
  const [selectedType, setSelectedType] = React.useState<LegalDoc['type']>('TERMS');
  const [state, formAction] = useActionState(updateLegalDocumentAction, initialState);

  const selectedDoc = documents.find((d) => d.type === selectedType);

  return (
    <form action={formAction} className="space-y-5">
      {state.success && (
        <p className="rounded border border-success/30 bg-success/5 px-4 py-3 text-sm text-success">
          Documento publicado. La version anterior queda archivada.
        </p>
      )}
      {state.error && (
        <p className="rounded border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">{state.error}</p>
      )}

      <div>
        <Label htmlFor="type">Documento</Label>
        <Select
          id="type"
          name="type"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value as LegalDoc['type'])}
        >
          <option value="TERMS">Terminos y condiciones</option>
          <option value="CONTRACT">Contrato de afiliacion</option>
          <option value="DATA_POLICY">Politica de tratamiento de datos</option>
        </Select>
        {selectedDoc && <p className="mt-1 text-xs text-slate">Version actual: {selectedDoc.version}</p>}
      </div>

      <div>
        <Label htmlFor="title">Titulo</Label>
        <Input id="title" name="title" key={`title-${selectedType}`} defaultValue={selectedDoc?.title ?? ''} required />
      </div>

      <div>
        <Label htmlFor="content">Contenido</Label>
        <Textarea
          id="content"
          name="content"
          key={`content-${selectedType}`}
          defaultValue={selectedDoc?.content ?? ''}
          rows={10}
          required
        />
      </div>

      <SubmitButton />
    </form>
  );
}
