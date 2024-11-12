"use server";

import { UserResource } from "@clerk/types/dist";
import { fetchQuery, fetchMutation } from "convex/nextjs";
import { api } from "../../convex/_generated/api";

export async function addUserScore(
  user: UserResource | null | undefined,
  newScore: number,
) {
  if (!user) {
    return {
      success: false,
      message: "Create an account to save your scores.",
      description: "Click on the top right corner to create an account.",
    };
  } else {
    // patch db
    const {
      success: querySuccess,
      userDocument,
      message: queryMessage,
    } = await fetchQuery(api.getUserDocument.getUserDocument, {
      clerkUserId: user.id,
    });

    if (!querySuccess || !userDocument) {
      return { success: querySuccess, message: queryMessage };
    }

    const userDocumentId = userDocument._id;
    const userScores = userDocument.scores;

    const { success: mutationSuccess, message: mutationMessage } =
      await fetchMutation(api.addUserScore.addUserScore, {
        userDocumentId: userDocumentId,
        userScores: userScores,
        newScore: newScore,
      });

    return {
      success: mutationSuccess,
      message: mutationMessage,
      description: "View your stats at the bottom.",
    };
  }
}
