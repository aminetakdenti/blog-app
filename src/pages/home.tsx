import { useBlog } from "@/hooks/useBlog";
import Blog from "@/components/Blog";
import Convex from "@/pages/convex";

export default function Home() {
  const { list } = useBlog();
  return (
    <div className="flex flex-col gap-4 divide-y">
      {list?.map((blog, index: number) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <Blog key={index} title={blog.title} content={blog.content} />
      ))}
      <Convex />
    </div>
  );
}
