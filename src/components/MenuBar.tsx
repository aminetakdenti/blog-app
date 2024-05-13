import { type Editor } from "@tiptap/react";
import { Toggle } from "@/components/ui/toggle";
import {
  Bold,
  Italic,
  Strikethrough,
  RemoveFormatting,
  Pilcrow,
  Heading,
  List,
  ListOrdered,
  Minus,
  Quote,
  Highlighter,
  CodeSquare,
  Underline,
} from "lucide-react";

// eslint-disable-next-line react-refresh/only-export-components
const MenuBar = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap divide-x border w-fit rounded-lg">
      <Toggle
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <Bold />
      </Toggle>
      <Toggle
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "is-active" : ""}
      >
        <Underline />
      </Toggle>
      <Toggle
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <Italic />
      </Toggle>
      <Toggle
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <Strikethrough />
      </Toggle>
      <Toggle
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("code") ? "is-active" : ""}
      >
        <CodeSquare />
      </Toggle>
      <Toggle
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        disabled={!editor.can().chain().focus().unsetAllMarks().run()}
      >
        <RemoveFormatting />
      </Toggle>
      <Toggle
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      >
        <Pilcrow />
      </Toggle>
      <Toggle
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        <Heading />
      </Toggle>
      <Toggle
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <List />
      </Toggle>
      <Toggle
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <ListOrdered />
      </Toggle>
      <Toggle
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        <Quote size={20} />
      </Toggle>
      <Toggle onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <Minus />
      </Toggle>
      <Toggle
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={editor.isActive("highlight") ? "is-active" : ""}
      >
        <Highlighter />
      </Toggle>
    </div>
  );
};

export default MenuBar;
