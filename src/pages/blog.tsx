import BlogUserLink from "@/components/BlogUserLink";
import { useQuery } from "convex/react";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

function Blog() {
  const { id } = useParams();

  const blog = useQuery(api.blog.get, { id: id as Id<"blogs"> });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(blog?.imageUrl);
    if (ref.current && blog) {
      ref.current.innerHTML = blog.content;
    }
  }, [blog]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="space-y-4 divide-y dark:divide-slate-800 md:w-[700px] md:mx-auto  ">
      <h1 className="text-5xl font-extrabold leading-tight">{blog.title}</h1>
      <div>
        <img
          src={blog.blogImage ?? ""}
          alt={blog.title}
          className="w-full h-96 object-cover"
        />
      </div>
      <div>
        <BlogUserLink
          userId={blog.userId}
          imageUrl={blog.imageUrl ?? ""}
          name={blog.name ?? ""}
          creationTime={blog._creationTime}
        />
      </div>
      <div className="pt-4 space-y-4 leading-7" ref={ref} />
    </div>
  );
}

export default Blog;
