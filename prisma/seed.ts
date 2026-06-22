/**
 * Seed inicial de la base de datos.
 * Ejecutar con: npm run db:seed
 */
import { PrismaClient, LegalDocumentType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🔹 Sembrando roles...');
  const superadmin = await prisma.role.upsert({
    where: { name: 'SUPERADMIN' },
    update: {},
    create: { name: 'SUPERADMIN', description: 'Acceso total al sistema' },
  });
  await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: { name: 'ADMIN', description: 'Gestion de afiliados y configuracion' },
  });
  await prisma.role.upsert({
    where: { name: 'ANALYST' },
    update: {},
    create: { name: 'ANALYST', description: 'Solo lectura de reportes' },
  });

  console.log('🔹 Sembrando usuario administrador inicial...');
  const passwordHash = await bcrypt.hash('CambiarEstaClave123!', 12);
  await prisma.user.upsert({
    where: { email: 'admin@litigo.com.co' },
    update: {},
    create: {
      name: 'Administrador Litigo',
      email: 'admin@litigo.com.co',
      passwordHash,
      roleId: superadmin.id,
    },
  });

  console.log('🔹 Sembrando configuracion base...');
  const settings: Array<{ key: string; value: string; description: string }> = [
    {
      key: 'company_name',
      value: 'Litigo',
      description: 'Nombre comercial de la empresa',
    },
    {
      key: 'company_nit',
      value: '900.000.000-1',
      description: 'NIT del bufete',
    },
    {
      key: 'membership_price',
      value: '49900',
      description: 'Valor mensual de la membresia en COP (sin puntos ni comas)',
    },
    {
      key: 'support_email',
      value: 'soporte@litigo.com.co',
      description: 'Correo electronico de soporte al cliente',
    },
    {
      key: 'support_phone',
      // ← Cambiar al numero real antes de ir a produccion.
      // El hero section lo lee dinamicamente desde aqui via SSR;
      // actualizarlo en /admin/configuracion lo refleja de inmediato.
      value: '+57 300 000 0000',
      description: 'Telefono / WhatsApp de contacto (incluir codigo de pais)',
    },
  ];

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }

  console.log('🔹 Sembrando documentos legales...');
  const documents: Array<{ type: LegalDocumentType; title: string; content: string }> = [
    {
      type: 'TERMS',
      title: 'Terminos y Condiciones',
      content:
        'Texto de terminos y condiciones pendiente de redaccion final por el equipo legal de Litigo.\n\nEste documento debe ser reemplazado desde /admin/configuracion antes de abrir el sitio al publico.',
    },
    {
      type: 'CONTRACT',
      title: 'Contrato de Afiliacion',
      content:
        'Texto del contrato de afiliacion pendiente de redaccion final por el equipo legal de Litigo.\n\nEste documento debe ser reemplazado desde /admin/configuracion antes de abrir el sitio al publico.',
    },
    {
      type: 'DATA_POLICY',
      title: 'Politica de Tratamiento de Datos Personales',
      content:
        'Texto de la politica de tratamiento de datos personales pendiente de redaccion final, conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013.\n\nEste documento debe ser reemplazado desde /admin/configuracion antes de abrir el sitio al publico.',
    },
  ];

  for (const doc of documents) {
    const existing = await prisma.legalDocument.findFirst({
      where: { type: doc.type, isActive: true },
    });
    if (!existing) {
      await prisma.legalDocument.create({ data: doc });
    }
  }

  console.log('✅ Seed completado.\n');
  console.log('   Usuario admin:  admin@litigo.com.co');
  console.log('   Contrasena:     CambiarEstaClave123!');
  console.log('   ⚠️  Cambia la contrasena antes de ir a produccion.\n');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
