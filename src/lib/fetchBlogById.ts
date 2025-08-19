import { client } from "../../lib/sanity";

export type Blog = {
  _id: string;
  title: string;
  description: string;
  publishedAt: string;
  imageUrl: string;
  category?: {
    _id: string;
    title: string;
  };
};

export async function fetchBlogById(id: string): Promise<Blog | null> {
  const query = `
    *[_type == "blog" && _id == $id][0]{
      _id,
      title,
      description,
      publishedAt,
      "imageUrl": image.asset->url,
      category->{
        _id,
        title
      }
    }
  `;
  return await client.fetch(query, { id });
}
