import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const deleteUser = mutation({
  args: { userDocumentId: v.id("Users") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.userDocumentId);
  },
});
