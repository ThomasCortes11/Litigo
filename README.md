# Litigo - Plataforma de Afiliacion Juridica

Plataforma web para captacion de afiliados, cobro de membresia con Wompi, activacion automatica y gestion administrativa interna.

## Tabla de contenido

1. [Resumen](#resumen)
2. [Stack tecnologico](#stack-tecnologico)
3. [Arquitectura funcional](#arquitectura-funcional)
4. [Estructura del proyecto](#estructura-del-proyecto)
5. [Separacion Frontend y Backend](#separacion-frontend-y-backend)
6. [Requisitos previos](#requisitos-previos)
7. [Instalacion e inicio local](#instalacion-e-inicio-local)
8. [Variables de entorno](#variables-de-entorno)
9. [Scripts disponibles](#scripts-disponibles)
10. [Flujos principales](#flujos-principales)
11. [Base de datos](#base-de-datos)
12. [Despliegue](#despliegue)
13. [Checklist preproduccion](#checklist-preproduccion)
14. [Troubleshooting](#troubleshooting)
15. [Convenciones del proyecto](#convenciones-del-proyecto)

## Resumen

Litigo ofrece dos experiencias principales:

- Sitio publico comercial con contenido legal e informacion de la membresia.
- Flujo de afiliacion con formulario, checkout en Wompi y confirmacion.
- Panel administrativo protegido para gestionar afiliados y configuracion.

Puntos clave de negocio:

- La fuente de verdad del pago es el webhook firmado de Wompi.
- La activacion de la membresia ocurre por backend, no por redirect del navegador.
- Existe auditoria de acciones administrativas y validaciones de datos con Zod.

## Stack tecnologico

- Next.js 16 (App Router)
- React 18 + TypeScript
- Tailwind CSS
- Prisma ORM + PostgreSQL
- Auth.js v5 (credenciales para panel admin)
- Wompi (checkout y webhooks)
- Resend (correo transaccional)
- Vercel Blob (adjuntos/archivos)

## Arquitectura funcional

1. Usuario completa formulario en el sitio publico.
2. Backend crea afiliado en estado PENDING y orden de pago.
3. Usuario es redirigido al checkout de Wompi.
4. Wompi envia webhook firmado a la API del sistema.
5. Backend valida firma, actualiza pago y activa afiliacion/membresia.
6. Admin consulta y gestiona todo desde el panel.

## Estructura del proyecto

Frontend (render/UI):

- app/(marketing)/: landing y paginas legales indexables
- app/afiliacion/: formulario, confirmacion y error de pago
- app/admin/: login y dashboard protegido
- components/ui/: componentes base reutilizables
- components/marketing/: bloques del sitio publico
- components/afiliacion/: formulario y sidebar de confianza
- components/admin/: tablas, filtros y formularios internos

Backend (reglas/API/datos):

- app/api/auth/[...nextauth]/: endpoints de autenticacion
- app/api/webhooks/wompi/: recepcion y validacion de eventos Wompi
- lib/actions/: server actions (capa de entrada de mutaciones)
- lib/services/: logica de negocio y orquestacion
- lib/validations/: esquemas Zod y validaciones
- lib/auth.ts y lib/auth.config.ts: autenticacion en Node y Edge
- lib/wompi.ts: checkout + verificacion de firma
- lib/email.ts: envio de correos
- lib/audit.ts: bitacora de acciones
- lib/rate-limit.ts: limitador de intentos
- prisma/schema.prisma: modelos y relaciones de base de datos
- prisma/seed.ts: datos iniciales (roles, admin, settings, documentos)
- scripts/vercel-build.js: build para Vercel con migraciones condicionales

## Separacion Frontend y Backend

Regla base del proyecto:

- Frontend presenta informacion y captura interacciones.
- Backend valida, decide y persiste.

Contrato tecnico entre capas:

- Frontend no activa afiliaciones ni confirma pagos por su cuenta.
- Backend solo activa membresias con webhook firmado de Wompi.
- La UI consume server actions o endpoints y muestra estados resultantes.

Guia rapida para nuevos cambios:

- Cambio visual o UX: app/* y components/*.
- Cambio de reglas de negocio: lib/services/*.
- Cambio de validaciones: lib/validations/*.
- Cambio de entrada/salida de datos: lib/actions/* o app/api/*.
- Cambio de modelo de datos: prisma/schema.prisma + migracion.

## Requisitos previos

- Node.js 20 o superior
- npm 10 o superior
- PostgreSQL accesible desde la app

## Instalacion e inicio local

1. Instalar dependencias.

  npm install

2. Crear el archivo de entorno local.

  copiar .env.example a .env

3. Generar secreto de Auth.js.

  npx auth secret

4. Aplicar migraciones.

  npm run db:migrate

5. Cargar datos semilla.

  npm run db:seed

6. Ejecutar en desarrollo.

  npm run dev

Rutas locales habituales:

- http://localhost:3000
- http://localhost:3000/afiliacion
- http://localhost:3000/admin/login

Credenciales iniciales de admin creadas por seed:

- Correo: admin@litigo.com.co
- Contrasena: CambiarEstaClave123!

Importante: cambiar esa contrasena antes de cualquier despliegue real.

## Variables de entorno

Referencia completa en .env.example.

Obligatorias:

- DATABASE_URL: conexion a PostgreSQL
- AUTH_SECRET: secreto de sesion Auth.js
- AUTH_URL: URL base para auth
- WOMPI_PUBLIC_KEY
- WOMPI_PRIVATE_KEY
- WOMPI_EVENTS_SECRET
- WOMPI_INTEGRITY_SECRET
- WOMPI_API_URL
- NEXT_PUBLIC_APP_URL

Condicionales segun funcionalidades habilitadas:

- RESEND_API_KEY (si se enviaran correos)
- EMAIL_FROM (si se enviaran correos)
- BLOB_READ_WRITE_TOKEN (si se usa Vercel Blob)

Recomendaciones:

- En desarrollo usar WOMPI_API_URL con sandbox.
- En produccion usar WOMPI_API_URL de production.
- No subir .env al repositorio.

## Scripts disponibles

- npm run dev: genera cliente Prisma y levanta Next.js en modo desarrollo
- npm run build: genera cliente Prisma y compila para produccion
- npm run start: inicia app ya compilada
- npm run lint: valida codigo TS/TSX con ESLint
- npm run db:migrate: crea/aplica migraciones en entorno local
- npm run db:migrate:deploy: aplica migraciones en entornos desplegados
- npm run db:seed: ejecuta semillas iniciales
- npm run db:studio: abre Prisma Studio
- npm run vercel-build: build para Vercel con migracion condicional

## Flujos principales

### Afiliacion publica

- Entrada: formulario en /afiliacion
- Validacion: Zod en server action
- Persistencia: afiliado y pago en estado PENDING
- Salida: URL firmada de checkout Wompi

### Confirmacion de pago

- El redirect mejora UX, pero no activa por si solo.
- Activacion real: evento de webhook validado por firma.

### Administracion

- Middleware protege todo /admin excepto /admin/login
- Auth.js usa credenciales en base de datos
- Cambios relevantes quedan auditados

## Base de datos

El esquema incluye entidades para:

- Seguridad interna: Role, User
- Operacion comercial: Affiliate, Membership, Payment
- Contenido legal y parametros: LegalDocument, Setting
- Trazabilidad: AuditLog

Convenciones importantes del modelo:

- UUID como PK en todas las tablas
- Soft delete en entidades administrativas/operativas
- Indices para filtros de panel y consultas frecuentes

## Despliegue

Recomendado en Vercel:

1. Importar repositorio en Vercel.
2. Configurar variables de entorno segun .env.example.
3. Conectar PostgreSQL administrado.
4. Configurar endpoint webhook de Wompi:
  https://tu-dominio.com/api/webhooks/wompi
5. Desplegar usando script vercel-build.

Nota: vercel-build.js aplica db:migrate:deploy solo cuando DATABASE_URL no apunta a localhost.

## Checklist preproduccion

- Cambiar credenciales iniciales de administrador
- Completar numero real de soporte en configuracion
- Reemplazar documentos legales seed por versiones finales
- Confirmar webhook firmado activo y probando eventos reales
- Configurar llaves Wompi de produccion
- Verificar envio de correo (si aplica)
- Validar NEXT_PUBLIC_APP_URL con dominio final
- Revisar accesibilidad y responsive en vistas clave

## Troubleshooting

Error en migraciones:

- Verificar DATABASE_URL
- Confirmar conectividad y permisos sobre la BD

No activa una afiliacion tras pagar:

- Revisar logs de /api/webhooks/wompi
- Validar llaves WOMPI_EVENTS_SECRET y WOMPI_PRIVATE_KEY
- Confirmar URL del webhook en panel Wompi

No funciona login admin:

- Confirmar que existe usuario activo en tabla users
- Confirmar hash bcrypt valido en passwordHash
- Revisar AUTH_SECRET y AUTH_URL

## Convenciones del proyecto

- Mantener logica de negocio en lib/services y lib/actions
- Mantener validaciones en lib/validations
- Reusar componentes base desde components/ui
- Evitar mezclar decisiones de UI con reglas de negocio
- Auditar mutaciones administrativas relevantes

---

Si necesitas, el siguiente paso puede ser agregar una carpeta docs con:

- Runbook operativo (incidentes y recuperacion)
- Guia de onboarding tecnico
- Checklist QA funcional por flujo
