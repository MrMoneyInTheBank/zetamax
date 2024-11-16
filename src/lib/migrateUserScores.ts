"use server";

import { fetchQuery, fetchMutation } from "convex/nextjs";
import { api } from "../../convex/_generated/api";

export async function migrateUserScores(userId: string, localScores: number[]) {
  if (!userId || localScores.length == 0) {
    return { success: true, message: "write a better message here" };
  }

  console.log(`hello, i am migrating these scores ${localScores}`);

  const {
    success: querySuccess,
    userDocument,
    message: queryMessage,
  } = await fetchQuery(api.getUserDocument.getUserDocument, {
    clerkUserId: userId,
  });

  if (!querySuccess || !userDocument) {
    return { success: querySuccess, message: queryMessage };
  }

  const userDocumentId = userDocument._id;
  const userScores = userDocument.scores;

  const { success: mutationSuccess, message: mutationMessage } =
    await fetchMutation(api.migrateUserScores.migrateUserScores, {
      userDocumentId: userDocumentId,
      userScores: userScores,
      localScores: localScores,
    });

  return {
    success: mutationSuccess,
    message: mutationMessage,
  };
}
