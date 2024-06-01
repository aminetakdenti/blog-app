import { extractTextFromHtml } from "@/tiptap/tiptaptohtml";
import { Link } from "react-router-dom";
import type { Id } from "convex/_generated/dataModel";
import { Badge } from "./ui/badge";

type Props = {
  title: string;
  content: string;
  name: string;
  userImage: string;
  blogImage: string | null;
  categories: string[];
  id: Id<"blogs">;
};

function BlogPreview({
  title,
  content,
  userImage,
  name,
  blogImage,
  categories,
  id: blog,
}: Props) {
  return (
    <div className="pt-5">
      <Link to={`/blog/${blog}`}>
        <div className="flex justify-between">
          <div className="space-y-3 flex-1 ">
            <div className="flex items-center gap-3">
              <div className="size-8">
                <img src={userImage || ""} alt="user avatar" />
              </div>
              <h1>{name}</h1>
            </div>
            <div className="space-y-1 pl-2  flex-1">
              <h3 className="text-xl font-bold dark:text-gray-500 text-gray-600">
                {title}
              </h3>
              <p className="text-gray-500 dark:text-gray-600 ">
                {extractTextFromHtml(content)}
              </p>
            </div>
          </div>
          <div className="h-28 w-36 overflow-hidden">
            <img
              src={blogImage || ""}
              alt={title}
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      </Link>
      {categories.length > 1 && (
        <div className="flex gap-2">
          {categories.slice(1).map((category) => (
            <Badge key={category}>{category}</Badge>
          ))}
        </div>
      )}
    </div>
  );
}
export default BlogPreview;
