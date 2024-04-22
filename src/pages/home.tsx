import { useBlog } from "@/BlogContext";
import Blog from "@/components/blog";

export default function Home() {
  const { blogs } = useBlog();
  return (
    <div className="flex flex-col gap-4 divide-y">
      {blogs.map((blog, index) => (
        <Blog key={index} title={blog.title} content={blog.content} />
      ))}
    </div>
  );
}
