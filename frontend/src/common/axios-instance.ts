import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

export default axiosInstance;
