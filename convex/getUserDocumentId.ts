import { query } from "./_generated/server";
import { v } from "convex/values";

export const getUserDocument = query({
  args: { clerkUserId: v.string() },
  handler: async (ctx, args) => {
    const userDocumentId = await ctx.db
      .query("Users")
      .filter((q) => q.eq(q.field("clerkUserId"), args.clerkUserId))
      .first();

    return userDocumentId;
  },
});
