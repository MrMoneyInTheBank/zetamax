"use server";

import { UserWebhookEvent } from "@clerk/nextjs/server";
import { WebhookHandlerResponse } from "..";
import { createWebhookHandlerResponse } from "..";
import { api } from "../../../convex/_generated/api";
import { fetchMutation } from "convex/nextjs";

export default async function handleClerkUserCreation(
  event: UserWebhookEvent,
): Promise<WebhookHandlerResponse> {
  if (event.type !== "user.created") {
    return createWebhookHandlerResponse(false, "Incorrect event type");
  }

  const clerkUserId = event.data.id;
  const { success: userCreated, message: userCreatedMessage } =
    await fetchMutation(api.createUser.createUser, {
      clerkUserId: clerkUserId,
    });

  return createWebhookHandlerResponse(userCreated, userCreatedMessage);
}
