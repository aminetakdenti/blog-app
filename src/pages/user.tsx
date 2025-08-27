import type { Id } from "../../convex/_generated/dataModel";
import { api } from "../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useParams, useNavigate } from "react-router";
import { extractTextFromHtml } from "@/tiptap/tiptaptohtml";
import Loader from "@/components/loader";
import { convertTimestampToDateString } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

function User() {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentUser = useUser();
  // Use the validated ID in the query
  const user = useQuery(api.user.getUser, { id: id as Id<"users"> });
  const blogs = useQuery(api.blog.getUserBlogs, { userId: id as Id<"users"> });
  const deleteMe = useMutation(api.blog.deleteBlog);

  const [deleteBlog, setDelete] = useState(false);

  useEffect(() => {
    if (
      currentUser &&
      currentUser.user &&
      currentUser.user.id &&
      id === currentUser.user.id
    ) {
      setDelete(true);
    }
  }, [id, currentUser]);

  // Validate the ID
  if (!user)
    return (
      <div className="h-[700px] w-full flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="mt-5 space-y-16">
      <div className="flex items-center gap-5">
        <div className="size-24">
          <img src={user.data?.imageUrl} alt="User" />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <h1 className="text-3xl font-bold uppercase ">{user.data?.name}</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            {user.data?.email}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="h-[1px] w-full bg-slate-600 dark:bg-slate-400" />
        <h1 className="text-4xl font-extrabold uppercase">blogs</h1>
        <div className="h-[1px] w-full bg-slate-600 dark:bg-slate-400" />
      </div>
      <div>
        <div className="divide-y">
          {blogs?.map((blog) => (
            <div
              key={blog._id}
              role="button"
              className="flex gap-4 w-full hover:bg-slate-200 dark:hover:bg-slate-900 rounded p-5 transition-colors duration-250 cursor-pointer"
              onMouseUp={() => navigate(`/blog/${blog._id}`)}
            >
              <div className="size-52 rounded overflow-hidden">
                <img
                  src={blog?.blogImage || ""}
                  alt={blog.title}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col gap-5 justify-between">
                <div>
                  <h3 className="text-xl font-bold">{blog.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {extractTextFromHtml(blog.content)}
                  </p>
                  <p className="text-slate-400 dark:text-slate-500 mt-3">
                    {convertTimestampToDateString(blog._creationTime)}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {blog.categories.map((category) => (
                    <Badge key={category}>{category}</Badge>
                  ))}
                </div>
              </div>
              {deleteBlog && (
                <div className="flex-1 text-right">
                  <Button
                    size="icon"
                    variant="secondary"
                    type="button"
                    onClick={() => deleteMe({ id: blog._id as Id<"blogs"> })}
                  >
                    <Trash2 color="#ff5252" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default User;
