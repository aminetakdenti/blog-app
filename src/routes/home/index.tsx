
import { useBlog } from "@/hooks/useBlog";
import BlogPreview from "@/components/BlogPreview";
import { getFirst20Words } from "@/lib/utils";

export default function Home() {
  const { list } = useBlog();
  return (
    <div className="flex flex-col gap-4 divide-y space-y-4">
      {!list ? (
        <p>Loading...</p>
      ) : list.length ? (
        list.map((blog) => {
          return (
            <BlogPreview
              title={blog.title}
              content={getFirst20Words(blog.content)}
              name={blog.name || ""}
              id={blog._id}
              userImage={blog.imageUrl || ""}
              key={blog._id as string}
              blogImage={blog.blogImage}
              categories={blog.categories}
            />
          );
        })
      ) : (
        <p>There are no blogs to display.</p>
      )}
    </div>
  );
}