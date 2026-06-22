import type { MetadataRoute } from 'next';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: `${APP_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${APP_URL}/afiliacion`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${APP_URL}/terminos-y-condiciones`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${APP_URL}/contrato-afiliacion`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${APP_URL}/politica-tratamiento-datos`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
