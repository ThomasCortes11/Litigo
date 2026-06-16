/**
 * Seed inicial de la base de datos.
 * Ejecutar con: npm run db:seed
 */
import { PrismaClient, LegalDocumentType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Sembrando roles...');
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

  console.log('Sembrando usuario administrador inicial...');
  const passwordHash = await bcrypt.hash('CambiarEstaClave123!', 10);
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

  console.log('Sembrando configuracion base...');
  const settings: Array<{ key: string; value: string; description: string }> = [
    { key: 'company_name', value: 'Litigo', description: 'Nombre comercial' },
    { key: 'company_nit', value: '900.000.000-1', description: 'NIT del bufete' },
    { key: 'membership_price', value: '49900', description: 'Valor mensual de la membresia en COP' },
    { key: 'support_email', value: 'soporte@litigo.com.co', description: 'Correo de soporte' },
    { key: 'support_phone', value: '+57 300 000 0000', description: 'Telefono de soporte' },
  ];
  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }

  console.log('Sembrando documentos legales...');
  const documents: Array<{ type: LegalDocumentType; title: string; content: string }> = [
    {
      type: 'TERMS',
      title: 'Terminos y Condiciones',
      content: 'Texto de terminos y condiciones pendiente de redaccion final por el equipo legal de Litigo.',
    },
    {
      type: 'CONTRACT',
      title: 'Contrato de Afiliacion',
      content: 'Texto del contrato de afiliacion pendiente de redaccion final por el equipo legal de Litigo.',
    },
    {
      type: 'DATA_POLICY',
      title: 'Politica de Tratamiento de Datos',
      content: 'Texto de la politica de tratamiento de datos personales pendiente de redaccion final, conforme a la Ley 1581 de 2012.',
    },
  ];
  for (const doc of documents) {
    const existing = await prisma.legalDocument.findFirst({ where: { type: doc.type, isActive: true } });
    if (!existing) {
      await prisma.legalDocument.create({ data: doc });
    }
  }

  console.log('Seed completado.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
