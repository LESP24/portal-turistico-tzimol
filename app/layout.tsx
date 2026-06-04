// =============================================================
// app/layout.tsx — Layout raíz del Portal Turístico de Tzimol
// =============================================================
import type { Metadata } from 'next';
import { Abril_Fatface, Lora } from 'next/font/google';
import './globals.css';

// -----------------------------------------------------------
// Configuración de fuentes con next/font (óptimo para producción:
// carga local, sin peticiones a Google en tiempo de ejecución)
// -----------------------------------------------------------
const abrilFatface = Abril_Fatface({
  weight: '400',
  subsets: ['latin'],
  variable: '--fuente-titulo', // Expone la fuente como variable CSS
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--fuente-cuerpo', // Expone la fuente como variable CSS
  display: 'swap',
});

// -----------------------------------------------------------
// Metadatos SEO del sitio
// 📌 CMS: Estos valores podrían venir de un campo "configuración
//         del sitio" en el panel de administrador.
// -----------------------------------------------------------
export const metadata: Metadata = {
  // metadataBase: URL base para resolver rutas relativas en og:image, twitter:image, etc.
  // 📌 CMS: Cambiar a la URL de producción cuando el sitio esté publicado.
  //         Ej: new URL('https://tzimol.gob.mx')
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000'
  ),
  title: {
    default: 'Tzimol — Naturaleza, Cultura y Tradición en Chiapas',
    template: '%s | Tzimol, Chiapas',
  },
  description:
    'Descubre el municipio de Tzimol: cascadas impresionantes, rutas culturales, ' +
    'comunidades locales y gastronomía auténtica en el corazón de Chiapas, México.',
  keywords: ['Tzimol', 'Chiapas', 'ecoturismo', 'El Chiflón', 'cascadas', 'México'],
  authors: [{ name: 'Municipio de Tzimol' }],
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    siteName: 'Portal Turístico de Tzimol',
    // 📌 CMS: Actualizar la imagen og con foto oficial del municipio
    images: [{ url: '/og-portada.jpg', width: 1200, height: 630 }],
  },
};

// -----------------------------------------------------------
// Layout raíz — envuelve todas las páginas del sitio
// -----------------------------------------------------------
export default function LayoutRaiz({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${abrilFatface.variable} ${lora.variable}`}>
      <body className="font-cuerpo antialiased">
        {children}

        {/* 
          📌 CMS: El pie de página (Footer) con datos de contacto
          del municipio puede agregarse aquí como componente global,
          editables desde el panel de administrador.
        */}
      </body>
    </html>
  );
}