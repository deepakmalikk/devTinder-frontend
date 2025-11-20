
//Production
//export const baseURL = "/api";

// dev
export const baseURL = 
location.hostname === "localhost" ? "http://localhost:3000" : "/api";