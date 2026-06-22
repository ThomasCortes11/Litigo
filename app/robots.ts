import type { MetadataRoute } from 'next';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // El panel administrativo y las rutas internas de API nunca
        // deben indexarse en buscadores.
        disallow: ['/admin', '/api'],
      },
    ],
    sitemap: `${APP_URL}/sitemap.xml`,
  };
}
