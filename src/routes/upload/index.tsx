import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
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
import { useNavigate } from "react-router";
import { useAuth } from "@clerk/clerk-react";
import { type ChangeEvent, useState } from "react";
import { useMutation } from "convex/react";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { api } from "../../../convex/_generated/api";
import { LoaderCircle } from "lucide-react";
import KeywordsInput from "@/components/tag-input";

const FILE_MAX_SIZE = 1024 * 1024 * 1.5; // 1.5MB

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  content: z.string().min(12, {
    message: "Blog content must be at least 12 characters.",
  }),
  file: z.string().nonempty("Image is required."),
});

const ProfileForm = () => {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const create = useMutation(api.blog.create);
  const { startUpload } = useUploadFiles(generateUploadUrl);

  const [keywords, setKeywords] = useState<string[]>([]);

  const handleKeywordsChange = (newKeywords: string[]) => {
    setKeywords(newKeywords);
  };

  const [file, setFile] = useState<File[] | null>(null);

  const { isLoaded, userId } = useAuth();

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      file: "",
    },
  });

  const { isSubmitting } = useFormState({ control: form.control });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      if (!file.type.startsWith("image/")) {
        form.setError("file", { message: "Only image files are allowed." });
        form.setValue("file", "");
        return;
      }

      if (file.size > FILE_MAX_SIZE) {
        form.setError("file", { message: "The size of the file is too big" });
        form.setValue("file", "");
        return;
      }

      form.setValue("file", file.name, {
        shouldValidate: true,
      });
      setFile(Array.from(files));
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!userId) {
      throw new Error("User is not authenticated.");
    }

    if (!file) {
      throw new Error("Image is required.");
    }

    const image = await startUpload(file);

    const response = image[0].response as { storageId: string };

    await create({
      title: values.title,
      content: values.content,
      categories: keywords,
      imageId: response.storageId,
    });

    navigate("/");
  };

  if (!isLoaded) return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
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

        <FormField
          control={form.control}
          name="file"
          render={() => (
            <FormItem>
              <FormLabel>Picture</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </FormControl>
              <FormDescription>
                This is your hero image for your blog.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          render={() => (
            <FormItem>
              <FormLabel>Categories</FormLabel>
              <FormControl>
                <KeywordsInput
                  initialKeywords={keywords}
                  onKeywordsChange={handleKeywordsChange}
                />
              </FormControl>
              <FormDescription>
                This is your categories for your blog.
              </FormDescription>
            </FormItem>
          )}
          name={""}
        />

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

        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <LoaderCircle className="rotate animate-spin" />
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
