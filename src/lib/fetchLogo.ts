import { client } from '../../lib/sanity';

export type SiteLogo = {
  logo: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  alt: string;
  title: string;
};

// Fetch site logo (only the first one)
export async function fetchSiteLogo(): Promise<SiteLogo> {
  const query = `
    *[_type == "siteLogo"][0]{
      logo,
      alt,
      title
    }
  `;

  return await client.fetch(query);
}
