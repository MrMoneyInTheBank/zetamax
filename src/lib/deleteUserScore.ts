"use server";

import { fetchQuery, fetchMutation } from "convex/nextjs";
import { api } from "../../convex/_generated/api";

export async function deleteUserScore(userId: string) {
  if (!userId || userId === "") {
    return;
  }
  const { success: querySuccess, userDocument } = await fetchQuery(
    api.getUserDocument.getUserDocument,
    {
      clerkUserId: userId,
    },
  );

  if (!querySuccess || !userDocument) {
    return;
  }

  await fetchMutation(api.deleteUserScores.deleteUserScores, {
    userDocumentId: userDocument._id,
  });
}
