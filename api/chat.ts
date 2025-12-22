"use client";

import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";

// GET /chat/conversations
export async function fetchConversations() {
  const res = await apiClient.get(ENDPOINTS.CHAT.CONVERSATIONS);
  return res.data.data; // controller returns { success, data }
}

// GET /chat/conversation/:conversationId/messages
export async function fetchMessages(conversationId: string) {
  const res = await apiClient.get(ENDPOINTS.CHAT.CONVERSATION(conversationId));
  return res.data.data; // { messages, pagination }
}

// POST /chat/message
export async function sendMessage(conversationId: string, text: string) {
  const res = await apiClient.post(ENDPOINTS.CHAT.SEND_MESSAGE, {
    conversationId,
    message: text,
  });
  return res.data.data; // ChatMessage
}
