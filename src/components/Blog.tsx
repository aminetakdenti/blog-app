import { extractTextFromHtml } from "@/tiptap/tiptaptohtml";
import { Link } from "react-router-dom";
import type { Id } from "convex/_generated/dataModel";

type Props = {
  title: string;
  content: string;
  name: string;
  userImage: string;
  blogImage: string | null;
  id: Id<"blogs">;
};

export default function Blog({
  title,
  content,
  userImage,
  name,
  blogImage,
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
          <div className="h-28 w-36 ">
            <img src={blogImage || ""} alt={title} />
          </div>
        </div>
      </Link>
    </div>
  );
}
