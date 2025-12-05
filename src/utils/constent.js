// src/utils/constent.js
const isDev = import.meta.env.MODE === "development";

export const BASE_URL = isDev
  ? "http://localhost:7777/api"
  : "https://devtinder-backend-1-f97o.onrender.com/api";

export const SOCKET_URL = isDev
  ? "http://localhost:7777"
  : "https://devtinder-backend-1-f97o.onrender.com";

 
