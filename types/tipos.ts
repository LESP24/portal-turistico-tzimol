// =============================================================
// types/tipos.ts — Interfaces TypeScript del Portal de Tzimol
// =============================================================
// Si el CMS agrega nuevos campos, actualizar aquí PRIMERO
// para mantener tipado fuerte en todos los componentes.
// =============================================================

// -----------------------------------------------------------
// 1. LUGARES ECOTURÍSTICOS
// -----------------------------------------------------------
export interface LugarEcoturistico {
  /** Identificador único en kebab-case. Ej: "chiflon" */
  id: string;

  /** Nombre visible al público */
  nombre: string;

  /** Descripción corta del lugar (una o dos líneas)
   * 📌 CMS: Campo de texto enriquecido en el panel de admin */
  descripcion: string;

  /**
   * Ruta relativa a la imagen desde la carpeta /public
   * Ej: "/imagenes/chiflon.jpg"
   * 📌 CMS: Se reemplazará por la URL del CDN cuando el
   *         cliente suba fotos desde el panel de administrador.
   */
  imagen: string;

  /**
   * URL del sitio web oficial del lugar.
   * - Con valor  → botón "Visitar sitio oficial" (nueva pestaña)
   * - Con null   → botón "Descubrir más" (enlace interno)
   */
  sitioWebOficial: string | null;
}

// -----------------------------------------------------------
// 2. RUTAS CULTURALES
// -----------------------------------------------------------
export interface RutaCultural {
  /** Identificador único en kebab-case. Ej: "ruta-posh" */
  id: string;

  /** Nombre de la ruta */
  nombre: string;

  /**
   * Nombre del autor o guía responsable de la ruta.
   * Se destaca visualmente con badge en SeccionRutas.
   * 📌 CMS: Podría ser una relación a una tabla de "Guías Locales"
   */
  autor: string;

  /**
   * Ruta relativa a la imagen desde /public
   * 📌 CMS: Se reemplazará por URL del CDN.
   */
  imagen: string;
}

// -----------------------------------------------------------
// 3. GASTRONOMÍA Y SERVICIOS
// -----------------------------------------------------------
export interface ServicioGastronomico {
  /** Identificador único */
  id: string;

  /** Nombre del restaurante o servicio */
  nombre: string;

  /**
   * Categoría del negocio.
   * Valores posibles: "Restaurante" | "Servicio Gastronómico" | "Servicio Local"
   * 📌 CMS: Convertir a un select/enum con opciones predefinidas en el panel.
   */
  tipo: string;

  /** Ruta relativa a la imagen desde /public */
  imagen: string;
}

// -----------------------------------------------------------
// 4. COMUNIDADES LOCALES
// -----------------------------------------------------------
export interface Comunidad {
  /** Identificador único */
  id: string;

  /** Nombre de la comunidad */
  nombre: string;

  /** Descripción breve de la comunidad */
  descripcion: string;

  /** Ruta relativa a la imagen desde /public */
  imagen: string;
}

// -----------------------------------------------------------
// 5. ESTRUCTURA RAÍZ DEL JSON
// -----------------------------------------------------------
/**
 * Tipo que representa el archivo completo `data/datos_tzimol.json`.
 *
 * 📌 CMS: En producción, esta estructura vendrá del API del panel
 *         de administrador. Ejemplo de uso con ISR (Incremental Static Regen):
 *
 *   const datos: DatosTzimol = await fetch('/api/tzimol', {
 *     next: { revalidate: 3600 }  // Actualiza cada hora
 *   }).then(r => r.json());
 */
export interface DatosTzimol {
  ecoturismo: LugarEcoturistico[];
  rutasCulturales: RutaCultural[];
  gastronomiaYServicios: ServicioGastronomico[];
  comunidades: Comunidad[];
}
