import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const addUserScore = mutation({
  args: {
    userDocumentId: v.id("Users"),
    userScores: v.array(v.float64()),
    newScore: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userDocumentId, {
      scores: [...args.userScores, args.newScore],
    });
  },
});
