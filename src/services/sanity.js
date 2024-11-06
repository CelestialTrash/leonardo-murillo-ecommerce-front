// services/sanity.js

import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,  // Usa import.meta.env para obtener variables de entorno
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2023-01-01', // Versión de la API de Sanity para garantizar estabilidad
});

export default sanityClient;
