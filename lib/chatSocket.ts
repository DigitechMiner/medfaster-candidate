import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;
let isInitializing = false;

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000';

export const initChatSocket = async (): Promise<Socket | null> => {
  if (socket?.connected) return socket;
  if (isInitializing) return null;

  isInitializing = true;

  try {
    console.log('Initializing candidate socket...');
    socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      withCredentials: true,          // sends candidate_token cookie
      auth: { userType: 'candidate' }, // optional, backend uses cookies
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on('connect', () => {
      console.log('✅ Candidate socket connected:', socket?.id);
    });

    socket.on('connect_error', (err) => {
      console.error('❌ Candidate socket error:', err.message);
    });

    socket.on('disconnect', (reason) => {
      console.log('🔌 Candidate socket disconnected:', reason);
    });

    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Socket connection timeout'));
      }, 5000);

      socket?.once('connect', () => {
        clearTimeout(timeout);
        resolve(true);
      });

      socket?.once('connect_error', (err) => {
        clearTimeout(timeout);
        reject(err);
      });
    });

    isInitializing = false;
    return socket;
  } catch (error) {
    console.error('Error initializing socket:', error);
    isInitializing = false;
    socket = null;
    return null;
  }
};

export const getChatSocket = (): Socket | null => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
