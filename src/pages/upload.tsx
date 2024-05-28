import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/ConfirmDialog";
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

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  content: z.string().min(12, {
    message: "Blog content must be at least 12 characters.",
  }),
});

const ProfileForm = () => {
  const user = useAuth();
  const navigate = useNavigate();
  const { create } = useBlog();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user.userId) {
      throw new Error("User is not authenticated.");
    }

    // create({ ...values });
    // navigate("/");
  }

  if (!user) return null;

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          <ConfirmDialog />
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
