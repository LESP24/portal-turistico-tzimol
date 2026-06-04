// =============================================================
// next.config.ts — Configuración de Next.js
// Portal Turístico de Tzimol
// =============================================================
import type { NextConfig } from 'next';

const configuracion: NextConfig = {

  // -----------------------------------------------------------
  // OPTIMIZACIÓN DE IMÁGENES
  // -----------------------------------------------------------
  images: {
    // Patrones de dominios remotos permitidos para <Image>
    // 📌 CMS: Cuando el cliente suba imágenes a un CDN,
    //         agregar el dominio aquí. Ejemplos:
    //
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'cdn.tzimol.gob.mx',  // CDN propio del municipio
    //   },
    //   {
    //     protocol: 'https',
    //     hostname: '**.sanity.io',        // Si se usa Sanity CMS
    //   },
    //   {
    //     protocol: 'https',
    //     hostname: 'res.cloudinary.com',  // Si se usa Cloudinary
    //   },
    // ],

    // Formatos modernos que Next.js generará automáticamente
    formats: ['image/avif', 'image/webp'],

    // Tamaños de imagen responsivos para el componente <Image>
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // -----------------------------------------------------------
  // CONFIGURACIÓN DE TYPESCRIPT (estricto en producción)
  // -----------------------------------------------------------
  typescript: {
    // Cambiar a false antes de ir a producción para que
    // los errores de TypeScript bloqueen el build.
    ignoreBuildErrors: false,
  },
};

export default configuracion;
