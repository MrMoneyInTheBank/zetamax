"use server";

import { WebhookEvent } from "@clerk/nextjs/server";
import handleClerkUserCreation from "./user-created";
import handleClerkUserDeletion from "./user-deleted";
import { WebhookHandlerResponse, createWebhookHandlerResponse } from "..";

export default async function handleClerkWebhook(
  event: WebhookEvent,
): Promise<WebhookHandlerResponse> {
  if (event.type === "user.created") {
    return handleClerkUserCreation(event);
  } else if (event.type === "user.deleted") {
    return handleClerkUserDeletion(event);
  } else {
    return createWebhookHandlerResponse(false, "Invalid Clerk webhook event");
  }
}
