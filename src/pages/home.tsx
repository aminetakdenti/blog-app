import { useBlog } from "@/hooks/useBlog";
import Blog from "@/components/Blog";
import Convex from "@/pages/convex";

export default function Home() {
  const { list } = useBlog();
  return (
    <div className="flex flex-col gap-4 divide-y">
      {list?.map((blog) => {
        return (
          <Blog
            title={blog.title}
            content={blog.content}
            name={blog.name || ""}
            id={blog._id}
            imageUrl={blog.imageUrl || ""}
            key={blog._id as string}
          />
        );
      })}
      <Convex />
    </div>
  );
}
