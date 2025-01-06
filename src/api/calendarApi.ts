import axios from "axios";
import { getENV } from "../helpers";

const { VITE_API_URL } = getENV();

const calendartApi = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//TODO: interceptores

calendartApi.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.set("x-token", localStorage.getItem("token") || "");
  }

  return config;
});

export default calendartApi;
