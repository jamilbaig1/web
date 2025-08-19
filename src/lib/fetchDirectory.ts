import { client } from '../../lib/sanity';

export type Directory = {
  _id: string;
  name: string;
  logo?: string;
  category?: { _id: string; title: string };
  description: string;
  link: string ;
};

export async function fetchDirectory(): Promise<Directory[]> {
  const query = `*[_type == "directory"]{
    _id,
    name,
    "logo": logo.asset->url,
    description,
    link,
    category->{_id, title}
  }`;
  return await client.fetch(query);
}
