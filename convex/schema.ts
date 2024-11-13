import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  Users: defineTable({
    clerkUserId: v.string(),
    scores: v.array(v.float64()),
  }),
});
