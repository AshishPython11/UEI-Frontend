import axios from "axios";

export const httpClient = axios.create({
  // baseURL: "http://13.202.29.139:5000/" || "http://localhost:3000",
  baseURL: "http://13.235.239.244:5000/" || "http://localhost:3000",
  // baseURL: "http://127.0.0.1:5000/" || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});