const axios = require("axios");
export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/questions/?product_id=1&count=50'",
  timeout: 1000,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});
