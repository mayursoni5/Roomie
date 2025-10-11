import axios from "axios";
import { HOST } from "@/utils/constants";

export const apiClient = axios.create({
  baseURL: HOST,
  withCredentials: true,
});

// Debugging helper: intercept 401 responses and log details
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // eslint-disable-next-line no-console
      console.warn("API returned 401 Unauthorized:", {
        url: error.config && error.config.url,
        data: error.response.data,
      });
    }
    return Promise.reject(error);
  }
);
