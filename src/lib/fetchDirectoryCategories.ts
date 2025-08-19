import { client } from '../../lib/sanity';

export type DirectoryCategory = {
  _id: string;
  title: string;
};

export async function fetchDirectoryCategory(): Promise<DirectoryCategory[]> {
  const query = `*[_type == "directoryCategory"]{_id, title}`;
  return await client.fetch(query);
}
