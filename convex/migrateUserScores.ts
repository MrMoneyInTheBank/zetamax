import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const migrateUserScores = mutation({
  args: {
    userDocumentId: v.id("Users"),
    userScores: v.array(v.number()),
    localScores: v.array(v.number()),
  },
  handler: async (ctx, args) => {
    try {
      await ctx.db.patch(args.userDocumentId, {
        scores: [...args.userScores, ...args.localScores],
      });

      return {
        success: true,
        message: `Migrated scores for ${args.userDocumentId}`,
      };
    } catch (error) {
      return {
        success: false,
        message: `Coult not migrate scores for ${args.userDocumentId}`,
      };
    }
  },
});
