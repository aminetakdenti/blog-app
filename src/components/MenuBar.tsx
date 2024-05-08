import { type Editor } from "@tiptap/react";
import { Toggle } from "@/components/ui/toggle";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  RemoveFormatting,
  Pilcrow,
  Heading,
  List,
  ListOrdered,
  MessageSquareQuote,
  Minus,
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
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
      >
        <Code />
      </Toggle>
      <Toggle onClick={() => editor.chain().focus().unsetAllMarks().run()}>
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
        <MessageSquareQuote />
      </Toggle>
      <Toggle onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <Minus />
      </Toggle>
    </div>
  );
};

export default MenuBar;
