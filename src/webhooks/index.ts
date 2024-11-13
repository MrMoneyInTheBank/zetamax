"use server";

import { WebhookEvent as ClerkWebhookEvent } from "@clerk/nextjs/server";
import handleClerkWebhook from "./clerk";

export interface WebhookHandlerResponse {
  success: boolean;
  message: string;
}

export type WebhookEventType = { type: "clerk"; event: ClerkWebhookEvent };

interface HandleWebhookParams {
  webhookEvent: WebhookEventType;
}

export async function createWebhookHandlerResponse(
  success: boolean,
  message: string,
): Promise<WebhookHandlerResponse> {
  return { success, message };
}

export default async function handleWebhook({
  webhookEvent,
}: HandleWebhookParams): Promise<WebhookHandlerResponse> {
  if (webhookEvent.type === "clerk") {
    return await handleClerkWebhook(webhookEvent.event);
  } else {
    return await createWebhookHandlerResponse(false, "Invalid webhook type.");
  }
}
