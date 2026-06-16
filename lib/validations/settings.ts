import { z } from 'zod';

export const settingsUpdateSchema = z.object({
  company_name: z.string().trim().min(2).max(120),
  company_nit: z.string().trim().min(5).max(30),
  membership_price: z
    .string()
    .trim()
    .regex(/^[0-9]+$/, 'El valor debe ser numerico (sin puntos ni comas)'),
  support_email: z.string().trim().toLowerCase().email(),
  support_phone: z.string().trim().min(7).max(20),
});

export type SettingsUpdateValues = z.infer<typeof settingsUpdateSchema>;

export const legalDocumentUpdateSchema = z.object({
  type: z.enum(['TERMS', 'CONTRACT', 'DATA_POLICY']),
  title: z.string().trim().min(3).max(160),
  content: z.string().trim().min(20, 'El contenido es demasiado corto'),
});
