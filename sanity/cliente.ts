import { createClient } from 'next-sanity';

export const clienteSanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-03-01', // La fecha de hoy o de cuando iniciaste el proyecto
  useCdn: false, // En 'false' para que los cambios del Ayuntamiento se vean reflejados al instante
});