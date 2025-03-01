import type {
  AssistantThreadStartedEvent,
  GenericMessageEvent,
} from "@slack/web-api";
import { client, getThread, updateStatusUtil } from "./slack-utils";
import { callLLM } from "./ai";

export async function assistantThreadMessage(
  event: AssistantThreadStartedEvent,
) {
  const { channel_id, thread_ts } = event.assistant_thread;
  console.log(`Thread started: ${channel_id} ${thread_ts}`);
  console.log(JSON.stringify(event));

  await client.chat.postMessage({
    channel: channel_id,
    thread_ts: thread_ts,
    text: "Hello, I'm an AI assistant!",
  });
}

export async function handleNewAssistantMessage(
  event: GenericMessageEvent,
  botUserId: string,
) {
  if (
    event.bot_id ||
    event.bot_id === botUserId ||
    event.bot_profile ||
    !event.thread_ts
  )
    return;

  const { thread_ts, channel } = event;
  const updateStatus = updateStatusUtil(channel, thread_ts);
  updateStatus("is thinking...");

  const messages = await getThread(channel, thread_ts, botUserId);
  const result = await callLLM(messages, updateStatus);

  await client.chat.postMessage({
    channel: channel,
    thread_ts: thread_ts,
    text: result,
    unfurl_links: false,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: result,
        },
      },
    ],
  });

  updateStatus("");
}
