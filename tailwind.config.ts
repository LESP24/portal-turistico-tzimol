// =============================================================
// tailwind.config.ts — Portal Turístico de Tzimol
// Compatibilidad: Tailwind CSS v3 (el más usado con Next.js 14/15)
// Si usas Tailwind v4, migrar las variables a globals.css con @theme
// =============================================================
import type { Config } from 'tailwindcss'

const config: Config = {
  // Archivos donde Tailwind buscará clases usadas (purge en producción)
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      // -----------------------------------------------------------
      // PALETA DE COLORES — Identidad visual "Selva Chiapaneca"
      // -----------------------------------------------------------
      colors: {
        selva:     '#1E3A2F', // Verde selva profundo — fondos principales
        jade:      '#2D5A4B', // Verde jade — acentos y botones primarios
        canopy:    '#4A7C59', // Verde dosel — estados hover y secundarios
        sol:       '#D4A853', // Dorado sol — acento principal, énfasis
        terracota: '#B85C38', // Terracota — botón secundario, badges
        crema:     '#F7F2E8', // Crema cálida — fondos claros, texto sobre oscuro
        corteza:   '#2A1810', // Café oscuro — texto principal sobre fondos claros
      },

      // -----------------------------------------------------------
      // TIPOGRAFÍA — Variables definidas en globals.css
      // Abril Fatface → display/titulares (dramática, editorial)
      // Lora          → cuerpo de texto (elegante, legible)
      // -----------------------------------------------------------
      fontFamily: {
        titulo: ['var(--fuente-titulo)', 'serif'],
        cuerpo: ['var(--fuente-cuerpo)', 'serif'],
      },

      // -----------------------------------------------------------
      // ANIMACIONES CSS
      // -----------------------------------------------------------
      animation: {
        'flote':     'flote 6s ease-in-out infinite',
        'revelar':   'revelar 0.7s ease-out forwards',
        'pulso-sol': 'pulso-sol 2.5s ease-in-out infinite',
      },
      keyframes: {
        flote: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        revelar: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0px)' },
        },
        'pulso-sol': {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%':      { opacity: '1',   transform: 'scale(1.05)' },
        },
      },

      // -----------------------------------------------------------
      // SOMBRAS PERSONALIZADAS
      // -----------------------------------------------------------
      boxShadow: {
        'carta':       '0 4px 24px rgba(30, 58, 47, 0.12)',
        'carta-hover': '0 12px 40px rgba(30, 58, 47, 0.22)',
        'sol':         '0 0 32px rgba(212, 168, 83, 0.35)',
      },
    },
  },

  plugins: [],
}

export default config
