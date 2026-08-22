# AGENTS.md — Litigo

## Stack

- **Framework:** Next.js 16 (App Router, Server Actions, Turbopack)
- **Runtime:** Node 20 (bullseye-slim en Docker)
- **Database:** PostgreSQL 16 + Prisma 5.22
- **Auth:** Auth.js (NextAuth v5 beta) con JWT 8h
- **UI:** Tailwind CSS 3 + shadcn/ui + Lucide icons
- **Email:** Resend (dominio: litigosas.com)
- **Archivos:** Vercel Blob
- **Deploy:** Docker multi-stage build en VPS Hostinger
- **WhatsApp:** Contacto directo con abogado para cobranza (3118551771)

## Entorno de produccion

| Servicio | URL |
|----------|-----|
| App | https://litigosas.com |
| Admin | https://litigosas.com/admin/login |
| VPS IP | 2.25.114.217 |
| SSH | `ssh litigo@2.25.114.217` |
| Portainer | http://2.25.114.217:9000 |

## Credenciales

| Credencial | Valor |
|------------|-------|
| Admin email | admin@litigo.com.co |
| Admin password | CambiarEstaClave123 |
| SSH user | litigo |
| SSH password | (la que se asigno en Hostinger) |
| Resend API Key | re_xxxxxxxx (ver .env en VPS) |
| WhatsApp abogado | 573118551771 |

## Comandos en VPS

```bash
# Conectarse
ssh litigo@2.25.114.217

# Navegar al proyecto
cd ~/Litigo

# Ver containers
sudo docker compose ps

# Ver logs
sudo docker compose logs -f app
sudo docker compose logs app --tail=50

# Reiniciar app
sudo docker compose restart app

# Reconstruir (despues de cambios en codigo)
sudo docker compose up -d --build app

# Detener todo
sudo docker compose down

# Detener y borrar DB
sudo docker compose down -v

# Ver contenido del .env
cat ~/Litigo/.env

# Editar .env
nano ~/Litigo/.env
# Guardar: Ctrl+O, Enter, Ctrl+X

# Verificar estado de nginx
sudo systemctl status nginx

# Reiniciar nginx
sudo systemctl restart nginx

# Verificar SSL
sudo certbot certificates
```

## Comandos de desarrollo local

```bash
npm install --legacy-peer-deps
npx prisma generate
npm run build    # Build con webpack (Windows no soporta Turbopack)
npm run dev

# Docker local
docker compose up -d --build

# Reset DB
docker compose down -v && docker compose up -d --build
```

## Flujo completo del negocio

```
1. /afiliacion                 → Usuario llena formulario basico
   → submitAffiliation()       → Crea Affiliate(PENDING) + Application(DRAFT)
   → Redirect a paso 2

2. /afiliacion/perfilamiento   → Usuario llena perfilamiento legal + sube docs
   → submitApplicationProfile() → Application(SUBMITTED)

3. /admin/afiliados/[id]       → Admin revisa y aprueba
   → reviewApplication()       → Application(APPROVED)
   → Envia email con boton WhatsApp al abogado

4. Email de aprobacion         → Afiliado recibe boton "Abrir WhatsApp"
   → Link: wa.me/573118551771 con mensaje pre-escrito

5. WhatsApp                    → Afiliado coordina pago con el abogado
   → Medios: Transferencia, Nequi, Daviplata

6. /admin/afiliados/[id]       → Admin activa membresia manualmente
   → activateAffiliate()       → Affiliate(ACTIVE) + Membership(30 dias)
   → Envia email de bienvenida con codigo
```

## Maquina de estados (Application)

```
DRAFT → SUBMITTED → UNDER_REVIEW → APPROVED → ACTIVE
   ↗       ↗            ↗
   └───────┴────────────┘ (transiciones directas permitidas)

Tambien permitido:
- SUBMITTED → APPROVED (aprobacion directa)
- SUBMITTED → REJECTED
- SUBMITTED → AWAITING_INFORMATION
- SUBMITTED → UNDER_REVIEW
```

## Variables de entorno

