import { useEffect, useRef } from "react";

import { tiptapToHtml } from "@/utils/tiptaptohtml";

type Props = {
  title: string;
  content: string;
};

export default function Blog({ title, content }: Props) {
  const blogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (blogRef.current !== null) {
      const lastChild = blogRef.current.lastChild;
      if (lastChild instanceof HTMLElement && lastChild.tagName !== "P") {
        const p = document.createElement("p");
        const htmlContent = tiptapToHtml(content);
        console.log(htmlContent);
        p.innerHTML = htmlContent;
        blogRef.current.appendChild(p);
      }
    }
  }, [content]); // Run only once when the component mounts

  return (
    <div ref={blogRef} className="py-4 space-y-3">
      <h2 className="text-3xl font-bold">{title}</h2>
    </div>
  );
}
