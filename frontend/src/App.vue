<template>
  <nav>
    <router-link to="/">Quiz</router-link> |
    <router-link v-if="!authStore.isAuthenticated" to="/login"
      >Log in</router-link
    >
    <router-link v-if="authStore.isAuthenticated" to="/dashboard">Dashboard quiz</router-link> |
    <button
      class="btn-logout"
      v-if="authStore.isAuthenticated"
      @click="authStore.logout"
    >
      Log Out
    </button>
  </nav>
  <router-view />
  <loading />
</template>

<script setup>
import { onMounted } from "vue";
import Loading from "./components/LoadingSpinner.vue";
import EventBus from "./utils/eventBus";
import { useAuthStore } from "./stores/auth.js";

const authStore = useAuthStore();

onMounted(() => {
  EventBus.on("logout", () => {
    authStore.logout();
  });
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  font-family: "Arial", sans-serif;
  background-color: #f4f4f4;
  color: #333;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.btn-logout {
  padding: 0;
  background-color: transparent;
  border: none;
  color: #2c3e50;
}
.btn-logout:hover {
  padding: 0;
  background-color: transparent;
  border: none;
  color: red;
  text-shadow: 0 0 2px red;
}
</style>
