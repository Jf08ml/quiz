import { apiAuth } from "./api";
import { useAuthStore } from "@/stores/auth";
import { showLoading, hideLoading } from "../stores/loadingStore.js";

const useAuth = useAuthStore();
export async function loginUser(credentials) {
  try {
    showLoading();
    const { username, password } = credentials;
    const response = await apiAuth.post(`/login`, { username, password });

    localStorage.setItem("accessToken", response.data.token);

    useAuth.setCredentials(
      response.data.data.token,
      response.data.data.role
    );

    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  } finally {
    hideLoading();
  }
}
