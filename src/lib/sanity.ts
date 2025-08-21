import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const config = {
  projectId: 'n7w5gf77',      
  dataset: 'production',
  apiVersion: '2025-07-31',
  useCdn: true,
};

export const sanityClient = createClient(config);

// Secure client (write, server-only)
export const writeClient = createClient({
  ...config,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}