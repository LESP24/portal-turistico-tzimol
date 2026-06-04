// =============================================================
// components/SeccionRutas.tsx
// Sección editorial para mostrar las rutas culturales de Tzimol.
// Destaca al autor de cada ruta con un badge especial.
// Componente de Servidor — no requiere 'use client'.
// =============================================================
import Image from 'next/image';
import type { RutaCultural } from '../types/tipos';

// -----------------------------------------------------------
// Props del componente
// -----------------------------------------------------------
interface PropsSeccionRutas {
  /** Lista de rutas culturales provenientes del JSON */
  rutas: RutaCultural[];
}

// -----------------------------------------------------------
// Subcomponente: Tarjeta de Ruta Cultural
// -----------------------------------------------------------
function TarjetaRuta({ ruta, indice }: { ruta: RutaCultural; indice: number }) {
  const { nombre, autor, imagen } = ruta;

  return (
    <article
      className="group relative rounded-2xl overflow-hidden cursor-pointer
                 aspect-[4/5] shadow-carta hover:shadow-carta-hover
                 transition-all duration-500 hover:-translate-y-1"
    >
      {/* ── IMAGEN DE FONDO ── */}
      <Image
        src={imagen}
        alt={`Ruta cultural: ${nombre}`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        /*
         * 📌 CMS: Imagen editable desde el panel de administrador.
         * Agregar dominio del CDN en next.config.ts si es remota.
         */
      />

      {/* Degradado que va de transparente (arriba) a oscuro (abajo) */}
      <div
        className="absolute inset-0 bg-gradient-to-t
                   from-corteza/90 via-corteza/30 to-transparent"
        aria-hidden="true"
      />

      {/* Número de ruta — decorativo */}
      <span
        className="absolute top-4 left-4 font-titulo text-crema/20 text-6xl leading-none select-none"
        aria-hidden="true"
      >
        {String(indice + 1).padStart(2, '0')}
      </span>

      {/* ── INFORMACIÓN EN LA PARTE INFERIOR ── */}
      <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-3">

        {/* Badge del autor — elemento más destacado */}
        <div className="flex items-center gap-2">
          {/* Icono de pluma/autoría */}
          <svg
            className="w-3.5 h-3.5 text-sol flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          <span
            className="font-cuerpo text-sol text-xs font-medium tracking-wider uppercase"
            /*
             * 📌 CMS: El campo "autor" es editable desde el panel.
             * Podría convertirse en una relación a una tabla de
             * "guías locales" con foto y biografía.
             */
          >
            {autor}
          </span>
        </div>

        {/* Nombre de la ruta */}
        <h3 className="font-titulo text-crema text-2xl leading-tight">
          {nombre}
        </h3>

        {/* Botón hover (aparece al hacer hover en la tarjeta) */}
        <div
          className="flex items-center gap-2 text-sol/0 group-hover:text-sol
                     transition-all duration-300 translate-y-2 group-hover:translate-y-0"
          aria-hidden="true"
        >
          <div className="h-px flex-1 bg-sol/40" />
          <span className="font-cuerpo text-xs tracking-widest uppercase">
            Ver ruta
          </span>
        </div>
      </div>
    </article>
  );
}

// -----------------------------------------------------------
// Componente principal: SeccionRutas
// -----------------------------------------------------------
export default function SeccionRutas({ rutas }: PropsSeccionRutas) {
  return (
    <section
      id="rutas"
      className="py-24 bg-selva"
      aria-labelledby="titulo-rutas"
    >
      <div className="contenedor-sitio">

        {/* ── ENCABEZADO DE SECCIÓN ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">

          <div className="flex flex-col gap-4">
            {/* Etiqueta superior */}
            <p className="font-cuerpo text-sol text-xs tracking-[0.4em] uppercase">
              Patrimonio vivo
            </p>

            {/* Título principal */}
            <h2
              id="titulo-rutas"
              className="font-titulo text-crema text-4xl md:text-5xl lg:text-6xl leading-tight"
            >
              Rutas<br />Culturales
            </h2>
          </div>

          {/* Descripción lateral */}
          <p className="font-cuerpo text-crema/55 text-base leading-relaxed max-w-xs">
            Cada ruta es una ventana al alma de Tzimol, creada por voces
            locales que conocen sus secretos.
          </p>
        </div>

        {/* Separador */}
        <div className="h-px w-full bg-crema/10 mb-14" aria-hidden="true" />

        {/* ── CUADRÍCULA DE RUTAS ── */}
        {/*
         * 📌 CMS: El número de columnas se adapta automáticamente.
         * Si el cliente agrega más rutas desde el panel, se mostrarán aquí.
         * Para más de 6 rutas considerar paginación o carrusel.
         */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rutas.map((ruta, indice) => (
            <TarjetaRuta key={ruta.id} ruta={ruta} indice={indice} />
          ))}
        </div>

        {/* ── PIE DE SECCIÓN: Créditos a los autores ── */}
        <div className="mt-14 pt-8 border-t border-crema/10 flex flex-wrap gap-x-8 gap-y-2">
          <span className="font-cuerpo text-crema/30 text-xs tracking-wider">
            Rutas creadas por:
          </span>
          {/* Autores únicos deduplicados */}
          {[...new Set(rutas.map((r) => r.autor))].map((autor) => (
            <span
              key={autor}
              className="font-cuerpo text-crema/60 text-xs italic"
            >
              {autor}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
