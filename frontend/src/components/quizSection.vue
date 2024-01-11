<template>
  <div align="center" v-if="currentQuestionIndex < questions.length">
    <h2>Pregunta {{ currentQuestionIndex + 1 }}</h2>

    <p>{{ currentQuestion.text }}</p>
    <button @click="submitAnswer(true)">True</button>
    <button @click="submitAnswer(false)">False</button>

    <p v-if="showAnswer">
      La respuesta correcta es:
      {{ currentQuestion.observation }}
    </p>
  </div>

  <div v-else>
    <h2>Fin del cuestionario</h2>
    <p>Results: {{ correctAnswers }} / {{ questions.length }}</p>
    <form @submit.prevent="submitForm">
      <input type="email" v-model="email" placeholder="Email" required />
      <button type="submit">Guardar Resultados</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { generateQuiz } from "@/services/question.js";
import { createQuiz } from "@/services/quiz.js";
import { useRouter } from "vue-router";

const router = useRouter();

const questions = ref([]);

const quizResults = ref({
  userEmail: "",
  answer: [],
});
const results = ref([]);
const correctAnswers = ref(0);
const incorrectAnswers = ref(0);
const email = ref("");

onMounted(async () => {
  const response = await generateQuiz();
  questions.value = response.data;
});

const currentQuestionIndex = ref(0);
const showAnswer = ref(false);

const currentQuestion = computed(
  () => questions.value[currentQuestionIndex.value]
);

function submitAnswer(answer) {
  const result = {
    questionId: currentQuestion.value._id,
    playerResponse: answer,
    isCorrect: answer === currentQuestion.value.correctAnswer,
  };

  results.value.push(result);

  if (result.isCorrect) {
    nextQuestion();
    showAnswer.value = false;
  } else {
    showAnswer.value = true;
    setTimeout(() => {
      nextQuestion();
      showAnswer.value = false;
    }, 3000);
  }
}

async function submitForm() {
  quizResults.value = {
    userEmail: email.value,
    answers: results.value,
  };
  const response = await createQuiz(quizResults.value);

  if (response.result === "success") {
    router.push("/");
  }
}

function calculateResults() {
  correctAnswers.value = results.value.filter(
    (result) => result.isCorrect
  ).length;
  incorrectAnswers.value = results.value.length - correctAnswers.value;
}

function nextQuestion() {
  currentQuestionIndex.value++;
  calculateResults();
}
</script>

<style scoped></style>
