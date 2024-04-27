import { api } from "../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

export const useBlog = () => {
  const list = useQuery(api.blogs.list);
  const create = useMutation(api.blogs.create);
  return { list, create };
};
