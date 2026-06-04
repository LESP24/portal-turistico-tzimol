// =============================================================
// components/CuadriculaComunidades.tsx
// Muestra las comunidades locales del municipio de Tzimol
// en una cuadrícula asimétrica tipo "masonry editorial".
// Componente de Servidor — no requiere 'use client'.
// =============================================================
import Image from 'next/image';
import type { Comunidad } from '../types/tipos';

// -----------------------------------------------------------
// Props del componente
// -----------------------------------------------------------
interface PropsCuadriculaComunidades {
  /** Lista de comunidades provenientes del JSON */
  comunidades: Comunidad[];
}

// -----------------------------------------------------------
// Subcomponente: Tarjeta de Comunidad
// La primera tarjeta puede tener un estilo "destacado"
// -----------------------------------------------------------
function TarjetaComunidad({
  comunidad,
  destacada = false,
}: {
  comunidad: Comunidad;
  destacada?: boolean;
}) {
  const { nombre, descripcion, imagen } = comunidad;

  return (
    <article
      className={`
        group relative rounded-2xl overflow-hidden
        shadow-carta hover:shadow-carta-hover
        transition-all duration-500 hover:-translate-y-1
        ${destacada
          ? 'col-span-1 md:col-span-2 row-span-1 md:row-span-2 aspect-[4/3] md:aspect-auto'
          : 'aspect-[4/3]'
        }
      `}
    >
      {/* ── IMAGEN DE FONDO ── */}
      <Image
        src={imagen}
        alt={`Comunidad de ${nombre}`}
        fill
        sizes={
          destacada
            ? '(max-width: 768px) 100vw, 50vw'
            : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
        }
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        /*
         * 📌 CMS: Imagen editable desde el panel de administrador.
         * La primera comunidad en la lista del JSON se mostrará como
         * "destacada" (doble tamaño). El cliente puede reordenar desde el CMS.
         */
      />

      {/* Gradiente sobre la imagen */}
      <div
        className="absolute inset-0 bg-gradient-to-t
                   from-corteza/85 via-corteza/20 to-transparent"
        aria-hidden="true"
      />

      {/* ── CONTENIDO TEXTUAL ── */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 flex flex-col gap-2">

        {/* Etiqueta "Comunidad" */}
        <span className="font-cuerpo text-sol text-[10px] tracking-[0.4em] uppercase">
          Comunidad
        </span>

        {/* Nombre de la comunidad */}
        <h3
          className={`font-titulo text-crema leading-tight
                      ${destacada ? 'text-3xl md:text-4xl' : 'text-2xl'}`}
        >
          {nombre}
        </h3>

        {/* Descripción — visible siempre en destacada, en hover en las demás */}
        <p
          className={`font-cuerpo text-crema/70 text-sm leading-relaxed
                      transition-all duration-300
                      ${destacada
                        ? 'max-w-sm opacity-100 translate-y-0'
                        : 'max-h-0 opacity-0 translate-y-2 overflow-hidden group-hover:max-h-20 group-hover:opacity-100 group-hover:translate-y-0'
                      }`}
        >
          {/*
           * 📌 CMS: El cliente puede editar la descripción de cada
           * comunidad desde el panel. Soporte para texto enriquecido
           * (bold, italic) si se usa un campo de tipo "rich text".
           */}
          {descripcion}
        </p>

        {/* Línea animada — indicador de "ver más" */}
        <div
          className="flex items-center gap-2 mt-1 opacity-0 translate-y-1
                     group-hover:opacity-100 group-hover:translate-y-0
                     transition-all duration-300"
          aria-hidden="true"
        >
          <div className="h-px w-6 bg-sol" />
          <span className="font-cuerpo text-sol text-[10px] tracking-widest uppercase">
            Conocer más
          </span>
        </div>
      </div>
    </article>
  );
}

// -----------------------------------------------------------
// Componente principal: CuadriculaComunidades
// -----------------------------------------------------------
export default function CuadriculaComunidades({
  comunidades,
}: PropsCuadriculaComunidades) {
  // La primera comunidad recibe el tratamiento "destacado"
  const [comunidadDestacada, ...restoComudidades] = comunidades;

  return (
    <section
      id="comunidades"
      className="py-24 bg-crema"
      aria-labelledby="titulo-comunidades"
    >
      <div className="contenedor-sitio">

        {/* ── ENCABEZADO DE SECCIÓN ── */}
        <div className="flex flex-col gap-4 mb-14">
          <p className="font-cuerpo text-terracota text-xs tracking-[0.4em] uppercase">
            Corazón del municipio
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2
              id="titulo-comunidades"
              className="font-titulo text-selva text-4xl md:text-5xl lg:text-6xl leading-tight"
            >
              Nuestras<br />Comunidades
            </h2>
            <p className="font-cuerpo text-corteza/55 text-base leading-relaxed max-w-sm">
              Cada comunidad guarda una historia única. Conócelas y descubre
              la riqueza humana que hace grande a Tzimol.
            </p>
          </div>
          {/* Línea dorada decorativa */}
          <div className="h-px w-20 bg-sol" aria-hidden="true" />
        </div>

        {/* ── CUADRÍCULA ASIMÉTRICA ──
            Layout: la primera tarjeta ocupa 2 columnas y 2 filas (desktop),
            el resto llena el espacio restante.

            📌 CMS: La lógica de "destacado" se basa en el orden del JSON.
            El cliente puede reordenar las comunidades arrastrando desde
            el panel de administrador.
        */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 auto-rows-[260px]">

          {/* Comunidad destacada — doble espacio */}
          {comunidadDestacada && (
            <TarjetaComunidad
              comunidad={comunidadDestacada}
              destacada={true}
            />
          )}

          {/* Resto de comunidades — tamaño normal */}
          {restoComudidades.map((comunidad) => (
            <TarjetaComunidad
              key={comunidad.id}
              comunidad={comunidad}
              destacada={false}
            />
          ))}
        </div>

        {/* ── LLAMADA A LA ACCIÓN FINAL ── */}
        <div className="mt-14 flex justify-center">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="font-cuerpo italic text-corteza/50 text-sm">
              ¿Quieres conocer más sobre nuestras comunidades?
            </p>
            <a
              href="mailto:turismo@tzimol.gob.mx"
              className="boton-primario"
              /*
               * 📌 CMS: El correo de contacto puede editarse desde
               * el panel de administrador (sección "Configuración → Contacto")
               */
            >
              Contactar al municipio
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
