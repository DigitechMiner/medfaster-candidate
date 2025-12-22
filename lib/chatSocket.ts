// lib/chatSocket.ts (3000 - Candidate) - PRODUCTION READY
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

const getCookie = (name: string): string | null => {
  // Only run in browser
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return null;
  }
  
  try {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (key === name && value) {
        return decodeURIComponent(value);
      }
    }
    return null;
  } catch (error) {
    console.error('Error reading cookie:', error);
    return null;
  }
};

const getSocketUrl = (): string => {
  return process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000';
};

export const getChatSocket = (): Socket | null => {
  // Only run in browser
  if (typeof window === 'undefined') {
    return null;
  }

  if (socket?.connected) {
    console.log('✅ Returning existing connected socket');
    return socket;
  }
  
  const candidateToken = getCookie('candidate_token');
  
  if (!candidateToken) {
    console.warn('⚠️ No candidate_token found');
    console.log('🔍 Available cookies:', document.cookie.split('; ').map(c => c.split('=')[0]).join(', '));
    return null;
  }
  
  console.log('✅ Found candidate_token, length:', candidateToken.length);
  
  socket = io(getSocketUrl(), {
    auth: {
      token: candidateToken,
      userType: 'candidate' as const
    },
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000,
  });
  
  console.log('🔌 Candidate socket connecting to:', getSocketUrl());
  
  socket.on('connect', () => {
    console.log('✅ Candidate socket connected (ID:', socket?.id, ')');
  });
  
  socket.on('disconnect', (reason) => {
    console.log('🔌 Candidate socket disconnected:', reason);
  });
  
  socket.on('connect_error', (err) => {
    console.error('❌ Candidate socket connect_error:', err.message);
  });

  socket.on('error', (error) => {
    console.error('❌ Socket error event:', error);
  });

  socket.on('joined_conversation', (data) => {
    console.log('✅ Successfully joined conversation:', data.conversationId);
  });
  
  return socket;
};

export const initChatSocket = (): Socket | null => {
  // Only run in browser
  if (typeof window === 'undefined') {
    return null;
  }

  const s = getChatSocket();
  if (!s) console.warn('⚠️ Socket unavailable - check if logged in');
  return s;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log('🔌 Socket disconnected and cleared');
  }
};
