import { query } from "./_generated/server";
import { v } from "convex/values";

export const getUserScores = query({
  args: { clerkUserId: v.string() },
  handler: async (ctx, args) => {
    try {
      const scores = await ctx.db
        .query("Users")
        .filter((q) => q.eq(q.field("clerkUserId"), args.clerkUserId))
        .first();

      if (!scores) {
        return {
          success: false,
          scores: [],
          message: `Could not find scores for user ${args.clerkUserId}`,
        };
      } else {
        return {
          success: true,
          scores: scores.scores,
          message: `Successfully found scores for user ${args.clerkUserId}`,
        };
      }
    } catch (error) {
      return {
        success: false,
        scores: [],
        message: `Could not fetch scores for ${args.clerkUserId}: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  },
});
