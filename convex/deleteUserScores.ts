import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const deleteUserScores = mutation({
  args: {
    userDocumentId: v.id("Users"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userDocumentId, {
      scores: [],
    });
  },
});
