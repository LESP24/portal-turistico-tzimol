// =============================================================
// app/page.tsx — Página principal del Portal Turístico de Tzimol
// =============================================================

import datosTzimol from '../data/datos_tzimol.json';
import type { DatosTzimol } from '../types/tipos';

// 1. IMPORTACIONES DE SANITY (NUEVO)
import { clienteSanity } from '../sanity/cliente';
import { groq } from 'next-sanity';

// Componentes del portal
import GestionMunicipal from '@/components/GestionMunicipal';
import EncabezadoPrincipal from '../components/EncabezadoPrincipal';
import TarjetaLugar from '../components/TarjetaLugar';
import SeccionRutas from '../components/SeccionRutas';
import CuadriculaComunidades from '../components/CuadriculaComunidades';

// 2. FUNCIÓN PARA TRAER DATOS DE LA NUBE (NUEVO)
// Esta función va a tu base de datos y formatea los datos 
// para que queden igualitos a como los tenías en el JSON.
async function obtenerDestinosEcoturismo() {
  const destinos = await clienteSanity.fetch(
    // FÍJATE EN LA PRIMERA LÍNEA, AHÍ ESTÁ LA MAGIA DEL ORDEN:
    groq`*[_type == "lugarTuristico"] | order(orden asc) {
      "id": slug.current,
      nombre,
      descripcion,
      "imagen": imagenPrincipal.asset->url,
      "sitioWebOficial": enlaceExterno
    }`,
    {}, 
    { cache: 'no-store' } 
  );
  return destinos;
}

// Casting al tipo fuerte para el resto de las secciones estáticas
const datos = datosTzimol as DatosTzimol;

export const metadata = {
  title: 'Inicio',
};

// 3. CONVERTIMOS LA PÁGINA EN ASÍNCRONA (agregamos 'async')
export default async function PaginaPrincipal() {
  
  // 4. DESCARGAMOS LOS DATOS EN TIEMPO REAL
  const destinosSanity = await obtenerDestinosEcoturismo();

  return (
    <main className="flex-1">

      {/* ══════════════════════════════════════════════════════
          1. SECCIÓN HERO
      ══════════════════════════════════════════════════════ */}
      <EncabezadoPrincipal />

      {/* ── SECCIÓN POLÍTICA / GESTIÓN ── */}
      <GestionMunicipal />

      {/* ══════════════════════════════════════════════════════
          2. SECCIÓN ECOTURISMO (¡AHORA DESDE LA NUBE!)
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
                El municipio de Tzimol alberga 12 destinos naturales únicos.
                Cascadas, manantiales y senderos te esperan.
              </p>
            </div>
            <div className="h-px w-20 bg-sol" aria-hidden="true" />
          </div>

          {/* 5. USAMOS LA VARIABLE DE SANITY EN EL MAP */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinosSanity.map((lugar: any) => (
              <TarjetaLugar key={lugar.id} lugar={lugar} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          3. SECCIÓN RUTAS CULTURALES (Desde JSON local)
      ══════════════════════════════════════════════════════ */}
      <SeccionRutas rutas={datos.rutasCulturales} />

      {/* ══════════════════════════════════════════════════════
          4. SECCIÓN COMUNIDADES (Desde JSON local)
      ══════════════════════════════════════════════════════ */}
      <CuadriculaComunidades comunidades={datos.comunidades} />

      {/* ══════════════════════════════════════════════════════
          5. SECCIÓN RELIGIÓN
      ══════════════════════════════════════════════════════ */}
      <section id="religion" className="py-24 bg-selva border-y border-crema/10">
        <div className="contenedor-sitio text-center">
          <p className="font-cuerpo text-sol text-xs tracking-[0.4em] uppercase mb-4">
            Patrimonio Histórico
          </p>
          <h2 className="font-titulo text-crema text-4xl md:text-5xl mb-6">
            Nuestras Iglesias y Templos
          </h2>
          <p className="font-cuerpo text-crema/70 max-w-2xl mx-auto mb-16">
            Conoce la riqueza arquitectónica y la devoción que resguardan los templos de nuestras comunidades, testigos de la historia y tradición tzimolera.
          </p>
          
          <div className="border-2 border-dashed border-crema/20 rounded-xl p-10">
            <p className="font-cuerpo text-crema/50">
              [ Próximamente: Cuadrícula de Iglesias ]
            </p>
          </div>
        </div>
      </section>

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
      ══════════════════════════════════════════════════════ */}
      <footer className="bg-corteza py-10">
        <div className="contenedor-sitio flex flex-col md:flex-row items-center
                        justify-between gap-4 text-crema/40 font-cuerpo text-xs">
          <span className="font-titulo text-crema/60 text-lg tracking-widest">
            TZIMOL
          </span>
          <span>
            © {new Date().getFullYear()} Municipio de Tzimol, Chiapas.
            Todos los derechos reservados.
          </span>
          <span>turismo@tzimol.gob.mx</span>
        </div>
      </footer>

    </main>
  );
}