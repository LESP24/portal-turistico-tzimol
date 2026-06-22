export default {
  name: 'lugarTuristico',
  type: 'document',
  title: 'Atractivos Turísticos',
  fields: [
    {
      name: 'nombre',
      type: 'string',
      title: 'Nombre del Lugar',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Identificador (URL)',
      type: 'slug',
      options: {
        source: 'nombre',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      // AHORA SÍ: EL CAMPO ORDEN ESTÁ LIBRE Y EN SU LUGAR
      name: 'orden',
      title: 'Orden de aparición',
      type: 'number',
      description: 'Escribe 1 para Las 3 Tzimoleras, 2 para el siguiente, etc.',
    },
    {
      name: 'descripcion',
      type: 'text',
      title: 'Descripción',
      description: 'Escribe un texto atractivo para invitar al turista.',
    },
    {
      name: 'imagenPrincipal',
      type: 'image',
      title: 'Fotografía Principal',
      options: {
        hotspot: true, // Permite recortar la imagen desde el panel
      },
    },
    {
      name: 'videoYouTube',
      type: 'url',
      title: 'Enlace de Video (YouTube)',
      description: 'Opcional. Pega el link de YouTube para no consumir espacio en servidores.',
    },
    {
      name: 'enlaceExterno',
      type: 'url',
      title: 'Sitio Web Oficial o Redes Sociales',
      description: 'Opcional. Ideal para centros administrados, ej: link de Las 3 Tzimoleras. Si es público, déjalo vacío.',
    }
  ]
}