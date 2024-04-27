import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("blogs").order("desc").collect();
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    content: v.string(),
  },
  handler: async (ctx, { title, content }) => {
    return await ctx.db.insert("blogs", { title, content });
  },
});
