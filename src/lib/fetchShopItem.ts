import { client } from '../../lib/sanity';

export type ShopItem = {
  _id: string;
  title: string;
  price: number;
  desc: string;
  category: string;
  comingsoon: boolean;
  imageUrl: string;
};

// Fetch all shop items
export async function fetchShopItems(): Promise<ShopItem[]> {
  const query = `
    *[_type == "shop"]{
      _id,
      title,
      price,
      desc,
      category,
      comingsoon,
      "imageUrl": itemimage.asset->url
    }
  `;
  
  return await client.fetch(query);
}
