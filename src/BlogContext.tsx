import { ReactNode, createContext, useContext, useState } from "react";
import { blogs as cblogs } from "@/constant";
import { Blog } from "@/types";

type BlogContextType = {
  blogs: Blog[];
  addBlog: (blog: Blog) => void;
  deleteBlog: (id: number) => void;
  updateBlog: (blog: Blog) => void;
};

const INITIAL_STATE = {
  blogs: [],
  addBlog: () => {},
  deleteBlog: () => {},
  updateBlog: () => {},
};

const BlogContext = createContext<BlogContextType>(INITIAL_STATE);

export const BlogContextProvider = ({ children }: { children: ReactNode }) => {
  const [blogs, setBlogs] = useState(cblogs);

  function addBlog(blog: Blog) {
    setBlogs((prev) => [blog, ...prev]);
  }

  function deleteBlog(id: number) {
    const blogIndex = blogs.findIndex((b) => b.id !== id);
    if (blogIndex < 0) return;
    const newBlogs = [...blogs];
    newBlogs.splice(blogIndex, 1);
    setBlogs([...newBlogs]);
  }

  function updateBlog(blog: Blog) {
    const blogIndex = blogs.findIndex((b) => b.id === blog.id);
    if (blogIndex < 0) return;
    const newBlogs = [...blogs];
    newBlogs[blogIndex] = blog;
    setBlogs([...newBlogs]);
  }

  const value = {
    blogs,
    addBlog,
    deleteBlog,
    updateBlog,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useBlog = () => useContext(BlogContext);
