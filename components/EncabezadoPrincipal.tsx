// =============================================================
// components/EncabezadoPrincipal.tsx
// Sección "Hero" principal del portal turístico de Tzimol.
// Componente de Servidor (no necesita 'use client').
// =============================================================

// Icono de flecha hacia abajo (inline SVG para evitar dependencias)
function IconoFlecha() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 animate-flote"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

// -----------------------------------------------------------
// Componente principal
// -----------------------------------------------------------
export default function EncabezadoPrincipal() {
  return (
    <header className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-selva">

      {/* ── CAPA 1: Textura de puntos dorados (patrón CSS, sin imagen) ── */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(212,168,83,0.6) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      {/* ── CAPA 2: Gradiente diagonal que da profundidad ── */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-jade/40 via-selva to-corteza/80 pointer-events-none"
        aria-hidden="true"
      />

      {/* ── CAPA 3: Resplandor dorado en esquina superior derecha ── */}
      <div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full
                   bg-sol/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* ── BARRA DE NAVEGACIÓN SUPERIOR ── */}
      <nav className="relative z-10 contenedor-sitio flex items-center justify-between pt-8">
        {/* Logotipo textual */}
        <span className="font-titulo text-crema text-2xl tracking-widest">
          TZIMOL
        </span>

        {/* 
          📌 CMS: Los elementos del menú de navegación pueden gestionarse
          desde el panel de administrador (añadir/quitar secciones del portal).
        */}
        <ul className="hidden md:flex items-center gap-8">
          {['Ecoturismo', 'Rutas', 'Comunidades', 'Gastronomía'].map((seccion) => (
            <li key={seccion}>
              <a
                href={`#${seccion.toLowerCase()}`}
                className="font-cuerpo text-crema/70 text-sm tracking-wider
                           hover:text-sol transition-colors duration-300"
              >
                {seccion}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── BLOQUE CENTRAL: Título y subtítulo ── */}
      <div className="relative z-10 contenedor-sitio flex-1 flex flex-col justify-center py-20">

        {/* Indicador de ubicación — pequeño y en mayúsculas */}
        <p className="animacion-revelar retraso-100 font-cuerpo text-sol text-xs md:text-sm
                      tracking-[0.5em] uppercase mb-6">
          Municipio de — Chiapas, México
        </p>

        {/* Título principal enorme */}
        <h1
          className="animacion-revelar retraso-200 font-titulo text-crema leading-none
                     text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[12rem]"
        >
          TZIMOL
        </h1>

        {/* Línea dorada decorativa */}
        <div className="animacion-revelar retraso-300 h-0.5 w-24 bg-sol my-6" />

        {/* Eslogan */}
        <p className="animacion-revelar retraso-400 font-cuerpo italic text-crema/75
                      text-lg md:text-2xl max-w-lg leading-relaxed">
          Naturaleza, cultura y tradición en el corazón de la selva chiapaneca.
        </p>

        {/* Botones de llamada a la acción */}
        <div className="animacion-revelar retraso-500 flex flex-wrap gap-4 mt-10">
          <a
            href="#ecoturismo"
            className="boton-primario shadow-sol"
          >
            Explorar destinos
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#rutas"
            className="inline-flex items-center gap-2 border border-crema/30 text-crema
                       font-cuerpo text-sm font-medium px-5 py-2.5 rounded-full
                       hover:border-sol hover:text-sol transition-all duration-300"
          >
            Ver rutas culturales
          </a>
        </div>
      </div>

      {/* ── BANDA INFERIOR: Categorías de exploración ── */}
      <div className="relative z-10 border-t border-crema/10">
        <div className="contenedor-sitio grid grid-cols-2 md:grid-cols-4">
          {[
            { etiqueta: 'Ecoturismo', numero: '08', ancla: '#ecoturismo' },
            { etiqueta: 'Rutas Culturales', numero: '04', ancla: '#rutas' },
            { etiqueta: 'Comunidades', numero: '05', ancla: '#comunidades' },
            { etiqueta: 'Gastronomía', numero: '05', ancla: '#gastronomia' },
          ].map(({ etiqueta, numero, ancla }) => (
            <a
              key={etiqueta}
              href={ancla}
              className="group flex flex-col gap-1 px-4 py-5
                         border-r border-crema/10 last:border-r-0
                         hover:bg-crema/5 transition-colors duration-300"
            >
              <span className="font-titulo text-sol text-3xl">{numero}</span>
              <span className="font-cuerpo text-crema/60 text-xs tracking-widest uppercase
                               group-hover:text-crema transition-colors duration-300">
                {etiqueta}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* ── INDICADOR DE SCROLL ── */}
      <div className="absolute bottom-36 right-8 z-10 hidden md:flex flex-col
                      items-center gap-2 text-crema/40">
        <span className="font-cuerpo text-[10px] tracking-[0.3em] uppercase [writing-mode:vertical-rl]">
          Descubrir
        </span>
        <IconoFlecha />
      </div>

    </header>
  );
}
