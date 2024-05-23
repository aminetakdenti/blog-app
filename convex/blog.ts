import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import type { Id } from "./_generated/dataModel";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const blogs = await ctx.db.query("blogs").collect();
    return Promise.all(
      blogs.map(async (blog) => {
        // For each message in this channel, fetch the `User` who wrote it and
        // insert their name into the `author` field.
        const user = await ctx.db.get(blog.userId as Id<"users">);
        return {
          ...user,
          ...blog,
        };
      })
    );
    // return await ctx.db.query("blogs").order("desc").collect();
  },
});

export const get = query({
  args: {
    id: v.id("blogs"),
  },
  handler: async (ctx, { id }) => {
    const blog = await ctx.db.get(id);

    if (!blog) {
      throw new Error("Blog not found");
    }

    const user = await ctx.db.get(blog.userId as Id<"users">);

    return {
      ...user,
      ...blog,
    };
  },
});

export const getUserBlogs = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, { userId }) => {
    const blogs = await ctx.db
      .query("blogs")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();

    if (blogs.length === 0) return [];

    const user = await ctx.db.get(blogs[0].userId as Id<"users">);

    return Promise.all(
      blogs.map(async (blog) => {
        return {
          ...user,
          ...blog,
        };
      })
    );
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    content: v.string(),
  },
  handler: async (ctx, { title, content }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated call to mutation");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();
    if (!user) {
      throw new Error("Unauthenticated call to mutation");
    }

    await ctx.db.insert("blogs", {
      title,
      content,
      userId: user._id,
    });
  },
});
