import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import MenuBar from "@/components/MenuBar";
import { useState } from "react";

const extensions = [
  TextStyle.configure({
    HTMLAttributes: {
      class: "text-gray-800",
    },
  }),

  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
      HTMLAttributes: {
        class: "text-3xl font-bold text-gray-800",
      },
    },
  }),
];

type TipTapProps = {
  content: string;
  setContent: (content: string) => void;
};

const TipTap = ({ content, setContent }: TipTapProps) => {
  return (
    <div className=" space-y-6">
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={content}
        onUpdate={(content) => {
          setContent(content.editor.getHTML());
        }}
        children={undefined}
        editorProps={{
          attributes: {
            class: "p-4 rounded-lg  dark:text-white border min-h-[700px]",
          },
        }}
      ></EditorProvider>
    </div>
  );
};

export default TipTap;
