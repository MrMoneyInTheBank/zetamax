import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const deleteUser = mutation({
  args: { userDocumentId: v.id("Users") },
  handler: async (ctx, args) => {
    try {
      await ctx.db.delete(args.userDocumentId);
      return {
        success: true,
        message: `Successfully deleted user ${args.userDocumentId}.`,
      };
    } catch (error) {
      return {
        success: false,
        message: `Could not delete user ${args.userDocumentId} from Convex database: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  },
});
