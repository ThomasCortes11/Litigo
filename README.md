# Litigo — Plataforma de Afiliacion Juridica

Sistema completo de afiliacion, pagos y gestion de membresias.
**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind · PostgreSQL/Prisma · Auth.js v5 · Zod · Wompi · Resend · Vercel Blob.

---

## Inicio rapido

```bash
# 1. Instalar dependencias (genera el cliente Prisma automaticamente)
npm install

# 2. Copiar variables de entorno y completarlas con tus credenciales
cp .env.example .env

# 3. Generar secreto para Auth.js
npx auth secret

# 4. Crear tablas en la base de datos
npm run db:migrate

# 5. Sembrar datos iniciales (roles, admin, settings, documentos legales)
npm run db:seed

# 6. Levantar en desarrollo
npm run dev
```

### URLs locales
| Ruta | Descripcion |
|---|---|
| http://localhost:3000 | Landing comercial |
| http://localhost:3000/afiliacion | Formulario publico |
| http://localhost:3000/admin/login | Panel administrativo |

### Credenciales iniciales del admin
- **Correo:** `admin@litigo.com.co`
- **Contrasena:** `CambiarEstaClave123!`
- **Cambiarla antes de ir a produccion** (actualizar directamente en la BD con un hash bcrypt nuevo)

---

## Estructura del proyecto

```
app/
  (marketing)/          Landing + paginas legales (SSR, indexables)
  afiliacion/           Formulario publico + confirmacion de pago
  admin/
    login/              Login (sin sidebar, robots noindex)
    (dashboard)/        Rutas protegidas: dashboard, afiliados, configuracion
  api/
    auth/[...nextauth]/ Route handler Auth.js
    webhooks/wompi/     Webhook firmado de Wompi
  globals.css
  layout.tsx            Root layout con tipografias y metadata global
  icon.tsx              Favicon dinamico (monograma L)
  apple-icon.tsx        Apple touch icon
  opengraph-image.tsx   Imagen OG para redes/WhatsApp (1200x630)
  robots.ts             /robots.txt (bloquea /admin y /api)
  sitemap.ts            /sitemap.xml
  not-found.tsx         Pagina 404 con identidad de marca
  global-error.tsx      Boundary de errores con pantalla de marca

components/
  ui/                   Primitivos (Button, Input, Card, Table, Badge, ...)
  marketing/            Secciones de la landing
  afiliacion/           Formulario y estado de pago
  admin/                Sidebar, tablas, formularios del panel

lib/
  actions/              Server Actions (mutaciones)
  services/             Logica de negocio (activacion automatica)
  validations/          Esquemas Zod (fuente unica de verdad)
  auth.ts               Auth.js completo (Node Runtime)
  auth.config.ts        Auth.js edge-safe (para middleware)
  wompi.ts              Checkout URL firmado + validacion de webhooks
  email.ts              Plantillas y envio via Resend
  rate-limit.ts         Rate limiter en memoria (reemplazable por Redis)
  audit.ts              Helper de auditoria

prisma/
  schema.prisma         Modelo completo (8 tablas, UUID, indices, soft delete)
  seed.ts               Datos iniciales
```

---

## Configuracion de Wompi

### Desarrollo (sandbox)
1. Crear cuenta en https://comercios.wompi.co/sandbox
2. Obtener las 4 llaves (public, private, events, integrity) y ponerlas en `.env`
3. Usar un tunel publico para el webhook: `ngrok http 3000`
4. Registrar `https://tu-tunel.ngrok.app/api/webhooks/wompi` en el panel de Wompi

### Produccion
1. Cambiar `WOMPI_API_URL` a `https://production.wompi.co/v1`
2. Reemplazar las llaves `test_` por las llaves de produccion
3. Registrar `https://tu-dominio.com/api/webhooks/wompi` en Wompi

---

## Configuracion de Resend

1. Crear cuenta en https://resend.com
2. Verificar el dominio `litigo.com.co` (DNS TXT record)
3. Obtener el API key y ponerlo en `RESEND_API_KEY`
4. Actualizar `EMAIL_FROM` con el correo verificado

---

## Despliegue en Vercel

```bash
# Migracion en produccion (correr una sola vez, o en cada deploy con cambios de schema)
npm run db:migrate:deploy
```

1. Subir el repositorio a GitHub
2. Importar en Vercel → configurar todas las variables de `.env.example`
3. Conectar una base de datos PostgreSQL (Vercel Postgres, Neon o Supabase)
4. Activar Vercel Blob desde el dashboard (genera `BLOB_READ_WRITE_TOKEN`)

---

## Antes de abrir al publico (checklist)

- [ ] Cambiar la contrasena del admin inicial
- [ ] Cambiar `support_phone` en `/admin/configuracion` al numero real
- [ ] Redactar y publicar los 3 documentos legales (terminos, contrato, politica de datos)
- [ ] Verificar que el webhook de Wompi este registrado y funcionando (probar con sandbox)
- [ ] Verificar el dominio en Resend y confirmar que los correos de bienvenida llegan
- [ ] Cambiar las llaves de Wompi de sandbox a produccion
- [ ] Confirmar que `NEXT_PUBLIC_APP_URL` apunta al dominio real

---

## Decisiones tecnicas clave

| Aspecto | Decision | Razon |
|---|---|---|
| Auth | Solo para el panel admin | Los afiliados no tienen cuenta; el flujo publico es sin login |
| Webhook vs redirect | El webhook es la fuente de verdad | El redirect del navegador puede perderse o falsificarse |
| Rate limiting | En memoria con fallback documentado | Simple de operar; escala a Redis sin cambiar la interfaz |
| Titles de paginas | Template `'%s | Litigo'` en root layout | Evita duplicacion y centraliza la marca |
| Favicon/OG | Generados en codigo (ImageResponse) | Sin assets binarios, siempre coherentes con la marca |
| CSP | Permite checkout.wompi.co como frame | Necesario para el flujo de pago de Wompi |
