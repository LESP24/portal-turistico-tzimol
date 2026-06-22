import { clienteSanity } from '../../../sanity/cliente';
import { groq } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Usamos 'any' en params temporalmente para evitar conflictos de TypeScript entre versiones de Next.js
export default async function PaginaDestino({ params }: any) {
  // 1. DESEMPAQUETAMOS LA URL DE FORMA SEGURA
  const parametros = await params;
  const slugActual = parametros.slug;

  // 2. Buscamos el lugar en Sanity
  const destino = await clienteSanity.fetch(
    groq`*[_type == "lugarTuristico" && slug.current == $slug][0]{
      nombre,
      descripcion,
      "imagen": imagenPrincipal.asset->url,
      "sitioWebOficial": enlaceExterno
    }`,
    // 👇 AQUÍ LE ENTREGAMOS EL SLUG A SANITY
    { slug: slugActual }, 
    { cache: 'no-store' }
  );

  // 3. Si alguien escribe una URL que no existe, mostramos error 404
  if (!destino) {
    notFound();
  }

  // 4. Dibujamos la plantilla de la página
  return (
    <main className="bg-crema min-h-screen">
      
      {/* Cabecera con la imagen gigante */}
      <div className="relative w-full h-[50vh] md:h-[60vh] bg-jade">
        {/* Solo dibujamos la imagen si el Ayuntamiento la subió */}
        {destino.imagen && (
          <Image 
            src={destino.imagen} 
            alt={`Vista de ${destino.nombre}`} 
            fill 
            className="object-cover"
            priority
          />
        )}
        {/* Filtro oscuro para resaltar el diseño */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Contenido del lugar */}
      <div className="contenedor-sitio py-16 -mt-20 relative z-10 bg-crema rounded-t-3xl p-8 md:p-16 shadow-xl max-w-5xl mx-auto">
        
        <Link href="/#ecoturismo" className="text-terracota font-cuerpo text-sm mb-8 inline-block hover:underline">
          ← Volver a destinos
        </Link>
        
        <h1 className="font-titulo text-selva text-4xl md:text-6xl mb-6">
          {destino.nombre}
        </h1>
        
        <div className="h-px w-20 bg-sol mb-8" aria-hidden="true" />
        
        <p className="font-cuerpo text-corteza/80 text-lg md:text-xl max-w-3xl leading-relaxed mb-12">
          {destino.descripcion}
        </p>

        {/* Solo dibujamos el botón al sitio web si el Ayuntamiento llenó ese campo */}
        {destino.sitioWebOficial && (
          <a 
            href={destino.sitioWebOficial} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="boton-primario shadow-sol inline-flex px-8 py-3 bg-selva text-crema rounded-full font-cuerpo text-sm hover:bg-corteza transition-colors"
          >
            Visitar Sitio Oficial
          </a>
        )}
      </div>
      
    </main>
  );
}