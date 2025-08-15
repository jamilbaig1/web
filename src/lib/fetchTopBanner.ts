import { client } from '../../lib/sanity';

export type TopBanner = {
  _id: string;
  imageUrl: string;
  text: string;
  buttonLink: string;
};

export async function fetchTopBanner(): Promise<TopBanner> {
  const query = `
    *[_type == "topBanner"] 
      | order(_createdAt desc)[0] {
        _id,
        "imageUrl": bannerImage.asset->url,
        text,
        buttonLink
      }
  `;
  
  return await client.fetch(query);
}
