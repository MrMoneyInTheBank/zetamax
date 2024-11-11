import { query } from "./_generated/server";
import { v } from "convex/values";

export const getUserDocument = query({
  args: { clerkUserId: v.string() },
  handler: async (ctx, args) => {
    try {
      const userDocument = await ctx.db
        .query("Users")
        .filter((q) => q.eq(q.field("clerkUserId"), args.clerkUserId))
        .first();

      if (!userDocument) {
        return {
          success: false,
          message: `Could not find user ${args.clerkUserId}.`,
        };
      }

      return {
        success: true,
        userDocument: userDocument,
        message: `Successfully found user ${args.clerkUserId}.`,
      };
    } catch (error) {
      return {
        success: false,
        message: `Could not fetch user ${args.clerkUserId} document from convex: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  },
});
