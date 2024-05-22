import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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
    userId: v.string(),
  },
  handler: async (ctx, { title, content, userId }) => {
    return await ctx.db.insert("blogs", {
      title,
      content,
      userId,
    });
  },
});
