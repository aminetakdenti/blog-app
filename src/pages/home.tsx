import { useBlog } from "@/hooks/useBlog";
import Blog from "@/components/Blog";
import { getFirst20Words } from "@/lib/utils";

export default function Home() {
  const { list } = useBlog();
  return (
    <div className="flex flex-col gap-4 divide-y space-y-4">
      {list?.map((blog) => {
        return (
          <Blog
            title={blog.title}
            content={getFirst20Words(blog.content)}
            name={blog.name || ""}
            id={blog._id}
            userImage={blog.imageUrl || ""}
            key={blog._id as string}
            blogImage={blog.blogImage}
          />
        );
      })}
    </div>
  );
}
