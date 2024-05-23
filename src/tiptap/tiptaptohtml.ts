import sanitize from "sanitize-html";

export function tiptapToHtml(content: string): string {
  const htmlContent = sanitize(content, {
    allowedTags: [
      "h1",
      "p",
      "hr",
      "ul",
      "ol",
      "li",
      "blockquote",
      "mark",
      "pre",
      "code",
    ],
    allowedAttributes: {
      "*": ["class"],
    },
  });
  return htmlContent;
}

export function extractTextFromHtml(html: string): string {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.innerText;
}
