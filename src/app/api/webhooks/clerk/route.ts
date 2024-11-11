import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import verifyClerkWebhook from "@/webhooks/clerk/verify-clerk-request";
import handleWebhook from "@/webhooks";

export async function POST(req: NextRequest) {
  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  const {
    success: verifiedWebhook,
    message: verificationMessage,
    event,
  } = await verifyClerkWebhook({
    svixId,
    svixTimestamp,
    svixSignature,
    request: req,
  });

  if (!verifiedWebhook || !event) {
    return new NextResponse(verificationMessage, { status: 400 });
  }

  const { success: webhookSuccess, message: webhookMessage } =
    await handleWebhook({ webhookEvent: event });

  const responseCode = webhookSuccess ? 200 : 400;
  return new NextResponse(webhookMessage, { status: responseCode });
}
