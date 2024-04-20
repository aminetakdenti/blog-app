import Blog from "@/components/blog";
import { blogs } from "@/constant";

export default function home() {
  return (
    <div className="flex flex-col gap-4 divide-y">
      {blogs.map((blog, index) => (
        <Blog key={index} title={blog.title} content={blog.content} />
      ))}
    </div>
  );
}
