import { client } from '../../lib/sanity';

export type Sidebar = {
  _id: string;
  imageUrl: string;
  text: string;
  buttonLink: string;
};

// If you want ALL sidebar documents
export async function fetchSideBar(): Promise<Sidebar[]> {
  const query = `
    *[_type == "sidebar"]{
      _id,
      "imageUrl": sidebarimage.asset->url,
      text,
      buttonLink
    }
  `;
  
  return await client.fetch(query);
}
