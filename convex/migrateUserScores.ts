import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const migrateUserScores = mutation({
  args: {
    userDocumentId: v.id("Users"),
    newUserScores: v.array(v.number()),
  },
  handler: async (ctx, args) => {
    try {
      await ctx.db.patch(args.userDocumentId, {
        // scores: [...args.userScores, ...args.localScores],
        scores: args.newUserScores,
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
