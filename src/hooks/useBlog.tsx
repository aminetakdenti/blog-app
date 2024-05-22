import { api } from "../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

export const useBlog = () => {
  const list = useQuery(api.blog.list);
  const create = useMutation(api.blog.create);
  return { list, create };
};
