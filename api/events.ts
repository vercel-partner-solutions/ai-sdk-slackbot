import type { SlackEvent } from "@slack/web-api";
import {
  assistantThreadMessage,
  handleNewAssistantMessage,
} from "../lib/handle-messages";
import { SuccessResponse } from "../lib/utils";
import { waitUntil } from "@vercel/functions";
import { handleNewAppMention } from "../lib/handle-app-mention";
import { verifyRequest, getBotId } from "../lib/slack-utils";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const payload = JSON.parse(rawBody);
  const requestType = payload.type as "url_verification" | "event_callback";

  await verifyRequest({ requestType, request, payload, rawBody });

  try {
    const botUserId = await getBotId();

    const event = payload.event as SlackEvent;

    if (event.type === "app_mention") {
      waitUntil(handleNewAppMention(event, botUserId));
      return SuccessResponse();
    }

    if (event.type === "assistant_thread_started") {
      waitUntil(assistantThreadMessage(event));
      return SuccessResponse();
    }

    if (
      event.type === "message" &&
      !event.subtype &&
      event.channel_type === "im" &&
      !event.bot_id &&
      !event.bot_profile &&
      event.bot_id !== botUserId
    ) {
      waitUntil(handleNewAssistantMessage(event, botUserId));
      return SuccessResponse();
    }

    return SuccessResponse();
  } catch (error) {
    console.error("Error generating response", error);
    return new Response("Error generating response", { status: 500 });
  }
}
