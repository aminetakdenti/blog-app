import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    password: v.string(),
    imageUrl: v.string(),
    tokenIdentifier: v.string(),
  }),
  blogs: defineTable({
    title: v.string(),
    content: v.string(),
    userId: v.string(),
  }),
});
