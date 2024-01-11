<template>
  <div>
    <QuestionForm :initialQuestion="selectedQuestion" @create="newQuestion" @updated="updateOldQuestion" />
    <QuestionList
      :questions="questions"
      @edit="editQuestion"
      @delete="deleteOldQuestion"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import QuestionForm from "../components/QuestionForm.vue";
import QuestionList from "../components/QuestionList.vue";
import {
  createQuestion,
  updateQuestion,
  getAllQuestions,
  deleteQuestion,
} from "../services/question.js";

const selectedQuestion = ref(null);
const questions = ref([]);

onMounted(async () => {
  await loadQuestions();
});

const loadQuestions = async () => {
  const response = await getAllQuestions();
  questions.value = response.data;
};

const newQuestion = async (question) => {
  await createQuestion(question);
  await loadQuestions();
};

const updateOldQuestion = async (question) => {
  await updateQuestion(question._id, question);
  await loadQuestions();
};

const editQuestion = (questionId) => {
  const questionToEdit = questions.value.find((q) => q._id === questionId);
  selectedQuestion.value = questionToEdit;
};

const deleteOldQuestion = async (questionId) => {
  await deleteQuestion(questionId);
  await loadQuestions();
};

</script>
