import { EditorContent, useEditor } from "@tiptap/react";
import QuotesBlock from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import CodeBlock from "@tiptap/extension-code-block";
import Highlighte from "@tiptap/extension-highlight";
import ListItem from "@tiptap/extension-list-item";
import OrderList from "@tiptap/extension-ordered-list";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";

import MenuBar from "./MenuBar";

const extensions = [
  StarterKit.configure({
    heading: {
      HTMLAttributes: {
        class: "text-3xl font-bold  dark:text-gray-100 text-gray-800",
      },
      // how to add another heading style
    },
  }),
  BulletList.configure({
    HTMLAttributes: {
      class: "pl-4 list-disc ",
    },
  }),
  OrderList.configure({
    HTMLAttributes: {
      class: "pl-4 list-decimal",
    },
  }),
  QuotesBlock.configure({
    HTMLAttributes: {
      class:
        "pl-8 text-gray-500 relative italic before:absolute before:left-4 before:bg-gray-300 before:h-full before:w-1",
    },
  }),
  Highlighte.configure({
    HTMLAttributes: {
      class: "bg-yellow-100 p-[1.5px] border border-yellow-200 rounded-md",
    },
  }),
  CodeBlock.configure({
    HTMLAttributes: {
      class: "rounded-lg p-4 my-3 bg-gray-100 dark:bg-gray-800",
    },
  }),
  Underline.configure({
    HTMLAttributes: {
      class: "underline",
    },
  }),
  ListItem,
];

type Props = {
  content: string;
  setContent: (content: string) => void;
};

const Editor = ({ content, setContent }: Props) => {
  const editor = useEditor({
    extensions,
    content,

    editorProps: {
      attributes: {
        class:
          "p-4 rounded-lg  dark:text-white border dark:border-slate-800 min-h-[400px]",
      },
    },
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="flex flex-col gap-3 bg-background">
      <MenuBar editor={editor} />
      <div className="h-[400px] overflow-auto rounded bg-background">
        <EditorContent editor={editor} className=" flex-1 " role="textbox" />
      </div>
    </div>
  );
};

export default Editor;
