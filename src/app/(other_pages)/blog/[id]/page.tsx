import { fetchBlogById } from "@/lib/fetchBlogById";

interface BlogPageProps {
  params: Promise<{ id: string }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { id } = await params;
  const blog = await fetchBlogById(id);

  if (!blog) {
    return <div className="main-content mx-auto px-5 text-center text-3xl py-16 text-black max-w-7xl">Blog not found</div>;
  }

  return (
    <div className="main-content mx-auto py-16 text-black max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="text-center flex flex-col justify-center">
        <h1 className="text-3xl text-orange-500 md:text-4xl font-bold mb-4 capitalize">{blog.title}</h1>
       <span>
         <p className="text-gray-600 text-[12px] mb-4 inline-block">
            {new Date(blog.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="mx-3 text-gray-700 text-[12px] mb-4 p-1 px-2 inline-block rounded-2xl border bg-gray-100 border-gray-500">
            {blog.category?.title}
          </p>
       </span>
        </div>
        <div className="flex-shrink-0 w-full lg:max-w-md">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-80 object-cover rounded-lg shadow"
            />
        </div>
        <div>

        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-start gap-8">
        
        {/* Left Side - Text */}
        <div className="flex-1">
          <p className="text-lg leading-relaxed text-gray-800">
            {blog.description}
          </p>
        </div>
      </div>
    </div>


  );
}
