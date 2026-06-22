'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';

export default function PaginaStudio() {
  return <NextStudio config={config} />;
}