import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: { clerkUserId: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("Users", {
      clerkUserId: args.clerkUserId,
      scores: [],
    });
  },
});
