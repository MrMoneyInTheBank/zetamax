import { query } from "./_generated/server";

export const getEverything = query({
  handler: async (ctx) => {
    const data = await ctx.db.query("Users").collect();
    return data;
  },
});
