# Litigo - Plataforma de afiliación jurídica

Plataforma web para captacion de potenciales clientes, asesoría inicial gratuita, perfilamiento jurídico, evaluación interna, aprobación y activación de membresías con Wompi.

## Qué es Litigo

Litigo es una plataforma web de captación y afiliación jurídica para personas y empresas en Colombia. Su propósito es acompañar el camino inicial: recibir una solicitud, entender la situación jurídica, ofrecer una asesoría inicial gratuita, revisar el perfil y, si es aprobado, habilitar el pago de una membresía mensual.

Litigo no es un gestor de expedientes, procesos judiciales, actuaciones, casos ni tickets jurídicos. Después de activar la membresía, la atención jurídica continúa directamente con el abogado asignado.

## Flujo de negocio

```text
Captación -> Perfilamiento -> Revisión interna -> Aprobación
  -> Oferta -> Checkout Wompi -> Webhook firmado
  -> Membresía activa -> Atención directa con el abogado
```

La solicitud no garantiza aceptación. El checkout solo se genera para solicitudes aprobadas y la membresía solo se activa desde el webhook firmado de Wompi.

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
16. [Arquitectura detallada](#arquitectura-detallada)
17. [GitHub](#github)

## Resumen

Litigo ofrece dos experiencias principales:

- Sitio publico comercial con contenido legal e informacion de la membresia.
- Flujo de captación, perfilamiento, revisión y oferta de membresía.
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

1. El visitante registra sus datos básicos.
2. Completa el perfilamiento jurídico por áreas y preguntas condicionales.
3. El backend guarda la solicitud como SUBMITTED.
4. El equipo revisa, solicita información, realiza la asesoría inicial y decide.
5. Solo una solicitud APPROVED puede iniciar checkout.
6. El webhook firmado de Wompi confirma el pago y activa la membresía.
7. Litigo muestra el estado de membresía y el contacto del responsable; no gestiona expedientes ni procesos judiciales.

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
- docs/ARCHITECTURE.md: responsabilidades de frontend, backend, seguridad y despliegue

## Separacion Frontend y Backend

Regla base del proyecto:

- Frontend presenta informacion y captura interacciones.
- Backend valida, decide y persiste.

Contrato tecnico entre capas:

- Frontend no activa afiliaciones ni confirma pagos por su cuenta.
- Frontend no decide estados, aprobación ni precio.
- Backend solo activa membresias con webhook firmado de Wompi.
- La UI consume server actions o endpoints y muestra estados resultantes.

Guia rapida para nuevos cambios:

- Cambio visual o UX: app/* y components/*.
- Cambio de reglas de negocio: lib/services/*.
- Cambio de validaciones: lib/validations/*.
- Cambio de entrada/salida de datos: lib/actions/* o app/api/*.
- Cambio de modelo de datos: prisma/schema.prisma + migracion.

La explicación completa de capas, transiciones y reglas de seguridad está en [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Requisitos previos

- Node.js 20 o superior
- npm 10 o superior
- PostgreSQL accesible desde la app

## Instalación e inicio local

1. Instalar dependencias:

  ```bash
  npm install
  ```

2. Crear el archivo de entorno local:

  ```powershell
  Copy-Item .env.example .env
  ```

3. Generar el secreto de Auth.js:

  ```bash
  npx auth secret
  ```

4. Aplicar migraciones y cargar datos iniciales:

   ```bash
   npm run db:migrate
   npm run db:seed
   ```

5. Ejecutar en desarrollo:

  ```bash
  npm run dev
  ```

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

Para Wompi usa sandbox durante el desarrollo. En producción, cambia las llaves, la URL de API y verifica que el endpoint `/api/webhooks/wompi` esté configurado en la cuenta correcta.

## Scripts disponibles

- npm run dev: genera cliente Prisma y levanta Next.js en modo desarrollo
- npm run build: genera cliente Prisma y compila para produccion
- npm run start: inicia app ya compilada
- npm run lint: valida codigo TS/TSX con ESLint
- npm test: verifica transiciones válidas e inválidas de solicitudes
- npm run db:migrate: crea/aplica migraciones en entorno local
- npm run db:migrate:deploy: aplica migraciones en entornos desplegados
- npm run db:seed: ejecuta semillas iniciales
- npm run db:studio: abre Prisma Studio
- npm run vercel-build: build para Vercel con migracion condicional

Validación recomendada antes de cada pull request:

```bash
npm test
npm run lint
npm run build
```

## Flujos principales

### Afiliacion publica

- Entrada: formulario en /afiliacion
- Continuación: /afiliacion/perfilamiento?token=...
- Validacion: Zod en server actions
- Persistencia: Affiliate + Application + ApplicationAnswer + ApplicationDocument
- Salida: solicitud SUBMITTED y espera de revisión

### Evaluación y aprobación

- El panel muestra respuestas, documentos y evaluaciones internas.
- Roles ADMIN, SUPERADMIN y REVIEWER pueden tomar decisiones autorizadas.
- Las transiciones se validan en `lib/services/application-service.ts` y se auditan.
- APPROVED no activa membresía: solo habilita la oferta en `/afiliacion/oferta`.

### Pago y membresía

- `initiateMembershipCheckout` carga el plan activo desde `MembershipPlan`.
- La acción exige token válido, solicitud APPROVED y ausencia de membresía activa.
- Crea `Payment` PENDING y cambia la solicitud a PAYMENT_PENDING en una transacción.
- El redirect de Wompi solo mejora la UX; nunca activa membresías.
- El webhook firmado es la única fuente de verdad y procesa eventos idempotentemente.
- La renovación mensual, tokenización y cobro automático dependen del producto Wompi habilitado en la cuenta. No se inventan endpoints: deben configurarse y validarse con Wompi antes de implementarlos.

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
- Captacion y evaluación: Affiliate, Application, ApplicationAnswer, ApplicationDocument, ApplicationEvaluation
- Operacion comercial: MembershipPlan, Membership, Payment
- Contenido legal y parametros: LegalDocument, Setting
- Trazabilidad: AuditLog

Convenciones importantes del modelo:

- UUID como PK en todas las tablas
- Soft delete en entidades administrativas/operativas
- Indices para filtros de panel y consultas frecuentes
- La migración `20260818000000_application_membership_flow` es aditiva: no elimina datos de `Affiliate`, `Payment` ni `Membership`.
- Los registros antiguos permanecen compatibles; deben revisarse y, si aplica, asociarse a una solicitud histórica durante la puesta en producción.

Estados de solicitud: `DRAFT`, `SUBMITTED`, `UNDER_REVIEW`, `INITIAL_CONSULTATION`, `AWAITING_INFORMATION`, `APPROVED`, `REJECTED`, `PAYMENT_PENDING`, `ACTIVE`, `PAYMENT_PAST_DUE`, `CANCELLED`.

Estados de membresía: `PENDING`, `ACTIVE`, `PAST_DUE`, `CANCELLED`, `EXPIRED`.

Roles previstos: `SUPERADMIN`/`ADMIN` para control operativo, `REVIEWER` para evaluación y decisiones permitidas, `LAWYER` como responsable asignable y `ANALYST` para lectura según autorización.

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
- Ejecutar la migración incremental con respaldo de PostgreSQL
- Crear al menos un `MembershipPlan` activo con precio y condiciones reales
- Confirmar que la cuenta Wompi soporta el producto de renovación requerido
- Habilitar almacenamiento privado/autorizado para documentos antes de producción. La versión actual de `@vercel/blob` solo tipa acceso `public`; el MVP no devuelve URLs de documentos, pero esto no sustituye una descarga autenticada.
- Validar NEXT_PUBLIC_APP_URL con dominio final
- Revisar accesibilidad y responsive en vistas clave

## Troubleshooting

Error en migraciones:

- Verificar DATABASE_URL
- Confirmar conectividad y permisos sobre la BD

No activa una membresia tras pagar:

- Revisar logs de /api/webhooks/wompi
- Validar llaves WOMPI_EVENTS_SECRET y WOMPI_PRIVATE_KEY
- Confirmar URL del webhook en panel Wompi y que la solicitud estaba en PAYMENT_PENDING

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

## Arquitectura detallada

Consulta [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) para conocer:

- qué pertenece al frontend y qué pertenece al backend;
- dónde viven las acciones, servicios y validaciones;
- cómo funciona la máquina de estados;
- cómo se protege el checkout;
- cómo se procesa el webhook de Wompi;
- cómo organizar futuras modificaciones.

## GitHub

El repositorio remoto configurado es `origin`. Para revisar el estado local:

```bash
git status
git branch --show-current
git remote -v
```

Para subir cambios ya validados:

```bash
git add .
git commit -m "ajuste final de diseño y lógica en página"
git push origin main
```

Antes del `git add`, confirma que no aparezcan `.env`, `node_modules`, `.next` ni logs locales. El archivo `build_run.log` está excluido por `.gitignore`.

---

Si necesitas, el siguiente paso puede ser agregar una carpeta docs con:

- Runbook operativo (incidentes y recuperacion)
- Guia de onboarding tecnico
- Checklist QA funcional por flujo
