# Arquitectura de Litigo

## Propósito

Litigo capta potenciales clientes, ofrece una asesoría inicial gratuita, perfila su situación jurídica, permite una revisión interna y, únicamente después de una aprobación, ofrece una membresía mensual mediante Wompi.

Litigo no gestiona expedientes, procesos judiciales, actuaciones, casos ni tickets jurídicos después de la afiliación. La atención jurídica posterior ocurre directamente con el abogado asignado.

## Capas del proyecto

```text
app/                         Rutas, páginas y Route Handlers de Next.js
components/                 Presentación y componentes reutilizables
lib/actions/                Entrada de mutaciones (Server Actions)
lib/services/               Reglas de negocio y transiciones
lib/validations/            Esquemas Zod de entrada
lib/auth*.ts                Auth.js y autorización de sesión
lib/wompi.ts                Checkout, firma de integridad y firma de eventos
lib/email.ts                Correos transaccionales no bloqueantes
lib/audit.ts                Auditoría administrativa
lib/rate-limit.ts           Limitación de intentos
prisma/schema.prisma        Modelo PostgreSQL y relaciones
prisma/migrations/          Cambios incrementales de base de datos
prisma/seed.ts              Roles, plan y configuración inicial
scripts/                    Pruebas simples y utilidades de despliegue
docs/                       Decisiones y documentación técnica
```

## Frontend

Las páginas de `app/` y los componentes de `components/` presentan información y capturan interacciones. No deben decidir estados, precios, aprobaciones ni activaciones.

- `app/(marketing)/`: landing, secciones comerciales y documentos legales.
- `app/afiliacion/`: captura inicial, perfilamiento, oferta, confirmación y error.
- `app/admin/`: login y panel protegido.
- `components/ui/`: Button, Input, Select, Textarea, Card, Badge y Label.
- `components/marketing/`: hero, beneficios, valor, proceso, confianza, FAQ, CTA y footer.
- `components/afiliacion/`: formularios, oferta y elementos de confianza.
- `components/admin/`: tablas, filtros, métricas y evaluación de solicitudes.

El sistema visual se centraliza en `app/globals.css`, `tailwind.config.ts` y `app/layout.tsx`:

- Títulos: Cormorant Garamond.
- Interfaz y textos: Inter.
- Base: `#0B0D0F`, `#FFFFFF`, `#F5F3EE`.
- Corporativo: `#163A5F` y `#2F5D7C`.
- Acento limitado: `#C5A46D`.

## Backend

Las mutaciones siguen esta dirección:

```text
Componente o página
        |
        v
Server Action / Route Handler
        |
        v
Zod validation
        |
        v
Service de negocio
        |
        v
Prisma / PostgreSQL + AuditLog
```

Responsabilidades:

- `lib/actions/`: autenticar la entrada, convertir `FormData`, devolver estados de UI y llamar servicios.
- `lib/services/`: decidir transiciones, aprobar/rechazar, crear pagos y activar membresías.
- `lib/validations/`: rechazar datos incompletos o manipulados.
- `prisma/`: persistir la fuente de verdad.
- `app/api/webhooks/wompi/`: verificar firma antes de procesar eventos.

## Flujo de solicitud

```text
DRAFT
  -> SUBMITTED
  -> UNDER_REVIEW
  -> INITIAL_CONSULTATION
  -> APPROVED
  -> PAYMENT_PENDING
  -> ACTIVE
```

Ramas permitidas:

- `UNDER_REVIEW -> AWAITING_INFORMATION -> UNDER_REVIEW`
- `UNDER_REVIEW -> REJECTED`
- `PAYMENT_PENDING -> PAYMENT_PAST_DUE`
- `ACTIVE -> PAYMENT_PAST_DUE -> ACTIVE`
- `ACTIVE -> CANCELLED`

Las transiciones se validan en `lib/services/application-service.ts`. No se debe actualizar `Application.status` directamente desde un componente.

## Pago y activación

1. Solo `Application.status === APPROVED` puede iniciar checkout.
2. El precio se carga desde `MembershipPlan` en PostgreSQL.
3. El backend crea `Payment` en `PENDING` y cambia la solicitud a `PAYMENT_PENDING`.
4. El frontend puede volver desde el redirect, pero ese redirect no activa nada.
5. El webhook firmado `transaction.updated` es la única fuente de verdad.
6. `activation-service.ts` actualiza el pago, crea una membresía y marca `Application`/`Affiliate` como activos dentro de una transacción.
7. Reintentos del mismo webhook no crean una segunda membresía.

Las renovaciones automáticas, tokenización y cobros recurrentes dependen del producto Wompi contratado. No deben implementarse endpoints no confirmados por la documentación de la cuenta.

## Seguridad

- No aceptar estados, precios o estados de pago desde el navegador.
- Proteger `/admin` con `proxy.ts` y validar autorización también en Server Actions.
- Mantener documentos de solicitudes fuera de listados públicos.
- Validar tipo y tamaño de archivos antes de almacenarlos.
- No registrar secretos ni payloads completos innecesarios.
- Auditar decisiones administrativas y errores relevantes del webhook.
- Mantener `.env`, `.env.local` y credenciales fuera de Git.

## Cambios de base de datos

Las migraciones deben ser incrementales y revisadas antes de desplegar:

```bash
npm run db:migrate
npm run db:migrate:deploy
```

No borrar columnas o tablas existentes sin un plan de migración y respaldo. La migración `20260818000000_application_membership_flow` agrega las entidades de solicitud, evaluación y planes sin eliminar las relaciones históricas.

## Checklist para una modificación

1. Identificar si el cambio es visual, de entrada, de negocio o de datos.
2. Mantener la lógica fuera de componentes visuales.
3. Reutilizar componentes de `components/ui/`.
4. Agregar o ajustar validación Zod si cambia una entrada.
5. Agregar una transición explícita si cambia un estado.
6. Auditar mutaciones administrativas.
7. Ejecutar `npm test`, `npm run lint` y `npm run build`.
8. Revisar responsive y accesibilidad si es un cambio visual.

## Git y despliegue

- Rama principal: `main`.
- No subir `.env`, logs locales ni artefactos de `.next`.
- Usar commits pequeños y descriptivos.
- Ejecutar validaciones antes de hacer push.
- En Vercel, configurar las variables de entorno y el webhook firmado de Wompi antes de aceptar pagos reales.
