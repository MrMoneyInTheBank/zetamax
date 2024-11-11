"use server";

import { Webhook } from "svix";
import { env } from "@/utils/env/env";

interface CreateClerkWebhookResponse {
  success: boolean;
  message: string;
  webhook?: Webhook;
}

export default async function constructClerkWebhook(): Promise<CreateClerkWebhookResponse> {
  try {
    const webhook = new Webhook(env.CLERK_WEBHOOK_SECRET);
    return {
      success: true,
      message: "Successfully created svix webhook",
      webhook: webhook,
    };
  } catch (error) {
    return {
      success: false,
      message: "Could not construct Clerk webhook event. Check webhook keys.",
    };
  }
}
