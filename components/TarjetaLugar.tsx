// =============================================================
// components/TarjetaLugar.tsx
// Tarjeta reutilizable para mostrar un destino ecoturístico.
// Componente de Servidor — no requiere 'use client'.
// =============================================================
import Image from 'next/image';
import Link from 'next/link';
import type { LugarEcoturistico } from '../types/tipos';

// -----------------------------------------------------------
// Props del componente
// -----------------------------------------------------------
interface PropsTarjetaLugar {
  /** Objeto con los datos del lugar provenientes del JSON */
  lugar: LugarEcoturistico;
}

// -----------------------------------------------------------
// Icono de enlace externo (para botón "Visitar sitio oficial")
// -----------------------------------------------------------
function IconoExterno() {
  return (
    <svg
      className="w-3.5 h-3.5 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}

// -----------------------------------------------------------
// Icono de flecha (para botón "Descubrir más")
// -----------------------------------------------------------
function IconoFlecha() {
  return (
    <svg
      className="w-3.5 h-3.5 flex-shrink-0 transition-transform duration-300 group-hover/boton:translate-x-1"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

// -----------------------------------------------------------
// Componente principal: TarjetaLugar
// -----------------------------------------------------------
export default function TarjetaLugar({ lugar }: PropsTarjetaLugar) {
  const { nombre, descripcion, imagen, sitioWebOficial } = lugar;

  return (
    <article
      className="group relative bg-crema rounded-2xl overflow-hidden
                 shadow-carta hover:shadow-carta-hover
                 transition-all duration-500 hover:-translate-y-2 flex flex-col"
    >
      {/* ── IMAGEN DEL LUGAR ── */}
      {/* El fondo bg-jade actúa como placeholder cuando la imagen no existe aún */}
      <div className="relative h-52 overflow-hidden bg-jade">
        <Image
          src={imagen}
          alt={`Vista de ${nombre}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          /*
           * 📌 CMS: La ruta de la imagen vendrá del CDN configurado
           * en el panel de administrador. Agregar el dominio del CDN
           * en next.config.ts → images.remotePatterns para que
           * Next.js Image pueda optimizarla.
           *
           * 📁 PRODUCCIÓN: Las imágenes locales deben estar en /public/imagenes/
           * Mientras no existan, el fondo verde jade del contenedor actúa
           * como placeholder visual.
           */
        />

        {/* Gradiente sobre la imagen para que el texto sea legible */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-selva/70 via-selva/20 to-transparent"
          aria-hidden="true"
        />

        {/* Badge: indica si tiene sitio oficial */}
        {sitioWebOficial && (
          <span
            className="absolute top-3 right-3 bg-sol text-corteza
                       font-cuerpo text-[10px] font-medium tracking-wider uppercase
                       px-2.5 py-1 rounded-full"
          >
            Sitio oficial
          </span>
        )}
      </div>

      {/* ── CUERPO DE LA TARJETA ── */}
      <div className="flex flex-col flex-1 p-5 gap-3">

        {/* Línea decorativa */}
        <div className="h-0.5 w-8 bg-sol/60" aria-hidden="true" />

        {/* Nombre del lugar */}
        <h3 className="font-titulo text-2xl leading-tight text-selva">
          {nombre}
        </h3>

        {/* Descripción */}
        <p className="font-cuerpo text-corteza/65 text-sm leading-relaxed flex-1">
          {/*
           * 📌 CMS: El cliente podrá editar esta descripción desde
           * el panel de administrador (campo de texto enriquecido).
           */}
          {descripcion}
        </p>

        {/* ── BOTÓN CONDICIONAL ──
            ─ Con sitioWebOficial → "Visitar sitio oficial" (abre en nueva pestaña)
            ─ Sin sitioWebOficial → "Descubrir más" (enlace interno con Link)
        */}
        {sitioWebOficial ? (
          <a
            href={sitioWebOficial}
            target="_blank"
            rel="noopener noreferrer"
            className="boton-primario self-start mt-2"
            aria-label={`Visitar el sitio oficial de ${nombre} (abre en nueva pestaña)`}
          >
            Visitar sitio oficial
            <IconoExterno />
          </a>
        ) : (
          /*
           * 📌 CMS: Este Link apunta a la futura página de detalle del lugar.
           * La URL se construye con el campo `id` del JSON.
           * Cuando crees app/ecoturismo/[id]/page.tsx, la navegación
           * funcionará automáticamente sin cambiar nada aquí.
           */
          <Link
            href={`/ecoturismo/${lugar.id}`}
            className="boton-secundario self-start mt-2 group/boton"
            aria-label={`Descubrir más sobre ${nombre}`}
          >
            Descubrir más
            <IconoFlecha />
          </Link>
        )}
      </div>
    </article>
  );
}