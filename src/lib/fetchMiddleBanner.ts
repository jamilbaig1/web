import { client } from '../../lib/sanity';

export type MiddleBanner = {
  _id: string;
  imageUrl: string;
  text: string;
  buttonLink: string;
};

export async function fetchMiddleBanner(): Promise<MiddleBanner> {
  const query = `
    *[_type == "middleBanner"] 
      | order(_createdAt desc)[0] {
        _id,
        "imageUrl": bannerImage.asset->url,
        text,
        buttonLink
      }
  `;
  
  return await client.fetch(query);
}
