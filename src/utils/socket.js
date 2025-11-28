// src/utils/socket.js
import { io } from "socket.io-client";
import { SOCKET_URL } from "./constent";

export const socket = io(SOCKET_URL, {
  withCredentials: true,
  
});

export default socket;
