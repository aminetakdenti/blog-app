import { extractTextFromHtml } from "@/tiptap/tiptaptohtml";
import { Link } from "react-router-dom";
import type { Id } from "convex/_generated/dataModel";

type Props = {
  title: string;
  content: string;
  name: string;
  imageUrl: string;
  id: Id<"blogs">;
};

export default function Blog({
  title,
  content,
  imageUrl,
  name,
  id: blog,
}: Props) {
  // const blogRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   if (blogRef.current !== null) {
  //     const htmlContent = tiptapToHtml(content);
  //     blogRef.current.innerHTML = htmlContent;
  //   }
  // }, [content]); // Update when content changes

  return (
    <div className="pt-5">
      <Link to={`/blog/${blog}`}>
        <div className="flex justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="size-8">
                <img src={imageUrl || ""} alt="user avatar" />
              </div>
              <h1>{name}</h1>
            </div>
            <div className="space-y-1 pl-2 dark:text-gray-300 flex-1">
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="content">{extractTextFromHtml(content)}</p>
              {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
            </div>
          </div>
          <div className="h-28 w-36 bg-red-600">
            <img src="" alt="" />
          </div>
        </div>
      </Link>
    </div>
  );
}
