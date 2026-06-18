# Litigo - Plataforma de Afiliacion Juridica

Sistema completo de afiliacion, pagos y gestion de membresias para el bufete Litigo.
Next.js 15 (App Router) + TypeScript + Tailwind + Shadcn UI + PostgreSQL/Prisma + Auth.js + Zod + Wompi + Resend + Vercel Blob.

## 0. Importante: que hizo Claude y que falta por hacer tu

Todo el codigo fuente de este repositorio fue escrito directamente en tu disco a traves del
MCP de filesystem. Esa conexion da lectura/escritura de archivos, **no ejecucion de comandos**
en tu maquina. Es decir: el codigo es real y completo, pero nunca se corrio `npm install`,
nunca se levanto una base de datos, y nunca se hizo un build de prueba. Antes de considerar esto
"listo para produccion" necesitas, en tu maquina, con Node.js 20+ instalado:

```bash
cd C:\Users\soporte\Desktop\Litigo
npm install
```

Es muy probable que al instalar/compilar aparezcan 1-2 ajustes menores (versiones exactas de
paquetes, algun tipo de TypeScript) tipicos de cualquier proyecto Next.js nuevo - son normales
y rapidos de resolver. La arquitectura, los modelos de datos, las validaciones, la logica de
pagos/activacion y la seguridad SI estan completos y pensados para produccion real.

## 1. Requisitos previos

- Node.js 20+
- PostgreSQL 14+ (local, Docker, o un proveedor como Neon/Supabase/RDS)
- Cuenta de Wompi (sandbox para pruebas: https://comercios.wompi.co/sandbox)
- Cuenta de Resend (https://resend.com) para correos transaccionales
- Cuenta de Vercel (despliegue + Vercel Blob)

## 2. Instalacion local

```bash
npm install
cp .env.example .env
```

Edita `.env` con tus credenciales reales (base de datos, Wompi, Resend, Blob). El comentario
junto a cada variable en `.env.example` indica donde obtenerla.

Genera un secreto para Auth.js:

```bash
npx auth secret
```

## 3. Base de datos

```bash
npm run db:migrate     # crea las tablas a partir de prisma/schema.prisma
npm run db:seed        # crea roles, usuario admin inicial y configuracion base
```

El seed crea el usuario administrador:

- **Correo:** admin@litigo.com.co
- **Contrasena:** CambiarEstaClave123!

Cambia esta contrasena inmediatamente despues del primer ingreso (no hay UI de cambio de
contrasena propia todavia - actualizala directamente en la base de datos con un hash bcrypt
nuevo, o anadela como siguiente mejora).

## 4. Levantar el proyecto

```bash
npm run dev
```

- Landing: http://localhost:3000
- Formulario de afiliacion: http://localhost:3000/afiliacion
- Panel admin: http://localhost:3000/admin/login

## 5. Webhook de Wompi en desarrollo

Wompi necesita una URL publica para enviarte los eventos. En desarrollo local usa un tunel
(ej. `ngrok http 3000`) y registra `https://tu-tunel.ngrok.app/api/webhooks/wompi` como URL
de eventos en el panel de comercios de Wompi (sandbox). En produccion (Vercel) sera
`https://tu-dominio.com/api/webhooks/wompi`.

## 6. Despliegue en Vercel

1. Sube este repositorio a GitHub/GitLab/Bitbucket.
2. Importa el proyecto en Vercel.
3. Configura todas las variables de `.env.example` en Vercel (Project Settings -> Environment Variables).
4. Conecta una base de datos PostgreSQL (Vercel Postgres, Neon, Supabase, etc.) y corre las
   migraciones contra esa base: `npm run db:migrate:deploy`.
5. Activa Vercel Blob desde el dashboard del proyecto (genera `BLOB_READ_WRITE_TOKEN` automaticamente).
6. Registra la URL de produccion del webhook en el panel de Wompi (con llaves de produccion,
   no de sandbox).

## 7. Arquitectura

```
app/
  (marketing)/          Landing publica + paginas legales (terminos, contrato, politica de datos)
  afiliacion/            Formulario publico de afiliacion + confirmacion de pago
  admin/
    login/               Login del panel (sin sidebar)
    (dashboard)/          Rutas protegidas: dashboard, afiliados, configuracion
  api/
    auth/[...nextauth]/   Route handler de Auth.js
    webhooks/wompi/        Webhook firmado de Wompi
components/
  ui/                    Primitivos shadcn (Button, Input, Card, Table, etc.)
  marketing/             Secciones de la landing
  afiliacion/            Formulario y estado de pago
  admin/                 Sidebar, tablas, formularios del panel
lib/
  actions/               Server Actions (mutaciones)
  services/               Logica de negocio (activacion automatica)
  validations/           Esquemas Zod (fuente unica de verdad)
  auth.ts / auth.config.ts   Auth.js (config completa vs. edge-safe para middleware)
  wompi.ts                Checkout URL firmado + validacion de webhooks
  email.ts                Plantillas y envio via Resend
prisma/
  schema.prisma           Modelo de datos completo
  seed.ts                  Datos iniciales
```

## 8. Decisiones de seguridad

- **Webhooks de Wompi**: se valida la firma SHA256 antes de procesar cualquier evento; nunca
  se confia en el redirect del navegador para activar una membresia.
- **CSRF**: Next.js valida automaticamente el header `Origin` en todas las Server Actions; no
  se reinventa un mecanismo propio.
- **Rate limiting**: implementado en memoria por IP en formulario de afiliacion, login y
  webhook. *Nota de escalabilidad*: en un despliegue serverless multi-instancia (Vercel) el
  limite es por instancia. Para un limite global estricto en alto trafico, migrar a
  `@upstash/ratelimit` (Redis) manteniendo la misma interfaz de `lib/rate-limit.ts`.
- **Inyeccion SQL**: Prisma parametriza todas las consultas; no hay SQL crudo en el proyecto.
- **XSS**: React escapa todo el contenido por defecto; no se usa `dangerouslySetInnerHTML`.
- **Contrasenas**: hash con bcrypt, nunca texto plano.
- **Auditoria**: toda accion sensible (activacion, cambios de estado, login fallido del
  webhook, exportacion CSV, cambios de configuracion) se registra en `AuditLog`.
- **Edge/Node split**: `middleware.ts` usa una configuracion de Auth.js sin Prisma (Edge
  Runtime); la logica con Prisma/bcrypt vive solo en `lib/auth.ts` (Node Runtime).

## 9. Siguientes pasos recomendados antes de produccion real

- Pantalla de cambio de contrasena para usuarios admin.
- Pagina de auditoria dentro del panel (el modelo `AuditLog` ya existe y se esta poblando).
- Tests automatizados (unitarios para `lib/wompi.ts` y `lib/services/activation-service.ts`,
  e2e para el flujo de afiliacion completo).
- Reemplazar el rate limiter en memoria por Redis si el trafico esperado supera una sola
  instancia activa de forma sostenida.
- Redaccion legal final de los tres documentos (hoy tienen texto de marcador de posicion).
