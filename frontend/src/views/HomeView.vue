<template>
  <div class="home">
    <h1>Welcome to the Trivia Challenge</h1>

    <p class="description">
      You will be presented with 10 True or False questions.
    </p>
    <div class="box-begin">
      <p>Can you score 100%?</p>

      <button @click="startQuiz">BEGIN</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const startQuiz = async () => {
  router.push({ name: "quiz" });
};
</script>

<style>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 85vh;
  text-align: center;
}

h1 {
  font-size: 2.5em;
  color: #0056b3;
}

.description {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 15px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
  margin: 20px 0;
}

.box-begin {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 15px;
  background-color: white;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  width: 30%;
}

button {
  background-color: #28a745;
  border: none;
  color: white;
  padding: 12px 20px;
  width: auto;
  margin: 5px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #218838;
}
</style>
