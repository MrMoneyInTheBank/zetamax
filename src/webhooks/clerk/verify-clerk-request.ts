"use server";

import { NextRequest } from "next/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import constructClerkWebhook from "./construct-clerk-webhook-event";
import { WebhookEventType } from "..";

interface ClerkWebhookParams {
  svixId: string | null;
  svixTimestamp: string | null;
  svixSignature: string | null;
  request: NextRequest;
}

interface ClerkVerifiedWebhookResponse {
  success: boolean;
  message: string;
  event?: WebhookEventType;
}

async function parseRequest({ req }: { req: NextRequest }): Promise<{
  success: boolean;
  message: string;
  requestBody?: string;
}> {
  try {
    const payload = await req.json();
    const requestBody = JSON.stringify(payload);
    return {
      success: true,
      message: "Succesfully parsed request body for clerk webhook event",
      requestBody: requestBody,
    };
  } catch (error) {
    return {
      success: false,
      message: `${error instanceof Error ? error.message : String(error)}`,
    };
  }
}
export default async function verifyClerkWebhook({
  svixId,
  svixTimestamp,
  svixSignature,
  request,
}: ClerkWebhookParams): Promise<ClerkVerifiedWebhookResponse> {
  if (!svixId || !svixTimestamp || !svixSignature) {
    return {
      success: false,
      message: "Incomplete headers for Clerk webhook event",
    };
  }

  const {
    success: reqParsingSuccess,
    message: reqParsingMessage,
    requestBody,
  } = await parseRequest({ req: request });

  if (!reqParsingSuccess || !requestBody) {
    return {
      success: false,
      message: reqParsingMessage,
    };
  }

  const {
    success: webhookSuccess,
    message: webhookMessage,
    webhook,
  } = await constructClerkWebhook();

  if (!webhookSuccess || !webhook) {
    return {
      success: false,
      message: webhookMessage,
    };
  }

  try {
    const event: WebhookEvent = webhook.verify(requestBody, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;

    const clerkWebhookEvent: WebhookEventType = { type: "clerk", event: event };
    return {
      success: true,
      message: "Verified Clerk webhook",
      event: clerkWebhookEvent,
    };
  } catch (error) {
    return {
      success: false,
      message: `${error instanceof Error ? error.message : String(error)}`,
    };
  }
}
