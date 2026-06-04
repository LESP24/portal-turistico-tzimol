// =============================================================
// app/page.tsx — Página principal del Portal Turístico de Tzimol
// =============================================================
//
// ARQUITECTURA DE DATOS:
// ──────────────────────
// Actualmente: los datos se importan directamente del JSON local.
//
// 📌 CMS — FUTURA INTEGRACIÓN:
//   Cuando el cliente tenga su panel de administrador listo,
//   reemplazar la importación del JSON con una llamada al API.
//
//   Opción A — API REST (Strapi, Directus, custom):
//     const datos = await fetch('https://cms.tzimol.gob.mx/api/portal', {
//       next: { revalidate: 3600 } // ISR: actualiza cada hora
//     }).then(r => r.json() as Promise<DatosTzimol>);
//
//   Opción B — CMS headless (Sanity):
//     import { sanityClient } from '@/lib/sanity';
//     const datos = await sanityClient.fetch(QUERY_DATOS_TZIMOL);
//
//   Opción C — Base de datos directa (con Prisma/Drizzle):
//     import { db } from '@/lib/db';
//     const datos = await db.obtenerDatosTzimol();
//
// =============================================================

import datosTzimol from '../data/datos_tzimol.json';
import type { DatosTzimol } from '../types/tipos';

// Componentes del portal
import EncabezadoPrincipal from '../components/EncabezadoPrincipal';
import TarjetaLugar from '../components/TarjetaLugar';
import SeccionRutas from '../components/SeccionRutas';
import CuadriculaComunidades from '../components/CuadriculaComunidades';
// Casting al tipo fuerte para que TypeScript valide la estructura
const datos = datosTzimol as DatosTzimol;

// -----------------------------------------------------------
// Metadatos específicos de esta página (extienden layout.tsx)
// -----------------------------------------------------------
export const metadata = {
  title: 'Inicio',
};

// -----------------------------------------------------------
// Página principal — Componente de Servidor (Server Component)
// -----------------------------------------------------------
export default function PaginaPrincipal() {
  return (
    <main>

      {/* ══════════════════════════════════════════════════════
          1. SECCIÓN HERO
          Bienvenida dramática al portal del municipio.
      ══════════════════════════════════════════════════════ */}
      <EncabezadoPrincipal />


      {/* ══════════════════════════════════════════════════════
          2. SECCIÓN ECOTURISMO
          Cuadrícula de destinos naturales con TarjetaLugar.
      ══════════════════════════════════════════════════════ */}
      <section
        id="ecoturismo"
        className="py-24 bg-crema"
        aria-labelledby="titulo-ecoturismo"
      >
        <div className="contenedor-sitio">

          {/* Encabezado */}
          <div className="flex flex-col gap-4 mb-14">
            <p className="font-cuerpo text-terracota text-xs tracking-[0.4em] uppercase">
              Naturaleza viva
            </p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h2
                id="titulo-ecoturismo"
                className="font-titulo text-selva text-4xl md:text-5xl lg:text-6xl leading-tight"
              >
                Destinos<br />Ecoturísticos
              </h2>
              <p className="font-cuerpo text-corteza/55 text-base leading-relaxed max-w-sm">
                {/*
                 * 📌 CMS: Este texto introductorio de sección puede
                 * editarse desde el panel (campo "descripción de sección").
                 */}
                El municipio de Tzimol alberga ocho destinos naturales únicos.
                Cascadas, manantiales y senderos te esperan.
              </p>
            </div>
            {/* Línea dorada decorativa */}
            <div className="h-px w-20 bg-sol" aria-hidden="true" />
          </div>

          {/* Cuadrícula de tarjetas
           * 📌 CMS: Los lugares se ordenarán según el campo "orden" del panel.
           * Filtros (activos/inactivos) también vendrán del CMS.
           */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {datos.ecoturismo.map((lugar) => (
              <TarjetaLugar key={lugar.id} lugar={lugar} />
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          3. SECCIÓN RUTAS CULTURALES
          Fondo oscuro que contrasta con las secciones claras.
      ══════════════════════════════════════════════════════ */}
      <SeccionRutas rutas={datos.rutasCulturales} />


      {/* ══════════════════════════════════════════════════════
          4. SECCIÓN COMUNIDADES
          Cuadrícula asimétrica que destaca la primera comunidad.
      ══════════════════════════════════════════════════════ */}
      <CuadriculaComunidades comunidades={datos.comunidades} />


      {/* ══════════════════════════════════════════════════════
          5. SECCIÓN GASTRONOMÍA Y SERVICIOS  ← PRÓXIMAMENTE
          📌 CMS: Descomentar cuando se cree el componente
          <SeccionGastronomia /> y el cliente haya subido
          las imágenes y descripciones desde el panel.

          <SeccionGastronomia
            id="gastronomia"
            servicios={datos.gastronomiaYServicios}
          />
      ══════════════════════════════════════════════════════ */}


      {/* ══════════════════════════════════════════════════════
          6. BANNER DE LLAMADA A LA ACCIÓN FINAL
      ══════════════════════════════════════════════════════ */}
      <section className="bg-selva py-24">
        <div className="contenedor-sitio text-center flex flex-col items-center gap-6">
          <p className="font-cuerpo text-sol text-xs tracking-[0.4em] uppercase">
            Visítanos
          </p>
          <h2 className="font-titulo text-crema text-4xl md:text-5xl leading-tight max-w-xl">
            Tzimol te espera con los brazos abiertos
          </h2>
          <p className="font-cuerpo text-crema/55 text-base max-w-md leading-relaxed">
            {/*
             * 📌 CMS: Texto y botón del banner final editables desde el panel
             * (sección "Configuración → Banner de llamada a la acción").
             */}
            Planea tu visita y descubre por qué Tzimol es uno de los municipios
            más auténticos de Chiapas.
          </p>
          <a
            href="https://www.google.com/maps/search/Tzimol,+Chiapas"
            target="_blank"
            rel="noopener noreferrer"
            className="boton-primario shadow-sol"
          >
            Cómo llegar
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </a>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          7. PIE DE PÁGINA
          📌 CMS: Mover a app/layout.tsx si el footer es global.
          Los datos de contacto son editables desde el panel.
      ══════════════════════════════════════════════════════ */}
      <footer className="bg-corteza py-10">
        <div className="contenedor-sitio flex flex-col md:flex-row items-center
                        justify-between gap-4 text-crema/40 font-cuerpo text-xs">
          <span className="font-titulo text-crema/60 text-lg tracking-widest">
            TZIMOL
          </span>
          <span>
            {/* 📌 CMS: Año y nombre del municipio editables desde el panel */}
            © {new Date().getFullYear()} Municipio de Tzimol, Chiapas.
            Todos los derechos reservados.
          </span>
          <span>turismo@tzimol.gob.mx</span>
        </div>
      </footer>

    </main>
  );
}
