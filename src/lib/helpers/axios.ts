import axios from "axios";

import { API_BASE_URL } from "@/constants/api";

export const playfitApi = axios.create({
  baseURL: API_BASE_URL, // Replace with your backend's base URL
  timeout: 30000, // 30 seconds timeout
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true", // TODO: Dynamic
    Accept: "application/json",
  },
});

export const playfitFetcher = (url: string) =>
  playfitApi.get(url).then((res) => res.data);
