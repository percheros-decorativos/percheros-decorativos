# Despliegue en Vercel — Percheros Decorativos

Stack: **Next.js 16 (App Router) + TypeScript + Tailwind v4 + Zustand + Supabase + Bold**.
Arquitectura inspirada en el proyecto *scentualbliss*: catálogo en código, datos
dinámicos (órdenes/contacto) en Supabase, estado de carrito/favoritos en Zustand.

## 1. Requisitos
- Cuenta en [Vercel](https://vercel.com) (gratis).
- Cuenta en [Supabase](https://supabase.com) (gratis) — solo para guardar órdenes y mensajes.
- Llaves de [Bold](https://bold.co) para cobrar (puedes desplegar primero en modo prueba).

## 2. Base de datos (Supabase)
1. Crea un proyecto en Supabase.
2. Ve a **SQL Editor** y ejecuta el contenido de [`supabase/schema.sql`](supabase/schema.sql).
3. En **Project Settings → API** copia: `Project URL`, `anon public key` y `service_role key`.

## 3. Subir a Vercel
1. Sube el repo a GitHub.
2. En Vercel: **Add New → Project → Import** tu repo. Framework detecta **Next.js** solo.
3. En **Environment Variables** agrega (ver `.env.example`):
   - `NEXT_PUBLIC_SITE_URL` = tu dominio (ej. `https://www.percherosdecorativos.com`)
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_BOLD_API_KEY`, `BOLD_SECRET_KEY`, `NEXT_PUBLIC_BOLD_CURRENCY=COP`
   - `ADMIN_PASSWORD` = clave fuerte y larga (login en `/admin/login`, sin
     usuario — solo contraseña. Si esta variable no está definida, `/admin`
     queda bloqueado por completo para todos, no abierto)
4. **Deploy**. Cada push a la rama principal redespliega automáticamente.

## 4. Webhook de Bold
En el panel de Bold configura el webhook hacia:
`https://TU-DOMINIO/api/bold/webhook`

## 5. Catálogo de productos
El catálogo vive en [`src/lib/catalog.ts`](src/lib/catalog.ts). Para agregar/editar
productos, edita ese archivo (id, slug, nombre, precio, imágenes en `public/img/products`).
Hoy hay **2 productos de ejemplo**; reemplázalos por los reales.

## 6. Envíos
El costo de envío (Bogotá vs. resto del país) vive en
[`src/lib/shipping.ts`](src/lib/shipping.ts). Para cambiar las tarifas, edita
las constantes ahí; se aplican tanto en el checkout como en la API de órdenes.

## 7. SEO / GEO
- Sitemap dinámico: `/sitemap.xml` · Robots: `/robots.txt` · `public/llms.txt`
- JSON-LD: Organization, WebSite, Product, BreadcrumbList, FAQ, Article.
- SEO programático: páginas de ciudad (`/percheros/<ciudad>`) y guías (`/guias/<slug>`).
- Imágenes WebP + lazy load + tamaños explícitos para Core Web Vitals.

## Local
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
```
La tienda funciona en local **sin Supabase** (no persiste órdenes; el contacto se
registra en consola). Con Supabase configurado, guarda órdenes y mensajes.
