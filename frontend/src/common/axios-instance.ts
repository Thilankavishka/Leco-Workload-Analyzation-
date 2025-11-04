/**
 * axios-instance.ts
 * 
 * @updated 11/04/2025
 */
import axios from "axios"

const axiosInstance = axios.create({
  baseURL: import.meta.env.PUBLIC_API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
})

export default axiosInstance
