import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";

const extensions = [
  StarterKit.configure({
    heading: {
      HTMLAttributes: {
        class: "text-3xl font-bold text-gray-800",
      },
      // how to add another heading style
    },
  }),
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
        class: "p-4 rounded-lg  dark:text-white border min-h-[400px]",
      },
    },
    onUpdate({ editor }) {
      setContent(editor.getHTML());
      console.log(editor.getJSON());
      console.log(editor.getText());
    },
  });

  return (
    <div className="flex flex-col gap-3">
      <MenuBar editor={editor!} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
