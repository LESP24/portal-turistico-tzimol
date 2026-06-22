import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import lugarTuristico from './sanity/schemas/lugarTuristico'; // <-- Importamos tu molde

export default defineConfig({
  name: 'default',
  title: 'Panel Tzimol',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET as string,
  basePath: '/studio', 
  plugins: [structureTool()],
  schema: {
    types: [lugarTuristico], // <-- Le decimos a Sanity que lo use
  },
});