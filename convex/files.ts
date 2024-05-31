import { mutation } from "./_generated/server";

export const generateUploadUrl = mutation({
  args: {
    // ...
  },
  handler: async (ctx) => {
    // use `args` and/or `ctx.auth` to authorize the user
    // ...
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated call to mutation");
    }

    // Return an upload URL
    return await ctx.storage.generateUploadUrl();
  },
});
