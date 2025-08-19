import React from 'react'
import BlogSection from '../../components/BlogSection'
import { fetchBlogs } from "../../../lib/fetchBlogs";
import { fetchBlogCategories } from "../../../lib/fetchBlogCategories";

const Blog =  async () => {
const allBlogs = await fetchBlogs();
const blogCategories = await fetchBlogCategories();

  return (
    <>
        <div className="main-content mx-auto px-5 py-16 text-black max-w-7xl">
              {/* Header */}
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-orange-500">
                  The Local Loop Blog
                </h2>
                <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                  Your source for community events, local restaurant reviews, interview, guides and all other things Winter Garden.
                </p>
              </div>
            <BlogSection allBlogs={allBlogs} categories={blogCategories} all={true} />
        </div>
    </>
  )
}

export default Blog