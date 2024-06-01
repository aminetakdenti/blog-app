import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createCategory = mutation({
  args: { name: v.string() },
  handler: async (ctx, { name }) => {
    return await ctx.db.insert("category", {
      name,
      usageCount: 1,
    });
  },
});

export const listCategories = query({
  handler: async (ctx) => {
    return await ctx.db.query("category").collect();
  },
});

export const incrementCategoryUsage = mutation({
  args: { id: v.id("category") },
  handler: async (ctx, { id }) => {
    const category = await ctx.db.get(id);
    if (!category) {
      throw new Error("Category not found");
    }
    return await ctx.db.patch(id, {
      usageCount: category.usageCount + 1,
    });
  },
});
