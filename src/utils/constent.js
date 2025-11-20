
//Production
//export const baseURL = "/api";

// dev
export const baseURL = 
location.hostname === "localhost" ? "http://localhost:3000" : "https://devtinder-backend-1-f97o.onrender.com/";

console.log(baseURL);