import { io } from "socket.io-client";
import Cookies from "js-cookie";

const SOCKET_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const socket = io(SOCKET_URL, {
  auth: {
    token: Cookies.get("tutor_access_token") || null,
  },
  transports: ['websocket', 'polling'],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Connection event handlers
socket.on('connect', () => {
  console.log('Socket connected successfully');
});

socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error);
});

socket.on('disconnect', (reason) => {
  console.log('Socket disconnected:', reason);
});

export default socket;