import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const addUserScore = mutation({
  args: {
    userDocumentId: v.id("Users"),
    userScores: v.array(v.float64()),
    newScore: v.number(),
  },
  handler: async (ctx, args) => {
    try {
      await ctx.db.patch(args.userDocumentId, {
        scores: [...args.userScores, args.newScore],
      });
      return {
        success: true,
        message: `Added score for ${args.userDocumentId}.`,
      };
    } catch (error) {
      return {
        success: false,
        message: `Could not update score for ${args.userDocumentId}: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  },
});
