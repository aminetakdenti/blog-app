import sanitize from "sanitize-html";

export function tiptapToHtml(content: string): string {
  const htmlContent = sanitize(content, {
    allowedTags: ["h1", "p", "hr"],
    allowedAttributes: {
      "*": ["class"],
    },
  });
  return htmlContent;
}