| Variable | Proposito | Produccion |
|----------|-----------|------------|
| `DATABASE_URL` | Conexion PostgreSQL | `postgresql://postgres:postgres@db:5432/litigo?schema=public` |
| `AUTH_SECRET` | JWT secret (min 32 chars) | Secreto largo |
| `AUTH_URL` | URL base auth | `https://litigosas.com` |
| `NEXT_PUBLIC_APP_URL` | URL publica app | `https://litigosas.com` |
| `NEXT_PUBLIC_APP_NAME` | Nombre app | `Litigo` |
| `RESEND_API_KEY` | Envio de emails | `re_xxxxxxxx` |
| `EMAIL_FROM` | Remitente | `Litigo <afiliaciones@litigosas.com>` |
| `BLOB_READ_WRITE_TOKEN` | Almacenamiento archivos | Token de Vercel Blob |

**IMPORTANTE:** El `EMAIL_FROM` esta hardcodeado en `docker-compose.yml`. Si se cambia en `.env`, tambien hay que cambiarlo en `docker-compose.yml` y reconstruir con `sudo docker compose up -d --build app`.

## Estructura de directorios clave

```
app/
├── (marketing)/          # Landing y paginas legales
├── afiliacion/           # Flujo de afiliacion
│   ├── page.tsx          # Paso 1: formulario basico
│   ├── perfilamiento/    # Paso 2: perfilamiento legal
│   ├── oferta/           # Redirige a WhatsApp con medios de pago
│   ├── confirmacion/     # Pagina con link WhatsApp
│   └── error/
├── admin/                # Panel administrativo
│   ├── login/
│   └── (dashboard)/      # Layout con sidebar
│       ├── afiliados/    # CRUD afiliados
│       └── configuracion/
└── api/auth/[...nextauth]/  # Auth.js

components/
├── marketing/            # Header, hero, sections, footer, FloatingCallButton
├── afiliacion/           # Formularios, whatsapp-redirect, trust-sidebar
└── admin/                # Sidebar, forms, tables

lib/
├── actions/              # Server Actions (validacion + auth)
│   ├── affiliate-actions.ts      # Registro de afiliados
│   ├── application-admin-actions.ts  # Revision de solicitudes
│   ├── admin-affiliate-actions.ts    # CRUD admin
│   └── profile-actions.ts       # Perfilamiento
├── services/
│   ├── application-service.ts    # Maquina de estados
│   └── activation-service.ts     # Activacion manual
├── validations/          # Schemas Zod
├── auth.ts               # Auth.js config
├── prisma.ts             # Singleton Prisma
├── email.ts              # Emails transaccionales (con boton WhatsApp)
├── utils.ts              # Utilidades (formatCurrency, generateAffiliateCode)
└── audit.ts              # Logger de auditoria
```

## Archivos eliminados (antes tenian Wompi)

- `lib/wompi.ts` — Integracion Wompi
- `app/api/webhooks/wompi/route.ts` — Webhook de pagos
- `lib/actions/payment-actions.ts` — Acciones de checkout
- `components/afiliacion/membership-offer.tsx` — Componente de oferta
- `components/afiliacion/confirmation-status.tsx` — Polling de pago

## Notas de desarrollo

- El Dockerfile usa `node:20-bullseye-slim` (no Alpine) por compatibilidad de OpenSSL con Prisma 5.22
- `npm ci --legacy-peer-deps` por conflicto peer deps next-auth vs next@16
- El entrypoint ejecuta `prisma migrate deploy` al iniciar el contenedor
- La migracion SQL (`prisma/migrations/20260818000000_init/`) fue escrita manualmente para corregir un bug de Prisma 5.22
- El boton flotante de llamadas usa el numero `3118551771`
- `next.config.mjs` tiene `output: 'standalone'` para Docker
- En Windows, `npm run build` falla con Turbopack — usar `npx next build --webpack`
- El `tar.gz` para subir al VPS se crea sin `node_modules`, `.next`, `.git`, `.env`
- Resend solo permite enviar a cuentas verificadas sin dominio propio; con `litigosas.com` verificado envia a cualquier correo
- El afiliado eliminado se restaura automaticamente si se vuelve a registrar con el mismo documento (limpia `deletedAt`)
