import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("accessToken") || null,
    userRole: localStorage.getItem("userRole") || "",
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    setCredentials(token, role) {
      this.token = token;
      this.userRole = role;

      localStorage.setItem("accessToken", token);
      localStorage.setItem("userRole", role);
    },
    logout() {
      this.token = null;
      this.userRole = "";

      localStorage.removeItem("accessToken");
      localStorage.removeItem("userRole");
    },
  },
});
