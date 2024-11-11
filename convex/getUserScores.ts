import { query } from "./_generated/server";
import { v } from "convex/values";

export const getUserScores = query({
  args: { clerkUserId: v.string() },
  handler: async (ctx, args) => {
    const scores = await ctx.db
      .query("Users")
      .filter((q) => q.eq(q.field("clerkUserId"), args.clerkUserId))
      .first();

    return scores?.scores;
  },
});
