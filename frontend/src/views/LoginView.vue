<template>
  <div class="login-container">
    <h1>Log In</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Username:</label>
        <input
          type="text"
          id="username"
          v-model="credentials.username"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          v-model="credentials.password"
          required
        />
      </div>
      <button type="submit">Iniciar Sesión</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginUser } from "@/services/user";

const credentials = ref({
  username: "",
  password: "",
});

const router = useRouter();

const login = async () => {
  try {
    await loginUser(credentials.value);
    router.push("/");
  } catch (error) {
    console.error(error);
  }
};
</script>

<style>
/* Estilos básicos, se pueden personalizar */
.login-container {
  max-width: 400px;
  margin: auto;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 15px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="password"] {
  width: 80%;
  padding: 8px;
  border-radius: 5px;
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  cursor: pointer;
}
</style>
