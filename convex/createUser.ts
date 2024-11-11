import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: { clerkUserId: v.string() },
  handler: async (ctx, args) => {
    try {
      await ctx.db.insert("Users", {
        clerkUserId: args.clerkUserId,
        scores: [],
      });
      return {
        success: true,
        message: `Successfully created new user ${args.clerkUserId}.`,
      };
    } catch (error) {
      return {
        success: false,
        message: `Could not save user ${args.clerkUserId} to Convex database: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  },
});
