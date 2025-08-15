
'use client';
import { Blog } from "../../lib/fetchBlogs";
import { BlogCategory } from "../../lib/fetchBlogCategories";
import BlogListWithLoadMore from "./BlogListWithLoadMore";

export default function BlogSection({ allBlogs, categories , all }: { allBlogs: Blog[], categories: BlogCategory[] , all: boolean }) {
  return <BlogListWithLoadMore allBlogs={allBlogs} categories={categories} all={all} />;
}
