import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { useBlog } from "@/hooks/useBlog";

export default function Upload() {
  const { create } = useBlog();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log({ title, content });
    create({ title, content });
    navigate("/");
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={(e) => handleSubmit(e)}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          name="title"
          className="dark"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={content}
          className="dark"
          rows={10}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <Button className="dark" type="submit">
        submit
      </Button>
    </form>
  );
}
