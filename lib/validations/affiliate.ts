import { z } from 'zod';

export const affiliateFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(5, 'Ingresa tu nombre completo')
    .max(120, 'El nombre es demasiado largo')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios'),

  documentType: z.enum(['CC', 'CE', 'PASAPORTE'], {
    errorMap: () => ({ message: 'Selecciona un tipo de documento valido' }),
  }),

  documentNumber: z
    .string()
    .trim()
    .min(5, 'El numero de documento es demasiado corto')
    .max(20, 'El numero de documento es demasiado largo')
    .regex(/^[0-9A-Za-z-]+$/, 'El numero de documento contiene caracteres invalidos'),

  email: z.string().trim().toLowerCase().email('Ingresa un correo electronico valido'),

  phone: z
    .string()
    .trim()
    .regex(/^(\+?57)?[0-9]{10}$/, 'Ingresa un numero de telefono colombiano valido (10 digitos)'),

  city: z.string().trim().min(2, 'Ingresa tu ciudad').max(80, 'Nombre de ciudad demasiado largo'),

  acceptedContract: z.literal(true, {
    errorMap: () => ({ message: 'Debes aceptar el contrato de afiliacion' }),
  }),
  acceptedTerms: z.literal(true, {
    errorMap: () => ({ message: 'Debes aceptar los terminos y condiciones' }),
  }),
  acceptedDataPolicy: z.literal(true, {
    errorMap: () => ({ message: 'Debes aceptar la politica de tratamiento de datos' }),
  }),
});

export type AffiliateFormValues = z.infer<typeof affiliateFormSchema>;

export const adminLoginSchema = z.object({
  email: z.string().trim().toLowerCase().email('Correo invalido'),
  password: z.string().min(8, 'La contrasena debe tener al menos 8 caracteres'),
});

export const updateAffiliateSchema = z.object({
  id: z.string().uuid(),
  fullName: z.string().trim().min(5).max(120),
  email: z.string().trim().toLowerCase().email(),
  phone: z.string().trim().regex(/^(\+?57)?[0-9]{10}$/),
  city: z.string().trim().min(2).max(80),
});

export const affiliateStatusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(['PENDING', 'ACTIVE', 'INACTIVE', 'SUSPENDED']),
});
