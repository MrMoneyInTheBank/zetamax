"use server";

import { UserWebhookEvent } from "@clerk/nextjs/server";
import { WebhookHandlerResponse } from "..";
import { createWebhookHandlerResponse } from "..";
import { api } from "../../../convex/_generated/api";
import { fetchQuery, fetchMutation } from "convex/nextjs";

export default async function handleClerkUserDeletion(
  event: UserWebhookEvent,
): Promise<WebhookHandlerResponse> {
  if (event.type !== "user.deleted" || !event.data.id) {
    return createWebhookHandlerResponse(
      false,
      "Incorrect event type || Can't find Clerk user id",
    );
  }

  const clerkUserId = event.data.id;
  const {
    success: fetchSuccess,
    userDocument,
    message: fetchMessage,
  } = await fetchQuery(api.getUserDocument.getUserDocument, {
    clerkUserId: clerkUserId,
  });

  if (!fetchSuccess || !userDocument) {
    return createWebhookHandlerResponse(fetchSuccess, fetchMessage);
  }

  const { success: userDeleted, message: userDeletedMessage } =
    await fetchMutation(api.deleteUser.deleteUser, {
      userDocumentId: userDocument._id,
    });

  return createWebhookHandlerResponse(userDeleted, userDeletedMessage);
}
