export const ENDPOINTS = {
  // Candidate Auth
  CANDIDATE: {
    SEND_OTP: '/candidate/send-otp',
    VALIDATE_OTP: '/candidate/validate-otp',
    GET_PROFILE: '/candidate/profile',
  },

  // Chat (shared for candidate/recruiter; path is under /v1/chat)
  CHAT: {
    CONVERSATIONS: '/chat/conversations',
    CONVERSATION: (conversationId: string) =>
      `/chat/conversation/${conversationId}/messages`,
    SEND_MESSAGE: '/chat/message',
    CREATE_OR_GET: '/chat/conversation',
  },
} as const;
