import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuid4 } from "uuid";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import Editor from "@/components/Editor";
import { useBlog } from "@/hooks/useBlog";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import DownshiftInput from "@/components/DownshiftInput";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import Dropezone from "@/components/Dropezone";
import type { UploadFileResponse } from "@xixixao/uploadstuff";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  content: z.string().min(12, {
    message: "Blog content must be at least 12 characters.",
  }),
});

const ProfileForm = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [image, setImage] = useState<UploadFileResponse | null>(null);

  const user = useAuth();
  const navigate = useNavigate();
  const { create } = useBlog();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      // imageUrl: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user.userId) {
      throw new Error("User is not authenticated.");
    }

    if (!image) {
      throw new Error("Image is required.");
    }

    const response = image.response as { storageId: string };

    create({
      title: values.title,
      content: values.content,
      categories,
      imageId: response.storageId,
    });

    // create({ ...values });
    navigate("/");
  }

  if (!user) return null;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full "
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display blog title.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Picture</FormLabel>
              <FormControl>
                <Input type="file" {...field} />
              </FormControl>
              <FormDescription>
                This is your hero image for your blog.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <Dropezone setImage={setImage} />

        <FormField
          name="categories"
          render={() => (
            <FormItem>
              <FormLabel>Categories</FormLabel>
              <FormControl>
                <DownshiftInput setCategories={setCategories} />
              </FormControl>
              <FormDescription>This is your blog categories.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {categories.length > 0 && (
          <div className="flex gap-2 flex-wrap overflow-hidden">
            {categories?.map((category) => (
              <Badge key={uuid4()} className="text-sm">
                {category}
              </Badge>
            ))}
          </div>
        )}

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blog content</FormLabel>
              <FormControl>
                <Editor content={field.value} setContent={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
