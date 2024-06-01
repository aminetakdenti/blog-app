import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    imageUrl: v.string(),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
  blogs: defineTable({
    title: v.string(),
    content: v.string(),
    userId: v.string(),
    imageId: v.string(),
    categories: v.array(v.string()),
  }),
  category: defineTable({
    name: v.string(),
    usageCount: v.number(),
  }),
});
