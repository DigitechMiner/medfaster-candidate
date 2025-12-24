"use client";

import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";
import { getProfile } from "./candidate";

// GET /chat/conversations
export async function fetchConversations() {
  const res = await apiClient.get(ENDPOINTS.CHAT.CONVERSATIONS);
  return res.data.data;
}

// GET /chat/conversation/:conversationId/messages
export async function fetchMessages(conversationId: string) {
  const res = await apiClient.get(ENDPOINTS.CHAT.CONVERSATION(conversationId));
  return res.data.data;
}

// POST /chat/message
export async function sendMessage(conversationId: string, text: string) {
  const res = await apiClient.post(ENDPOINTS.CHAT.SEND_MESSAGE, {
    conversationId,
    message: text,
  });
  return res.data.data;
}

// PUT /chat/message/:messageId
export async function editChatMessage(messageId: string, message: string) {
  const res = await apiClient.put(`${ENDPOINTS.CHAT.SEND_MESSAGE}/${messageId}`, {
    message,
  });
  return res.data.data;
}

// DELETE /chat/message/:messageId
export async function deleteChatMessage(messageId: string) {
  const res = await apiClient.delete(`${ENDPOINTS.CHAT.SEND_MESSAGE}/${messageId}`);
  return res.data.data;
}

// POST /chat/conversation - Create or get conversation
export async function createOrGetConversation(recruiterId: string) {
  const profile = await getProfile();
  const res = await apiClient.post(ENDPOINTS.CHAT.CREATE_OR_GET, {
    candidateId: profile.id,
    recruiterId: recruiterId,
  });
  return res.data.data;
}
